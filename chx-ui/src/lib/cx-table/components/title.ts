import {
  createBlock,
  createCommentVNode,
  createVNode,
  defineComponent,
  Fragment,
  inject,
  openBlock
} from 'vue';
import { PATCH_FLAG } from '../constant';
import { CxTablePropType } from '../types';

export default defineComponent({
  name: 'CxTableTitle',
  setup() {
    const rootProp = inject<CxTablePropType>('rootProp')!;
    const hoisted_1 = { class: 'cx_secondary_title cx_ptb_16' };

    return () => {
      return (
        openBlock(),
        createBlock(
          Fragment,
          null,
          [
            rootProp.title
              ? createVNode('h3', hoisted_1, rootProp.title, PATCH_FLAG.TEXT)
              : createCommentVNode('v-if_title', true)
          ],
          PATCH_FLAG.STABLE_FRAGMENT
        )
      );
    };
  }
});
