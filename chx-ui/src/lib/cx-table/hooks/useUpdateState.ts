import { debounce } from 'lodash-es';
import { nextTick } from 'vue';
import { scrollUpdateShadow, wrapperScrollEventHandle } from '../helper/eventHelper';
import { CxTableBaseObj, CxTablePropType } from '../types';
import { updateCxTableWidth, useAutoWidth } from './useAutoWidth';
import { useCalcSpanMethod } from './useCalcSpanMethod';
import { useScrollState } from './useScrollState';

export const useUpdateState = (props: CxTablePropType, $CxTable: CxTableBaseObj) => {
  const updateState = async () => {
    if (props.spanMethod && props.virtualScroll) {
      useCalcSpanMethod($CxTable, props);
    }
    $CxTable.flatColumns.forEach(column => {
      updateCxTableWidth($CxTable, props, column.prop);
    });
    useAutoWidth($CxTable);
    await nextTick();
    scrollUpdateShadow($CxTable);
    if ($CxTable.wrapperEle) {
      wrapperScrollEventHandle($CxTable, props as CxTablePropType);
      useScrollState($CxTable);
    }
  };
  return { updateState };
};
