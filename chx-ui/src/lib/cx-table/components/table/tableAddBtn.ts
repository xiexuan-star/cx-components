import {
  computed,
  createBlock,
  createCommentVNode,
  createVNode,
  defineComponent,
  Fragment,
  inject,
  openBlock,
  PropType
} from 'vue';
import { PATCH_FLAG } from '../../constant';
import { CxTableBaseObj, CxTablePropType } from '../../types';
import { EventBus } from 'chx-utils';

export default defineComponent({
  name: 'CxTableAddBtn',
  props: {
    fixed: { type: String, default: '' },
    tableData: { type: Array as PropType<AnyObject[]>, default: () => [] }
  },
  setup(props) {
    const rootProp = inject<CxTablePropType>('rootProp')!;
    const CxTable = inject<CxTableBaseObj>('CxTable')!;
    const bus = inject<EventBus>('bus')!;

    const hoisted_1 = 'cx_opacity_0';

    const classList = computed(() => {
      return [
        'cx-table_add_btn',
        'cx_mlr_10',
        props.tableData.length ? 'cx_h_80' : 'cx_h_160',
        props.fixed ? hoisted_1 : null
      ];
    });

    const realShow = computed(() => {
      return !rootProp.showAddBtn || props.fixed === 'top' || props.fixed === 'bottom';
    });

    return (_: AnyObject, cache: AnyObject) => {
      return (
        openBlock(),
          createBlock(
            Fragment,
            null,
            [
              realShow.value
                ? createCommentVNode('v-if_add_btn', true)
                : createVNode('tr', null, [
                  createVNode(
                    'td',
                    { class: props.fixed ? hoisted_1 : null, colspan: CxTable.flatColumns.length },
                    [
                      createVNode(
                        'div',
                        {
                          onClick:
                            cache[0] || (cache[0] = () => bus.emit('addNewRow', 'addNewRow')),
                          class: classList.value
                        },
                        rootProp.showAddBtn,
                        PATCH_FLAG.CLASS | PATCH_FLAG.NEED_PATCH | PATCH_FLAG.TEXT
                      )
                    ],
                    PATCH_FLAG.CLASS | PATCH_FLAG.PROPS,
                    ['colspan']
                  )
                ])
            ],
            PATCH_FLAG.STABLE_FRAGMENT
          )
      );
    };
  }
});
