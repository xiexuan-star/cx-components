import {
  computed,
  createBlock,
  createCommentVNode,
  createVNode,
  CSSProperties,
  defineComponent,
  Fragment,
  inject,
  openBlock,
  PropType
} from 'vue';
import { PATCH_FLAG } from '../../constant';
import { useTableStyle } from '../../hooks';
import { CxTableBaseObj, CxTablePropType } from '../../types';
import { isFunction, isString } from 'chx-utils';

export default defineComponent({
  name: 'CxTableExpand',
  props: {
    fixed: { type: String, default: '' },
    rowData: { type: Object as PropType<AnyObject>, default: () => ({}) },
    rowIndex: { type: Number, default: -1 }
  },
  setup(props) {
    const CxTable = inject<CxTableBaseObj>('CxTable')!;
    const rootProp = inject<CxTablePropType>('rootProp')!;
    const expandConfig = inject<boolean[]>('expandConfig', []);
    const rootSlots = inject<AnyObject>('rootSlots', {});

    const classList = computed(() => {
      const result: string[] = [];
      props.fixed && result.push('cx_opacity_0');
      return result;
    });

    const colspan = computed(() => {
      return props.fixed === 'left'
        ? CxTable.columnStore.leftFixedColumns?.length
        : props.fixed === 'right'
          ? CxTable.columnStore.rightFixedColumns?.length
          : CxTable.flatColumns?.length;
    });

    const slotName = computed(() => {
      let result = '';

      if (isString(rootProp.expand) && rootProp.expand) {
        result = rootProp.expand;
      } else if (isFunction(rootProp.expand)) {
        const expandSlot = rootProp.expand(props.rowData, props.rowIndex);
        expandSlot && (result = expandSlot);
      }
      return result;
    });

    const hoisted_1 = 'cx-table__expand';

    return () => {
      return (
        openBlock(),
          createBlock(Fragment, null, [
            slotName.value && expandConfig[props.rowIndex] && rootSlots[slotName.value]
              ? createVNode(
                'tr',
                { class: classList.value },
                [
                  createVNode(
                    'td',
                    { colspan: colspan.value },
                    [
                      createVNode(
                        'div',
                        {
                          class: `${ hoisted_1 }`,
                          style: (function () {
                            const result: CSSProperties = {};
                            if (props.fixed) {
                              const { width } = useTableStyle(props, CxTable, 'table').value;
                              if (width) {
                                Reflect.set(result, 'width', width);
                                Reflect.set(result, 'overflow', 'hidden');
                              }
                            }
                            return result;
                          })()
                        },
                        [
                          createVNode(
                            'div',
                            { style: { width: CxTable.scrollStore.renderTotalWidth + 'px' } },
                            [
                              createVNode(
                                rootSlots[slotName.value],
                                { rowIndex: props.rowIndex, rowData: props.rowData },
                                null,
                                PATCH_FLAG.FULL_PROPS
                              )
                            ],
                            PATCH_FLAG.STYLE
                          )
                        ],
                        PATCH_FLAG.STYLE
                      )
                    ],
                    PATCH_FLAG.PROPS,
                    ['colspan']
                  )
                ],
                PATCH_FLAG.CLASS
              )
              : createCommentVNode('v-if_expand', true)
          ])
      );
    };
  }
});
