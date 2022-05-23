import { localStore } from 'chx-utils';
import { createVNode, defineComponent, resolveComponent } from 'vue';
import { PatchFlags } from '../../constant/enum';
import { PAGE_CAPACITY } from '../cx-table/hooks';

export default defineComponent({
  name: 'CxPagination',
  props: { pagination: { type: Object, default: () => ({}) } },
  setup(props, { emit }) {
    const handleSizeChange = (size: number) => {
      const { pagination } = props;
      pagination.currentPage = 1;
      pagination.pageCapacity = size;
      localStore.set(PAGE_CAPACITY, size)
      emit('paging');
    };

    const handleCurrentChange = (currentPage: number) => {
      const { pagination } = props;
      pagination.currentPage = currentPage;
      emit('paging');
    };

    const hoisted_1 = 'total, sizes, prev, pager, next, jumper';
    const Pagination = resolveComponent('ElPagination');

    return () => {
      return createVNode(
        Pagination,
        {
          class: 'cx_justify_end cx_pt_12',
          background: true,
          currentPage: props.pagination.currentPage,
          pageSizes: props.pagination.pageSizes,
          pageSize: props.pagination.pageCapacity,
          layout: hoisted_1,
          total: props.pagination.total,
          onSizeChange: handleSizeChange,
          onCurrentChange: handleCurrentChange
        },
        null,
        PatchFlags.FULL_PROPS
      );
    };
  }
});
