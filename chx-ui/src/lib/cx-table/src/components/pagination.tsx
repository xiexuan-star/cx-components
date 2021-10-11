import { defineComponent } from 'vue';

export default defineComponent({
  name: 'CxTablePagination',
  props: { pagination: { type: Object, default: () => ({}) } },
  setup(props, { emit }) {
    const handleSizeChange = (size: number) => {
      const { pagination } = props;
      pagination.currentPage = 1;
      pagination.pageCapacity = size;
      emit('paging');
    };

    const handleCurrentChange = (currentPage: number) => {
      const { pagination } = props;
      pagination.currentPage = currentPage;
      emit('paging');
    };

    const hoisted_1 = 'total, sizes, prev, pager, next, jumper';

    return () => {
      return (
        <el-pagination
          class="cx_align_right cx_p_20"
          background
          current-page={props.pagination.currentPage}
          page-sizes={props.pagination.pageSizes}
          page-size={props.pagination.pageCapacity}
          layout={hoisted_1}
          total={props.pagination.total}
          onSizeChange={handleSizeChange}
          onCurrentChange={handleCurrentChange}
        />
      );
    };
  }
});
