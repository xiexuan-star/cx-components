import {
  createBlock,
  createVNode,
  defineComponent,
  inject,
  openBlock,
  setBlockTracking
} from 'vue';
import { PATCH_FLAG } from '../../constant';
import { CxTableBaseObj } from '../../types';
import Empty from './../empty.vue';

export default defineComponent({
  name: 'CxTableEmpty',
  setup() {
    const CxTable = inject<CxTableBaseObj>('CxTable')!;

    const hoisted_1 = { style: { height: '150px' } };
    const hoisted_2 = { class: 'cx-table__empty' };

    return () => {
      const rowspan = CxTable.flatColumns.length;
      return (
        openBlock(),
          createBlock('div', hoisted_1, [
            createVNode('table', hoisted_2, [
              createVNode('tbody', null, [
                createVNode('tr', null, [
                  createVNode(
                    'td',
                    { rowspan },
                    [
                      (function () {
                        setBlockTracking(-1);
                        const node = createVNode(Empty);
                        setBlockTracking(1);
                        return node;
                      })()
                    ],
                    PATCH_FLAG.PROPS,
                    ['rowspan']
                  )
                ])
              ])
            ])
          ])
      );
    };
  }
});
