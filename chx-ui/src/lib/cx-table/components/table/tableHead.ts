import {
  computed,
  createBlock,
  createCommentVNode,
  createVNode,
  CSSProperties,
  defineComponent,
  Fragment,
  inject,
  openBlock
} from 'vue';
import { PATCH_FLAG } from '../../constant/enum';
import { useTableStyle } from '../../hooks/useTableStyle';
import { CxTableBaseObj } from '../../types';
import { invokeLayeredRow, pick } from '../../utils';
import HeadCell from './headCell';

export default defineComponent({
  name: 'CxTableHead',
  props: { fixed: { type: String, default: '' }, left: { type: Number, default: 0 } },
  components: { HeadCell },
  setup(props) {
    const CxTable = inject<CxTableBaseObj>('CxTable')!;

    const style = useTableStyle(props, CxTable, 'head');

    // 分层表头
    const layeredHeadItems = computed(() => {
      return invokeLayeredRow(CxTable.columns);
    });

    const hoisted_1: Array<keyof CSSProperties> = ['top', 'height', 'width', 'right'];
    const hoisted_2 = 'cx-table_head';

    return () =>
      createVNode(
        'div',
        { class: hoisted_2, style: pick(style.value, hoisted_1) },
        [
          createVNode(
            'table',
            { style: pick(style.value, ['left']) },
            [
              (openBlock(),
              createBlock(
                Fragment,
                null,
                layeredHeadItems.value.map((headers, index) => {
                  return (
                    openBlock(),
                    createBlock('tr', null, [
                      (openBlock(true),
                      createBlock(
                        Fragment,
                        null,
                        headers.map(col => {
                          return props.fixed && props.fixed !== 'top' && col.fixed !== props.fixed
                            ? createCommentVNode('v-if_table_head', true)
                            : (openBlock(),
                              createBlock(
                                HeadCell,
                                {
                                  column: col,
                                  layeredLevel: layeredHeadItems.value.length - index
                                },
                                null,
                                PATCH_FLAG.PROPS,
                                ['column', 'layeredLevel']
                              ));
                        }),
                        PATCH_FLAG.UNKEYED_FRAGMENT
                      ))
                    ])
                  );
                }, PATCH_FLAG.UNKEYED_FRAGMENT)
              ))
            ],
            PATCH_FLAG.STYLE
          )
        ],
        PATCH_FLAG.CLASS | PATCH_FLAG.STYLE
      );
  }
});
