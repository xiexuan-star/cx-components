import {
  Component,
  computed,
  createBlock,
  createCommentVNode,
  createVNode,
  defineComponent,
  Fragment,
  nextTick,
  onMounted,
  openBlock,
  provide,
  ref,
  resolveDirective,
  withDirectives
} from 'vue';

import { createCxTableConfig } from './static';
import { CxTableExpose, Nullable } from './types';
import { CX_TABLE_EVENT_LIST } from './constant';
import { debounce, domShare, formatWidth, invokeLayeredRow, isNumber, isObject } from './utils';

import CxTableContent from './components/table';
import CxTableBody from './components/table/tableBody';
import CxTableEmpty from './components/table/empty';
import Pagination from './components/pagination';
import TeleForm from './components/teleForm/index';
import { SetCacheBtn } from './components/cacheBtn';
import { CacheListBtn } from './components/cacheBtn';
import CxTableTitle from './components/title';
import CxDynamicConfigDialog from './components/dynamicConfigSetting/index.vue';

import './style/index.scss';

import CxTableProp from './props';

import { useTableId } from './hooks/useTableId';
import { useSelectConfig } from './hooks/useSelectConfig';
import { useRadioConfig } from './hooks/useRadioConfig';
import { useValidator } from './hooks/useValidator';
import { useExpandConfig } from './hooks/useExpandConfig';
import { useWatch } from './hooks/useWatch';
import { useRegister } from './hooks/useRegister';
import { useCxSort } from './hooks/useCxSort';
import { useLazyLoad } from './hooks/useLazyLoad';
import { useBroadcast } from './hooks/useBroadcast';
import { usePriorityConfig } from './hooks/usePriorityConfig';
import { useDynamicConfig } from './hooks/useDynamicConfig';
import { updateCxTableWidth, useAutoWidth } from './hooks/useAutoWidth';
import { scrollUpdateShadow } from './helper/eventHelper';
import { useCSSVariable } from './hooks/useCSSVariable';
import { PATCH_FLAG } from './constant/enum';
import { useBus } from './hooks/useBus';

