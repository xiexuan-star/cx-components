import { EventBus, isArray, isDeepObjectEqual, isEmpty, isFunction, } from 'chx-utils';
import {
  computed, createBlock, createCommentVNode, createVNode, CSSProperties, defineComponent, Fragment, inject, openBlock,
  PropType, reactive,
  ref, Ref,
  resolveDirective, watch,
  watchEffect, withDirectives
} from 'vue';
import { COLUMN_FLAG, CX_SPAN_METHOD_TYPE, CX_TABLE_COLUMN_KEY, PATCH_FLAG } from '../../constant';
import { registCellEvent } from '../../helper/eventHelper';
import { renderCellContent } from '../../helper/renderHelper';
import { CxBroadcast } from '../../hooks';
import { CxTableBaseObj, CxTableColumnObj, CxTablePropType, SelectConfig } from '../../types';
import { getColumnSelectText, } from '../../utils';

export default defineComponent({
  name: 'CxTableCell',
  props: {
    column: { type: Object as PropType<CxTableColumnObj>, default: () => ({}) },
    rowData: { type: Object as PropType<AnyObject>, default: () => ({}) },
    rowIndex: { type: Number, default: -1 },
    sum: { type: Boolean, default: false },
    empty: { type: Boolean, default: false }
  },
  setup(props) {
    const rootSlots = inject<AnyObject>('rootSlots', {});
    const selectConfig = inject<SelectConfig>('selectConfig')!;
    const CxTable = inject<CxTableBaseObj>('CxTable')!;
    const radioValue = inject<Ref<number>>('radioValue')!;
    const expandConfig = inject<boolean[]>('expandConfig')!;
    const rootProp = inject<CxTablePropType>('rootProp')!;
    const broadcast = inject<CxBroadcast>('broadcast')!;
    const bus = inject<EventBus>('bus')!;

    const _hoisted_direction_1 = resolveDirective('uni-popper');
    const handles = rootProp.keyboard ? registCellEvent(CxTable, props) : {};

    // 如果设置了validate,则计算其校验结果
    const invalidContent = ref('');
    watchEffect(() => {
      if (!(props.column.columnFlag & COLUMN_FLAG.VALIDATE_COLUMN)) return invalidContent.value = '';
      CxTable.editStore.actived;
      props.rowData[props.column.prop];
      let result: any = isFunction(props.column.validator)
        ? props.column.validator({
          column: props.column,
          value: props.rowData[props.column.prop],
          rowIndex: props.rowIndex,
          rowData: props.rowData
        })
        : null;
      if (!result && props.column.required) {
        result = isEmpty(props.rowData[props.column.prop]) ? '请填写' + props.column.label : null;
      }
      return invalidContent.value = result;
    });

    const isActived = ref(false);
    watchEffect(() => {
      isActived.value =
        props.column._colid === CxTable.editStore.actived.column?._colid &&
        props.rowData === CxTable.editStore.actived.rowData;
    });

    // 聚焦提交tdFocus事件
    watch(
      () => isActived.value,
      () => {
        if (isActived.value) {
          const { rowIndex, rowData, column } = props;
          bus.emit('tdFocus', { rowIndex, rowData, column });
        }
      }
    );

    // 如果设置了spanMethod,则计算其colspan/rowspan
    const mergeSpan = computed(() => {
      if (!isFunction(rootProp.spanMethod) || props.sum) return {};
      let result: AnyObject =
        rootProp.spanMethod?.({
          rowData: props.rowData,
          column: props.column,
          rowIndex: props.rowIndex
        }) ?? {};
      if (isArray(result)) {
        result = { rowspan: result[0], colspan: result[1] };
      }
      return result;
    });

    // 单元格是否显示控件
    const isControl = ref(false);
    watchEffect(() => {
      isControl.value = isActived.value && !!CxTable.editStore.activedControl;
    });

    const errorVisible = ref(false);
    watchEffect(() => {
      errorVisible.value = !!(invalidContent.value && isControl.value);
    });

    const directionOption = reactive({
      visible: false,
      classList: ['cx-table_wrong_msg', 'cx_m_8'],
      text: invalidContent.value,
      controlType: 'handle',
      placement: 'top-start',
      arrow: false,
      key: 'errorMsg'
    });
    watch(invalidContent, val => {
      directionOption.text = val;
    });
    watch(errorVisible, val => {
      directionOption.visible = val;
    });

    // 单元格内容
    const renderContent = () => {
      if (props.empty) return;
      const renderInnerContent: any = () => {
        return renderCellContent(
          props,
          isControl.value,
          props.rowIndex,
          props.sum,
          rootSlots,
          selectConfig,
          radioValue,
          !!rootProp.disabled,
          bus,
          expandConfig,
          broadcast,
          rootProp.pagination,
          rootProp.ignoreControl,
          rootProp.forceControl,
          CxTable.calculateCacheMap
        );
      };
      invalidContent.value;
      if (props.column.columnFlag & COLUMN_FLAG.VALIDATE_COLUMN && !props.sum) {
        return withDirectives(createVNode('div', null, [renderInnerContent()]), [
          [_hoisted_direction_1 ?? {}, directionOption]
        ]);
      } else {
        return renderInnerContent();
      }
    };

    // 单元格样式
    const tdStyle = ref<CSSProperties>({});
    watchEffect(() => {
      const params: AnyObject = {};
      if (mergeSpan.value?.rowspan > 1) {
        params.height = mergeSpan.value?.rowspan * CxTable.styleStore.CX_TABLE_HEIGHT;
      }
      const result = props.column.getStyle(params, 'body', props.rowData, props.rowIndex);
      if (!isDeepObjectEqual(tdStyle.value, result)) {
        tdStyle.value = result;
      }
    });

    const key = CX_TABLE_COLUMN_KEY + props.column._colid;

    watch(
      () => mergeSpan.value.rowspan,
      (val, oldVal) => {
        if (val === oldVal) return;
        if (rootProp.virtualScroll) {
          const { rowSpanMap } = CxTable.virtualStore;
          if (mergeSpan.value.rowspan > 1) {
            rowSpanMap[props.rowIndex] |= CX_SPAN_METHOD_TYPE.EXTEND;
          }
          if (mergeSpan.value.rowspan === 0) {
            rowSpanMap[props.rowIndex] |= CX_SPAN_METHOD_TYPE.MISSING;
          }
        }
      },
      { immediate: true }
    );

    // 当值发生改变时发送一个广播
    watch(
      () => props.rowData[props.column.prop],
      () => {
        broadcast?.trigger(props.column.prop, props.rowData, {
          prop: props.column.prop,
          rowData: props.rowData
        });
      }
    );

    // 当column为select/search时,由于text的存在,不能仅仅监听id变化,text值也会对渲染有影响,同时,插槽内容的变化也难以监听
    if (['search', 'select', 'optionSelect'].includes(props.column.control?.type as any) || props.column.slot) {
      const textKey = getColumnSelectText(props.column);
      watch(
        () => props.rowData[textKey],
        () => {
          broadcast?.trigger(textKey, props.rowData, {
            prop: textKey,
            rowData: props.rowData
          });
        }
      );
    }

    return () => {
      if (mergeSpan.value && (mergeSpan.value?.rowspan === 0 || mergeSpan.value?.colspan === 0)) {
        return;
      }
      return createVNode(
        'td',
        {
          key,
          ...handles,
          ...mergeSpan.value,
          style: tdStyle.value,
          colid: props.column._colid,
          class: { actived: isActived.value }
        },
        [
          createVNode(
            'div',
            {
              class: 'cx-table_cell',
              style: { width: props.column.renderWidth + 'px' }
            },
            [renderContent()],
            PATCH_FLAG.CLASS | PATCH_FLAG.STYLE
          )
        ],
        PATCH_FLAG.FULL_PROPS
      );
    };
  }
});
