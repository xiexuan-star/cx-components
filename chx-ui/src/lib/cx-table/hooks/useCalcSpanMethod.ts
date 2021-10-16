import { isArray } from '../../../utils';
import { CX_SPAN_METHOD_TYPE } from '../constant/enum';
import { CxTableBaseObj, CxTablePropType } from '../types';

export const useCalcSpanMethod = ($CxTable: CxTableBaseObj, props: CxTablePropType) => {
  const { virtualStore, flatColumns } = $CxTable;
  const { rowSpanMap } = virtualStore;
  rowSpanMap.length = props.tableData?.length ?? 0;
  rowSpanMap.fill(0);
  props.tableData?.forEach((rowData, rowIndex) => {
    flatColumns.some(column => {
      let result: AnyObject = props.spanMethod?.({ rowData, column, rowIndex }) ?? {};
      if (isArray(result)) {
        result = { rowspan: result[0], colspan: result[1] };
      }
      if (result.rowspan === 0) {
        rowSpanMap[rowIndex] |= CX_SPAN_METHOD_TYPE.MISSING;
      } else if (result.rowspan > 1) {
        rowSpanMap[rowIndex] |= CX_SPAN_METHOD_TYPE.EXTEND;
      }
    });
  });
};
