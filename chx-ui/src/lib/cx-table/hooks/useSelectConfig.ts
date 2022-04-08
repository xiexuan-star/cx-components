import { CxCheckSelectFun, SelectConfig, TableDataVisitor } from '../types';
import { nextTick, reactive, watch, watchEffect } from 'vue';
import { onSelectItemChange } from '../helper/eventHelper';
import { isFunction } from 'chx-utils';

export const useSelectConfig = (tableDataVisitor: TableDataVisitor, emit: Func<any>) => {
  const selectConfig = reactive<SelectConfig>({
    selectAll: false,
    indeterminate: false,
    selectItem: [],
    disabled: false,
    checkSelect: void 0,
    disabledItem: []
  });

  watchEffect(()=>{
    selectConfig.disabledItem.length = 0;
    tableDataVisitor.sortedData?.forEach((row: any) => {
      selectConfig.disabledItem.push(
        isFunction(selectConfig.checkSelect) && !!selectConfig.checkSelect?.(row)
      );
    });
  })

  watch(
    () => tableDataVisitor.sortedData.length,
    async () => {
      selectConfig.selectItem.length = tableDataVisitor.sortedData.length;
      tableDataVisitor.sortedData?.forEach((row: any, index: number) => {
        selectConfig.selectItem[index] = !!selectConfig.selectItem[index];
      });
      selectConfig.selectItem.splice(tableDataVisitor.sortedData.length);
    },
    { immediate: true }
  );

  const updateSelectAllStatus = () => {
    selectConfig.selectAll = selectConfig.selectItem.every(item => item);
    selectConfig.indeterminate =
      !selectConfig.selectAll && selectConfig.selectItem.some(item => item);
  };

  const updateSelectConfig = () => {
    const checkedList: { index: number; row: AnyObject }[] = [];
    const unCheckList: { index: number; row: AnyObject }[] = [];
    selectConfig.selectItem.forEach((item, index) => {
      if (!tableDataVisitor.sortedData[index]) return;
      (item ? checkedList : unCheckList).push({ index, row: tableDataVisitor.sortedData[index] });
    });

    onSelectItemChange(selectConfig);

    emit('selectChange', { checkedList, unCheckList });
  };

  watch(() => selectConfig.selectItem, updateSelectConfig, { deep: true, immediate: false });

  const clearSelection = () => {
    toggleAllSelection(false);
    selectConfig.selectItem.splice(0);
  };

  const toggleRowSelection = (index: number, state?: boolean) => {
    selectConfig.selectItem[index] = state ?? !selectConfig.selectItem[index];
    updateSelectAllStatus();
  };

  const toggleAllSelection = (state: boolean) => {
    const items = [...selectConfig.selectItem];
    selectConfig.selectItem = selectConfig.disabledItem.map((bool, index) =>
      bool ? items[index] : state
    );
    updateSelectAllStatus();
  };

  const getSelectValue = () => {
    return selectConfig.selectItem;
  };

  const getSelectRowData = ()=>{
    return tableDataVisitor.sortedData.filter((_,index)=>{
      return selectConfig.selectItem[index]
    })
  }

  const setSelectDisabled = (val: boolean) => {
    selectConfig.disabled = val;
  };

  const getSelectAllValue = () => {
    return selectConfig.selectAll;
  };

  const setCheckSelect = (cb?: CxCheckSelectFun) => {
    selectConfig.checkSelect = cb;
  };

  return {
    selectConfig,
    setCheckSelect,
    updateSelectConfig,
    getSelectRowData,
    clearSelection,
    setSelectDisabled,
    toggleRowSelection,
    toggleAllSelection,
    getSelectValue,
    getSelectAllValue
  };
};
