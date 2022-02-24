import { isFunction, isString } from 'chx-utils';
import { throttle } from 'lodash-es';
import {
  computed,
  createBlock,
  createCommentVNode,
  createVNode, CSSProperties,
  defineComponent,
  Fragment,
  inject, nextTick,
  openBlock, PropType, ref, watch
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
    classList: { type: [Array, String] as PropType<string[] | string>, default: () => [] },
    styleProperty: { type: Object as PropType<CSSProperties>, default: () => ({}) },
    needStickyHeader: { type: Boolean, default: false },
  },
  components: { HeadCell },
  setup(props) {
    const CxTable = inject<CxTableBaseObj>('CxTable')!;

    const style = useTableStyle(props, CxTable, 'head');

    // 分层表头
    const layeredHeadItems = computed(() => {
      return invokeLayeredRow(CxTable.columns);
    });

    const hoisted_2 = 'cx-table_head';
    const headerRef = ref<HTMLElement>();

    if (!props.fixed) {
      watch([() => CxTable.scrollStore.scrollLeft, () => props.needStickyHeader], ([left, need]: any[]) => {
        if (!headerRef.value || !need) return;
        headerRef.value.scrollLeft = left;
      });
    }

    return () => {
      const classList = [hoisted_2];
      isString(props.classList) ? classList.push(props.classList) : classList.push(...props.classList);
      if (props.needStickyHeader) {
        classList.push('cx-table__sticky');
      }
      return [
        createVNode(
          'div',
          {
            class: classList, style: {
              'top': style.value.top,
              'height': style.value.height,
              'width': style.value.width,
              'right': style.value.right,
              ...props.styleProperty
            },
            ref: headerRef
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
        ),
        (openBlock(), createBlock(Fragment, null, [
          props.needStickyHeader && !props.fixed
            ? createVNode('div', { style: { height: CxTable.styleStore.CX_TABLE_HEIGHT * layeredHeadItems.value.length + 'px' } })
            : createCommentVNode('v-if_sticky_header', true)
        ]))
      ];
    };
  }
});
