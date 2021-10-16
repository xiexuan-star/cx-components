import { defineComponent, inject, PropType, createVNode } from 'vue';
import { CxTableBaseObj } from '../../types';
import { getSums } from '../../utils';
import TableBody from './tableBody';

export default defineComponent({
  name: 'CxTableFixedBottom',
  props: {
    tableData: { type: Array as PropType<AnyObject[]>, default: () => [] }
  },
  setup(props) {
    const CxTable = inject<CxTableBaseObj>('CxTable')!;

    const component = TableBody as any;

    return () => {
      return [
        CxTable.columnStore.rightFixedColumns.length
          ? createVNode(component, {
              tableData: props.tableData,
              style: {
                width: getSums(CxTable.columnStore.rightFixedColumns) + 'px',
                zIndex: 15
              },
              fixed: 'right',
              class: {
                'cx-table_fixed_right': true,
                'cx-table_right_shadow': CxTable.scrollStore.showRightShadow,
                'cx-bt': true
              },
              onlyTotal: true
            })
          : null,
        CxTable.columnStore.leftFixedColumns.length
          ? createVNode(component, {
              tableData: props.tableData,
              style: {
                width: getSums(CxTable.columnStore.leftFixedColumns) + 'px',
                zIndex: 15
              },
              fixed: 'left',
              class: {
                'cx-table_fixed_left': true,
                'cx-table_left_shadow': CxTable.scrollStore.showLeftShadow,
                'cx-bt': true
              },
              onlyTotal: true
            })
          : null
      ];
    };
  }
});
