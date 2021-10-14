import {
  createBlock,
  createVNode,
  defineComponent,
  inject,
  openBlock,
  setBlockTracking
} from 'vue';
import { PATCH_FLAG } from '../../constant/enum';
import { CxTableBaseObj } from '../../types';

export default defineComponent({
  name: 'CxTableEmpty',
  setup() {
    const CxTable = inject<CxTableBaseObj>('CxTable')!;

    const hoisted_1 = { style: { height: '150px' } };
    const hoisted_2 = { class: 'cx-table_empty' };

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
                    (function() {
                      setBlockTracking(-1);
                      const node = createVNode('div', { class: 'cx_align_center' }, [
                        createVNode('embed', {
                          src: require('../../assets/tableEmpty.svg'),
                          class: 'cx_h_100'
                        }),
                        createVNode('p', null, '暂无数据')
                      ]);
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
