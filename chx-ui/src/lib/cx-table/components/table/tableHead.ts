import { isFunction, isString } from 'chx-utils';
import {
  computed,
  createBlock,
  createCommentVNode,
  createVNode, CSSProperties,
  defineComponent,
  Fragment,
  inject, onMounted,
  openBlock, Prop, PropType, watch
} from 'vue';
import { PATCH_FLAG } from '../../constant';
import { useTableStyle } from '../../hooks';
import { CxTableBaseObj, CxTablePropType } from '../../types';
import { invokeLayeredRow } from '../../utils';
import HeadCell from './headCell';

export default defineComponent({
  name: 'CxTableHead',
  props: {
    fixed: { type: String, default: '' },
    left: { type: Number, default: 0 },
    class: { type: Array as PropType<string[] | string>, default: () => [] },
    style: { type: Object as PropType<CSSProperties>, default: () => ({}) }
  },
  components: { HeadCell },
  setup(props) {
    const CxTable = inject<CxTableBaseObj>('CxTable')!;
    const rootProp = inject<CxTablePropType>('rootProp')!;

    const style = useTableStyle(props, CxTable, 'head');

    // 分层表头
    const layeredHeadItems = computed(() => {
      return invokeLayeredRow(CxTable.columns);
    });

    const hoisted_2 = 'cx-table_head';

    watch(() => rootProp.stickyHead, v => {
      if (!v || !rootProp.scrollWrapper) return;
      if (isFunction(rootProp.scrollWrapper)) {
        //
      }
    }, { immediate: true });

    return () => {
      const classList = [hoisted_2];
      isString(props.class) ? classList.push(props.class) : classList.push(...props.class);
      return [
        createVNode(
          'div',
          {
            class: [hoisted_2, ...classList], style: {
              'top': style.value.top,
              'height': style.value.height,
              'width': style.value.width,
              'right': style.value.right,
              ...props.style
            }
          },
          [
            createVNode(
              'table',
              { style: { left: style.value.left } },
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
        )
      ];
    };
  }
});
