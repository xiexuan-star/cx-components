import {
  computed,
  createBlock,
  createCommentVNode,
  createVNode,
  defineComponent,
  Fragment,
  inject,
  openBlock,
  PropType,
  ref,
  resolveComponent,
  watchEffect
} from 'vue';
import { COLUMN_FLAG, CX_SORT_STATUS, PATCH_FLAG } from '../../constant/enum';
import { CxTableBaseObj, CxTableColumnObj, SelectConfig, TableDataVisitor } from '../../types';
import { EventBus, formatWidth, getSums } from '../../utils';

export default defineComponent({
  name: 'CxTableHeadCell',
  props: {
    layeredLevel: { type: Number, default: 1 },
    column: { type: Object as PropType<CxTableColumnObj>, default: () => ({}) }
  },
  setup(props) {
    const rootSlots = inject<AnyObject>('rootSlots', {});
    const selectConfig = inject<SelectConfig>('selectConfig')!;
    const CxTable = inject<CxTableBaseObj>('CxTable')!;
    const tableDataVisitor = inject<TableDataVisitor>('tableDataVisitor')!;
    const bus = inject<EventBus>('bus')!;

    // 单元格内盒宽度
    const cellWidth = ref(0);
    watchEffect(() => {
      const arrChildren = props.column.columnFlag & COLUMN_FLAG.ARRAY_CHILDREN;
      cellWidth.value = arrChildren
        ? getSums(props.column.children ?? [])
        : props.column.renderWidth;
    });

    // 单元格属性
    const thAttrs = computed(() => {
      const { column, layeredLevel } = props;
      const arrChildren = column.columnFlag & COLUMN_FLAG.ARRAY_CHILDREN;
      const styleParams: AnyObject = {};
      if (!arrChildren) {
        styleParams.height = CxTable.styleStore.CX_TABLE_HEIGHT * layeredLevel;
      }
      return {
        colspan: props.column.children?.length ?? 1,
        rowspan: props.column.children?.length ? 1 : props.layeredLevel,
        style: column.getStyle(styleParams, 'head')
      };
    });

    const hoisted_1 = 'cx-table_cell';
    // const hoisted_2 = 'iconfont';
    const hoisted_3 = 'color:red';
    const hoisted_4 = 'cx_w_10';
    const hoisted_5 = 'cx-table_sort';
    const hoisted_6 = 'cx-table_sort_positive';
    const hoisted_7 = 'cx-table_sort_reverse';

    return (_: any, cache: any[]) => {
      const { column } = props;
      return createVNode(
        'th',
        thAttrs.value,
        [
          (openBlock(),
          createBlock(
            'div',
            { class: hoisted_1, style: { width: formatWidth(cellWidth.value) } },
            [
              column.headTip
                ? createVNode(
                    resolveComponent('ElTooltip'),
                    { content: column.headTip, placement: 'top-start', key: -1 },
                    {
                      default: () => {
                        return [
                          cache[5] ||
                            (cache[5] = createVNode('i', { class: 'iconfont icon-bangzhu' }))
                        ];
                      }
                    },
                    PATCH_FLAG.PROPS,
                    ['content']
                  )
                : createCommentVNode('c-if_tip', true),
              column.headSlot && rootSlots?.[column.headSlot]
                ? createVNode(rootSlots?.[column.headSlot], { column })
                : column.control?.type === 'nativeCheckbox'
                ? createVNode(
                    resolveComponent('ElCheckbox'),
                    {
                      key: 0,
                      modelValue: selectConfig.selectAll,
                      'onUpdate:modelValue':
                        cache[0] || (cache[0] = (val: any) => (selectConfig.selectAll = val)),
                      indeterminate: selectConfig.indeterminate,
                      disabled: selectConfig.disabled,
                      onChange:
                        cache[1] ||
                        (cache[1] = () => bus.emit('toggleAllSelection', selectConfig.selectAll))
                    },
                    null,
                    PATCH_FLAG.FULL_PROPS | PATCH_FLAG.NEED_PATCH
                  )
                : (openBlock(),
                  createBlock(
                    Fragment,
                    null,
                    [
                      (openBlock(),
                      createBlock(Fragment, null, [
                        column.required
                          ? cache[2] ||
                            (cache[2] = createVNode('i', { style: hoisted_3, key: 1 }, '*'))
                          : createCommentVNode('v-if_required', true)
                      ])),
                      // column.icon
                      //   ? createVNode(
                      //       'i',
                      //       { class: [hoisted_2, 'icon-' + column.icon], key: 2 },
                      //       null,
                      //       PATCH_FLAG.CLASS
                      //     )
                      //   : createCommentVNode('v-if_icon', true),
                      createVNode('span', { key: 3 }, column.label, PATCH_FLAG.TEXT),
                      column.sortable
                        ? cache[3] || (cache[3] = createVNode('i', { class: hoisted_4, key: 4 }))
                        : createCommentVNode('v-if_sortable_space', true),
                      column.sortable
                        ? createVNode(
                            'i',
                            {
                              key: 5,
                              onClick:
                                cache[4] ||
                                (cache[4] = () => {
                                  tableDataVisitor.sort = column.sortable;
                                  tableDataVisitor.sortProp = column.prop;
                                  switch (tableDataVisitor.sortStatus) {
                                    case CX_SORT_STATUS.NONE:
                                      tableDataVisitor.sortStatus = CX_SORT_STATUS.POSITIVE;
                                      break;
                                    case CX_SORT_STATUS.POSITIVE:
                                      tableDataVisitor.sortStatus = CX_SORT_STATUS.REVERSE;
                                      break;
                                    case CX_SORT_STATUS.REVERSE:
                                      tableDataVisitor.sortStatus = CX_SORT_STATUS.NONE;
                                  }
                                }),
                              class: [
                                hoisted_5,
                                tableDataVisitor.sortProp === column.prop
                                  ? tableDataVisitor.sortStatus === CX_SORT_STATUS.POSITIVE
                                    ? hoisted_6
                                    : tableDataVisitor.sortStatus === CX_SORT_STATUS.REVERSE
                                    ? hoisted_7
                                    : null
                                  : null
                              ]
                            },
                            null,
                            PATCH_FLAG.CLASS
                          )
                        : createCommentVNode('v-if_sortable', true)
                    ],
                    PATCH_FLAG.KEYED_FRAGMENT | PATCH_FLAG.STABLE_FRAGMENT
                  ))
            ],
            PATCH_FLAG.CLASS | PATCH_FLAG.STYLE
          ))
        ],
        PATCH_FLAG.PROPS | PATCH_FLAG.STYLE,
        ['colspan', 'rowspan']
      );
    };
  }
});
