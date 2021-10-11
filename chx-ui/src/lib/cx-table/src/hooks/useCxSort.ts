import { ref } from '@vue/reactivity';
import { AnyObject } from '../../../../types';
// import { computed } from '@vue/runtime-core';
import { CX_SORT_STATUS } from '../constant/enum';
import { CxTablePropType, CxTableSortFun } from '../types';
// import { copySort, isFunction } from '../utils';

export interface TableDataVisitor {
  sortedData: AnyObject[];
  sortProp: string;
  sort: boolean | CxTableSortFun | undefined;
  sortStatus: CX_SORT_STATUS;
}

export const useCxSort = (props: CxTablePropType) => {
  const sortProp = ref('');
  const sortStatus = ref(CX_SORT_STATUS.NONE);
  const sort = ref<boolean | CxTableSortFun>(false);
  // const sortedData = computed(() => {
  //   if (unref(sortStatus) === CX_SORT_STATUS.NONE) {
  //     return props.tableData;
  //   } else if (unref(sort)) {
  //     let sortFun;
  //     if (isFunction(unref(sort))) {
  //       sortFun = (a: AnyObject, b: AnyObject) => {
  //         const fun = unref(sort) as CxTableSortFun;
  //         return unref(sortStatus) === CX_SORT_STATUS.POSITIVE
  //           ? fun(a[unref(sortProp)], b[unref(sortProp)])
  //           : fun(b[unref(sortProp)], a[unref(sortProp)]);
  //       };
  //     } else {
  //       sortFun = (a: AnyObject, b: AnyObject) => {
  //         return unref(sortStatus) === CX_SORT_STATUS.POSITIVE
  //           ? a[unref(sortProp)] - b[unref(sortProp)]
  //           : b[unref(sortProp)] - a[unref(sortProp)];
  //       };
  //     }
  //     return copySort(props.tableData, sortFun);
  //   } else {
  //     return props.tableData;
  //   }
  // });
  class TableDataVisitor {
    // 屏蔽前端排序,只提供后端排序的参数
    get sortedData() {
      return props.tableData;
    }
    get sortProp() {
      return sortProp.value;
    }
    set sortProp(prop: string) {
      sortProp.value = prop;
    }
    set sort(sortFun: boolean | CxTableSortFun) {
      sort.value = sortFun;
    }
    get sortStatus() {
      return sortStatus.value;
    }
    set sortStatus(status: CX_SORT_STATUS) {
      sortStatus.value = status;
    }
  }

  return { tableDataVisitor: new TableDataVisitor() };
};
