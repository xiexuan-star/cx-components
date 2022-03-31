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
import { CXPagination } from '../index';
import { useSortable } from './hooks/useSortable';
import { useSticky } from './hooks/useSticky';

import { createCxTableConfig } from './static';
import { CxTableExpose, Nullable } from './types';
import { CX_TABLE_EVENT_LIST } from './constant';
import { domShare, formatWidth, invokeLayeredRow } from './utils';

import CxTableContent from './components/table/index.vue';
import CxTableEmpty from './components/table/empty.vue';
import TeleForm from './components/teleForm/index';
import { SetCacheBtn } from './components/cacheBtn';
import { CacheListBtn } from './components/cacheBtn';
import CxTableTitle from './components/title';
import CxDynamicConfigDialog from './components/dynamicConfigSetting/index.vue';

import CxTableProp from './props';

import {
  useTableId,
  useSelectConfig,
  useRadioConfig,
  useValidator,
  useExpandConfig,
  useWatch,
  useRegister,
  useCxSort,
  useLazyLoad,
  useBroadcast,
  usePriorityConfig,
  useDynamicConfig,
  updateCxTableWidth,
  useAutoWidth,
  useCxTableEvent,
  useCSSVariable
} from './hooks';
import { scrollUpdateShadow } from './helper/eventHelper';
import { PATCH_FLAG } from './constant';
import { debounce } from 'lodash-es';
import { isNumber, isObject } from 'chx-utils';

export default defineComponent({
  name: 'CxTable',
  props: CxTableProp,
  emits: CX_TABLE_EVENT_LIST,
  setup(props, { slots, emit, expose }) {
    // 根对象
    const $CxTable = createCxTableConfig();
    const { columnProxy, dynamicColumn, loading, forceUpdate } = useDynamicConfig(props, $CxTable, emit);
    const searchLoading = ref(false);

    const { bus } = useCxTableEvent($CxTable, props, emit);

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
      getSelectRowData,
      getSelectAllValue,
      setSelectDisabled,
      updateSelectConfig
    } = useSelectConfig(tableDataVisitor, emit);
    setCheckSelect(props.checkSelect);

    bus.on('toggleAllSelection', toggleAllSelection);
    bus.on('toggleRowSelection', (index: number, state: boolean) => {
      toggleRowSelection(index, state);
      emit('selectItemChange', { index, state });
    });

    // 集成单选
    const { radioValue, removeRadio, setRadio, getRadio } = useRadioConfig(emit);

    // 集成展开行
    const { expandConfig, setExpand, clearExpand } = useExpandConfig();

    // 表单校验
    const { validate } = useValidator($CxTable, props);

    const { setConfig, removeConfig, clearConfig, onSetConfig } = usePriorityConfig($CxTable);

    // 缓存
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
      isCxTableRef: true,
      getTableData() {
        return props.tableData;
      },
      // radio
      removeRadio,
      setRadio,
      getRadio,

      // checkbox
      clearSelection,
      toggleRowSelection,
      toggleAllSelection,
      getSelectValue,
      getSelectRowData,
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
        if (!rowData && rowIndex == undefined) return;
        prop = prop || $CxTable.flatColumns[0]?.prop;
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
    useSortable($CxTable, props, radioValue, selectConfig, tableVisible, emit);

    useRegister($CxTable, props, tableDataVisitor, tableWrapper, bus, tid);

    const _hoisted_1_class = 'cx-table__wrapper';
    const _hoisted_2_class = 'cx-table__scroll__wrapper';
    const _hoisted_3_class = 'cx-table__border__line';
    const _hoisted_directive = resolveDirective('loading')!;

    const { needStickyHeader, wrapperWidth, wrapperRight, wrapperLeft } = useSticky(props, $CxTable);

    const renderContent = (fixed?: string) => {
      return createVNode(
        CxTableContent,
        { tableData: tableDataVisitor.sortedData, fixed, needStickyHeader: needStickyHeader.value },
        null,
        PATCH_FLAG.PROPS,
        ['tableData', 'needStickyHeader', 'wrapperWidth']
      );
    };

    const renderTables = () => {
      const { leftFixedColumns, rightFixedColumns } = $CxTable.columnStore;
      const { rightScrollBar, bottomScrollBar } = $CxTable.scrollStore;
      return [
        renderContent(),
        (openBlock(), createBlock(Fragment, null, [
          leftFixedColumns.length && bottomScrollBar ? renderContent('left') : createCommentVNode('v-if_left', true)
        ])),
        (openBlock(), createBlock(Fragment, null, [
          rightFixedColumns.length && bottomScrollBar ? renderContent('right') : createCommentVNode('v-if_right', true)
        ])),
        (openBlock(), createBlock(Fragment, null, [
          props.height && rightScrollBar ? renderContent('top') : createCommentVNode('v-if_top', true)
        ])),
        (openBlock(), createBlock(Fragment, null, [
          props.fixTotalSum && props.showTotalSum && rightScrollBar ? renderContent('bottom') : createCommentVNode('v-if_bottom', true)
        ]))
      ];
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
      return {
        maxHeight: isNumber(props.height) ? props.height + 'px' : props.height,
        '--sticky-width': wrapperWidth.value,
        '--sticky-top': props.stickyHead,
        '--sticky-left': wrapperLeft.value,
        '--sticky-right': wrapperRight.value,
      };
    });

    const { cssVariable } = useCSSVariable($CxTable);

    return (_: any, cache: any[]) => {
      return createVNode(
        'div',
        { style: cssVariable.value, class: 'cx-table' },
        [
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
          createVNode(CxTableTitle, { title: props.title }, null, PATCH_FLAG.PROPS, ['title']),
          createVNode(
            'div',
            { tid, class: _hoisted_1_class },
            [
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
              )
            ],
            PATCH_FLAG.STYLE
          ),
          (openBlock(),
            createBlock(Fragment, null, [
              isObject(props.pagination)
                ? createVNode(
                  CXPagination,
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
