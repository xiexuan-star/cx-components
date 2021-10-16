import {  isArray, isEmpty, isFunction, isNumber, isString } from '../../../utils';
import { CxTableBaseObj, CxTableColumnObj, CxTablePropType } from '../types';
import { domShare } from '../utils';

export const useValidator = ($CxTable: CxTableBaseObj, props: CxTablePropType) => {
  const validate = (params?: { rowIndex?: number; prop?: string }, dataSource?: AnyObject[]) => {
    const invalidCells: {
      rowIndex: number;
      rowData: AnyObject;
      colIndex: number;
      errMsg: string;
      column: CxTableColumnObj;
    }[] = [];

    const hasTargetProp = isString(params?.prop);

    const hasTargetRow = isNumber(params?.rowIndex);

    $CxTable.flatColumns.forEach((column, colIndex) => {
      if (hasTargetProp && params?.prop !== column.prop) return;

      const handle = (rowData: AnyObject, rowIndex: number, column: CxTableColumnObj) => {
        let errMsg: string | void = '';

        errMsg =
          column.validator?.({
            rowData,
            column,
            value: rowData[column.prop],
            rowIndex
          }) ?? '';

        if (!errMsg && column.required && isEmpty(rowData[column.prop])) {
          errMsg = column.label + '不能为空';
        }

        if (errMsg) invalidCells.push({ rowIndex, rowData, colIndex, errMsg, column });
      };

      if (!isFunction(column.validator) && !column.required) return;

      (isArray(dataSource) ? dataSource : props.tableData).forEach((rowData, rowIndex) => {
        if (hasTargetRow && params?.rowIndex !== rowIndex) return;
        handle(rowData, rowIndex, column);
      });
    });
    if (invalidCells.length) {
      setTimeout(() => {
        const { column, rowData } = invalidCells[0];
        const td = domShare.getCell($CxTable, column, rowData);
        td?.click();
      });
    }
    return invalidCells;
  };

  return { validate };
};
