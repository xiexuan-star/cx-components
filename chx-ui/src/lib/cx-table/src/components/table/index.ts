import {
  createBlock,
  createCommentVNode,
  createVNode,
  defineComponent,
  Fragment,
  inject,
  openBlock,
  PropType
} from 'vue';
import CxTableHead from './tableHead';
import CxTableBody from './tableBody';
import { CxTableBaseObj } from '../../types';
import { useTableStyle } from '../../hooks/useTableStyle';
import { useTableClass } from '../../hooks/useTableClass';
import { PATCH_FLAG } from '../../constant/enum';
export default defineComponent({
  name: 'CxTableContent',
  props: {
    fixed: { type: String, default: '' },
    tableData: { type: Array as PropType<AnyObject[]>, default: () => [] }
  },
  setup(props) {
    const CxTable = inject<CxTableBaseObj>('CxTable')!;

    const style = useTableStyle(props, CxTable, 'table');

    const classList = useTableClass(props, CxTable);

    return () => {
      const { fixed } = props;

      return (
        openBlock(),
        createBlock(Fragment, null, [
          [
            (openBlock(),
            createBlock(
              Fragment,
              null,
              [
                fixed !== 'bottom'
                  ? createVNode(
                      CxTableHead,
                      { class: classList.value, style: style.value, fixed },
                      null,
                      PATCH_FLAG.FULL_PROPS | PATCH_FLAG.CLASS | PATCH_FLAG.STYLE
                    )
                  : createCommentVNode('v-if_table_bottom', true)
              ],
              PATCH_FLAG.STABLE_FRAGMENT
            )),
            (openBlock(),
            createBlock(
              Fragment,
              null,
              [
                fixed !== 'top'
                  ? createVNode(
                      CxTableBody,
                      {
                        tableData: props.tableData,
                        class: classList.value,
                        style: style.value,
                        fixed
                      },
                      null,
                      PATCH_FLAG.FULL_PROPS | PATCH_FLAG.CLASS | PATCH_FLAG.STYLE
                    )
                  : createCommentVNode('v-if_table_top', true)
              ],
              PATCH_FLAG.STABLE_FRAGMENT
            ))
          ]
        ])
      );
    };
  }
});
