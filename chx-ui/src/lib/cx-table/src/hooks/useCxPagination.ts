import { reactive } from 'vue';
import { PaginationModel } from '../types';

export function useCxPagination() {
  return reactive<PaginationModel>({
    currentPage: 1,
    pageCapacity: 10,
    pageSizes: [10, 20, 50],
    total: 0
  });
}
