import { localStore } from 'chx-utils';
import { reactive } from 'vue';
import { PaginationModel } from '../types';

const PAGE_CAPACITY = '_page_capacity';

export function useCxPagination(useCache = true) {
  return reactive<PaginationModel>({
    currentPage: 1,
    pageCapacity: useCache ? localStore.get(PAGE_CAPACITY) || 10 : 10,
    pageSizes: [10, 20, 50],
    total: 0
  });
}
