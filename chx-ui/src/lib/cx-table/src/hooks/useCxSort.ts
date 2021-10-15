import { ref } from 'vue';
import { CX_SORT_STATUS } from '../constant/enum';
import { CxTablePropType, CxTableSortFun, TableDataVisitor } from '../types';

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

  return {
    tableDataVisitor: new Proxy(
      {} as TableDataVisitor,
      {
        get(target, key) {
          if (key === 'sortedData') return props.tableData;
          if (key === 'sortProp') return sortProp.value;
          if (key === 'sortStatus') return sortStatus.value;
        },
        set(target, key, val) {
          switch (key) {
            case 'sortProp':
              sortProp.value = val;
              break;
            case 'sort':
              sort.value = val;
            case 'sortStatus':
              sortStatus.value = val;
          }
          return true;
        }
      }
    )
  };
};