export default defineComponent({
  name: 'CxTable',
  props: CxTableProp,
  components: { Pagination },
  emits: CX_TABLE_EVENT_LIST,
  setup(props, { slots, emit, expose }) {
    // 根对象
    const $CxTable = createCxTableConfig();
    const { columnProxy, dynamicColumn, loading, forceUpdate } = useDynamicConfig(props);
    const searchLoading = ref(false);

    const { bus } = useBus($CxTable, props);

    const tid = useTableId().generateTableId();
    const { tableDataVisitor } = useCxSort(props);

    // 集成多选
    const {
      selectConfig,
      setCheckSelect,
      clearSelection,
      toggleRowSelection,
      toggleAllSelection,
      getSelectValue,
      getSelectAllValue,
      setSelectDisabled,
      updateSelectConfig
    } = useSelectConfig(tableDataVisitor);
    setCheckSelect(props.checkSelect);

    bus.on('toggleAllSelection', toggleAllSelection);
    bus.on('toggleRowSelection', toggleRowSelection);

    // 集成单选
    const { radioValue, removeRadio, setRadio, getRadio } = useRadioConfig();

    // 集成展开行
    const { expandConfig, setExpand, clearExpand } = useExpandConfig();

    // 表单校验
    const { validate } = useValidator($CxTable, props);

    const { setConfig, removeConfig, clearConfig, onSetConfig } = usePriorityConfig($CxTable);

    // 缓存
    // const { removeCache, setCache, getCache } = useCache(props);

    const { broadcast } = useBroadcast();

    const updateWidth = debounce(async () => {
      useAutoWidth($CxTable);
      await nextTick();
      scrollUpdateShadow($CxTable);
    }, 50);

    broadcast.registEntireListener(async payload => {
      const { prop } = payload;
      await nextTick();
      updateCxTableWidth($CxTable, props, prop);
      updateWidth();
      emit('broadcast', payload);
    });

    const exposeMethods: CxTableExpose = {
      // radio
      removeRadio,
      setRadio,
      getRadio,

      // checkbox
      clearSelection,
      toggleRowSelection,
      toggleAllSelection,
      getSelectValue,
      getSelectAllValue,
      setSelectDisabled,
      updateSelectConfig,

      // expand
      setExpand,
      clearExpand,

      // config
      setConfig,
      removeConfig,
      clearConfig,

      // validate
      validate,

      // update
      forceUpdate,

      // event
      triggerBroadcast: (prop, rowData) => {
        broadcast.trigger(prop, rowData, { prop, rowData });
      },
      focusCell: async ({ prop, rowData, rowIndex }) => {
        if (!prop) return;
        if (!rowData && rowIndex == undefined) return;

        if (props.virtualScroll) {
          rowIndex = rowIndex ?? props.tableData.findIndex(data => data === rowData);
          if (!isNumber(rowIndex) || !$CxTable.wrapperEle) return;
          const rowHeight = $CxTable.styleStore.CX_TABLE_HEIGHT;
          $CxTable.wrapperEle.scrollTop = rowHeight * rowIndex;
          await nextTick();
        }
        rowData = rowData ?? props.tableData[rowIndex!];
        const column = $CxTable.flatColumns?.find(col => col.prop === prop);
        if (!column) return;
        const cell = domShare.getCell($CxTable, column, rowData!);
        setTimeout(() => {
          cell?.click();
        });
      },
      // setCache,
      // getCache,
      // removeCache,
      removeCacheItem() {
        bus.emit('removeCacheItem');
      },
      search(payload?: AnyObject) {
        bus.emit('search', payload);
      }
    };

    expose(exposeMethods);

    emit('register', { registerTarget: exposeMethods, props });

    provide('broadcast', broadcast);
    provide('tableDataVisitor', tableDataVisitor);
    provide('CxTable', $CxTable);
    provide('rootProp', props);
    provide('rootSlots', slots);
    provide('bus', bus);
    provide('loading', loading);
    provide('selectConfig', selectConfig);
    provide('radioValue', radioValue);
    provide('expandConfig', expandConfig);
    provide('tid', tid);
    provide('dynamicColumn', dynamicColumn);

    const tableWrapper = ref<Nullable<HTMLElement>>(null);

    const tableVisible = ref(!props.lazy);

    onMounted(() => {
      if (!tableWrapper.value) return;
      $CxTable.wrapperEle = tableWrapper.value;
      const { updateColumn, updateData } = useWatch(
        props,
        $CxTable,
        columnProxy,
        tableWrapper,
        expandConfig,
        tableVisible
      );
      onSetConfig.push(updateColumn);
      onSetConfig.push(updateData);
      props.lazy && useLazyLoad(tableWrapper.value, tableVisible);
    });

    useRegister($CxTable, props, tableDataVisitor, tableWrapper, bus, tid);

    const _hoisted_1_class = 'cx-table_wrapper';
    const _hoisted_2_class = 'cx-table_scrollWrapper';
    const _hoisted_3_class = 'cx-table_border_line';
    const _hoisted_directive = resolveDirective('loading')!;

    const renderContent = (fixed?: string) => {
      return createVNode(
        CxTableContent,
        { tableData: tableDataVisitor.sortedData, fixed },
        null,
        PATCH_FLAG.PROPS,
        ['tableData']
      );
    };

    const renderTables = () => {
      const result = [];
      const { leftFixedColumns, rightFixedColumns } = $CxTable.columnStore;
      const { rightScrollBar, bottomScrollBar } = $CxTable.scrollStore;
      result.push(renderContent());
      if (leftFixedColumns.length && bottomScrollBar) {
        result.push(renderContent('left'));
      }
      if (rightFixedColumns.length && bottomScrollBar) {
        result.push(renderContent('right'));
      }
      if (props.height && rightScrollBar) {
        result.push(renderContent('top'));
      }
      if (props.fixTotalSum && props.showTotalSum && rightScrollBar) {
        result.push(renderContent('bottom'));
      }
      return result;
    };

    const renderBorderLine = () => {
      return createVNode('div', { class: _hoisted_3_class });
    };

    const renderEmpty = () => {
      return (
        openBlock(),
        createBlock(Fragment, null, [
          tableDataVisitor.sortedData.length || props.emptyLimit > 0 || props.showAddBtn
            ? createCommentVNode('v-if_empty', true)
            : createVNode(CxTableEmpty)
        ])
      );
    };

    const renderDynamicConfigSetting = () => {
      return (
        openBlock(),
        createBlock(Fragment, null, [
          props.configurable && props.dynamic
            ? createVNode(
                CxDynamicConfigDialog,
                {
                  dynamicConfig: props.dynamic,
                  onSubmit: () => {
                    forceUpdate();
                    emit('dynamicSetting');
                  }
                },
                null,
                PATCH_FLAG.PROPS | PATCH_FLAG.NEED_PATCH,
                ['dynamicConfig']
              )
            : createCommentVNode('v-if_dynamic_config', true)
        ])
      );
    };

    const renderTeleBtn = (comp: Component) => {
      return createVNode(
        comp,
        { dynamicColumn: dynamicColumn.value, tableDataVisitor },
        null,
        PATCH_FLAG.PROPS,
        ['dynamicColumn', 'tableDataVisitor']
      );
    };

    const placeHolderAttrs = computed(() => {
      const dataHeight =
        (props.tableData.length +
          +!!props.showTotalSum +
          invokeLayeredRow($CxTable.columns).length) *
        $CxTable.styleStore.CX_TABLE_HEIGHT;
      const height = formatWidth(
        props.height ? Math.min(dataHeight, isNaN(+props.height) ? 400 : +props.height) : dataHeight
      );
      return { style: { height } };
    });

    const innerStyle = computed(() => {
      return { maxHeight: isNumber(props.height) ? props.height + 'px' : props.height };
    });

    const { cssVariable } = useCSSVariable($CxTable);

    return (_: any, cache: any[]) => {
      return createVNode(
        'div',
        { style: cssVariable.value, class: 'cx-table_container' },
        [
          createVNode(CxTableTitle),
          (openBlock(),
          createBlock(Fragment, null, [
            props.setCacheBtn
              ? renderTeleBtn(SetCacheBtn)
              : createCommentVNode('v-if_set_cache_btn', true),
            props.cacheListBtn
              ? renderTeleBtn(CacheListBtn)
              : createCommentVNode('v-if_cache_list_btn', true)
          ])),
          (openBlock(),
          createBlock(Fragment, null, [
            props.showForm
              ? createVNode(
                  TeleForm,
                  {
                    dynamicColumn: dynamicColumn.value,
                    tableDataVisitor,
                    loading: searchLoading.value,
                    'onUpdate:loading': (val: boolean) => (searchLoading.value = val)
                  },
                  null,
                  PATCH_FLAG.PROPS,
                  ['dynamicColumn', 'tableDataVisitor', 'loading']
                )
              : createCommentVNode('v-if_form', true)
          ])),
          createVNode(
            'div',
            { tid, class: _hoisted_1_class },
            [
              withDirectives(
                createVNode(
                  'div',
                  { class: _hoisted_2_class, style: innerStyle.value, ref: tableWrapper },
                  [
                    (openBlock(),
                    createBlock(
                      Fragment,
                      null,
                      tableVisible.value
                        ? [
                            renderTables(),
                            renderEmpty(),
                            cache[0] || (cache[0] = renderBorderLine()),
                            renderDynamicConfigSetting()
                          ]
                        : [createVNode('div', placeHolderAttrs.value)]
                    ))
                  ],
                  PATCH_FLAG.STYLE | PATCH_FLAG.NEED_PATCH
                ),
                [[_hoisted_directive ?? {}, loading.value || searchLoading.value]]
              )
            ],
            PATCH_FLAG.STYLE
          ),
          (openBlock(),
          createBlock(Fragment, null, [
            props.floatTotalSum
              ? createVNode('div', { class: _hoisted_1_class }, [
                  createVNode('div', { class: `${_hoisted_2_class} cx_of_hidden` }, [
                    createVNode(
                      CxTableBody,
                      {
                        tableData: tableDataVisitor.sortedData,
                        onlyTotal: true,
                        float: true,
                        class: 'cx_mt_20',
                        style: {
                          right: `${$CxTable.scrollStore.scrollLeft + ''}px`,
                          position: 'relative'
                        }
                      },
                      null,
                      PATCH_FLAG.FULL_PROPS
                    )
                  ])
                ])
              : createCommentVNode('v-if_float_total_sum', true)
          ])),
          (openBlock(),
          createBlock(Fragment, null, [
            isObject(props.pagination)
              ? createVNode(
                  Pagination,
                  {
                    pagination: props.pagination,
                    onPaging: cache[1] || (cache[1] = () => emit('paging'))
                  },
                  null,
                  PATCH_FLAG.PROPS,
                  ['pagination']
                )
              : createCommentVNode('v-if_pagination', true)
          ]))
        ],
        PATCH_FLAG.STYLE
      );
    };
  }
});
