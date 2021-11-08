import { Ref } from 'vue';
import { COLUMN_FLAG } from '../constant';
import { getColumnWidth } from '../helper/widthHelper';
import { CxTableBaseObj, CxTableColumnObj, CxTableItem, CxTablePropType } from '../types';
import { arrFlat, deepMerge } from '../utils';
import { isEmpty, isFunction, isNumber, isString } from 'chx-utils';
import { useStyle } from './useStyle';
import { useTableId } from './useTableId';

function getColumnFlag(col: CxTableItem): number {
  let result = 0;
  if (col.slot) {
    result |= COLUMN_FLAG.SLOT_COLUMN;
  } else if (col.control) {
    result |= COLUMN_FLAG.CONTROL_COLUMN;
  } else if (col.calculate) {
    result |= COLUMN_FLAG.CALC_COLUMN;
  } else {
    result |= COLUMN_FLAG.TEXT_COLUMN;
  }

  if (col.fixed) {
    result |= COLUMN_FLAG.FIX_COLUMN;
  }
  if (col.children?.length) {
    result |= COLUMN_FLAG.ARRAY_CHILDREN;
  }
  if (col.sum === 'add') {
    result |= COLUMN_FLAG.ADD_SUM_COLUMN;
  } else if (isFunction(col.sum)) {
    result |= COLUMN_FLAG.CUSTOM_SUM_COLUMN;
  } else if (col.sum === 'text') {
    result |= COLUMN_FLAG.TEXT_SUM_COLUMN;
  }

  if (col.validator || col.required) {
    result |= COLUMN_FLAG.VALIDATE_COLUMN;
  }
  return result;
}

function normalizeColumn(
  col: CxTableItem,
  $CxTable: CxTableBaseObj,
  props: CxTablePropType,
  parent?: CxTableColumnObj,
  uniqueChildren?: boolean
): CxTableColumnObj {
  const priority = $CxTable.priorityColumnMap.get(col.prop) ?? {};
  const column = deepMerge(deepMerge({}, col), priority) as CxTableItem;

  const result: CxTableColumnObj = {
    ...column,
    configWidth: column.width,
    configMinWidth: column.minWidth,
    columnFlag: getColumnFlag(column),
    getStyle: useStyle(column, props),
    renderWidth: 0,
    children: undefined,
    _colid: useTableId().generateColId(column)
  };

  const widthState = getColumnWidth($CxTable, result, props);
  let { width } = widthState;
  const { isMin } = widthState;

  // 处理只有一个子项的情况
  if (uniqueChildren && parent) {
    const { width: parentWidth } = getColumnWidth($CxTable, parent, props);
    width = Math.max(parentWidth, width);
  }

  Reflect.set(result, isMin ? 'minWidth' : 'width', width),
    Reflect.deleteProperty(result, isMin ? 'width' : 'minWidth');

  result.children = column.children
    ?.filter(item => !item.hide)
    ?.map(column => normalizeColumn(column, $CxTable, props, result, col.children?.length === 1));

  return result;
}

export function useColumn(
  $CxTable: CxTableBaseObj,
  columnProxy: Ref<CxTableItem[]>,
  props: CxTablePropType
) {
  const cols = columnProxy.value;
  const columns: CxTableColumnObj[] = cols
    .filter(col => !col.hide)
    .map(col => normalizeColumn(col, $CxTable, props));

  const leftFixedColumns = columns.filter(col => col.fixed === 'left');
  $CxTable.columnStore.leftFixedColumns = leftFixedColumns;

  const rightFixedColumns = columns.filter(col => col.fixed === 'right');
  $CxTable.columnStore.rightFixedColumns = rightFixedColumns;

  const middenColumns = columns.filter(column => !column.fixed);
  $CxTable.columnStore.centerColumns = arrFlat(middenColumns);

  $CxTable.columns = ([] as CxTableColumnObj[]).concat(
    $CxTable.columnStore.leftFixedColumns,
    middenColumns,
    $CxTable.columnStore.rightFixedColumns
  );

  $CxTable.flatColumns = arrFlat($CxTable.columns);

  classifyColumn($CxTable, $CxTable.flatColumns);
}

function classifyColumn($CxTable: CxTableBaseObj, columns: CxTableColumnObj[]) {
  const pxColumns = columns.filter(col => {
    if (!isEmpty(col.minWidth)) return false;
    return isNumber(col.width) || (isString(col.width) && col.width.endsWith('px'));
  });
  $CxTable.columnStore.pxColumns = pxColumns;

  const percentColumns = columns.filter(col => {
    if (!isEmpty(col.minWidth)) return false;
    return isString(col.width) && col.width.endsWith('%');
  });
  $CxTable.columnStore.percentColumns = percentColumns;

  const pxMinColumns = columns.filter(col => {
    return isNumber(col.minWidth) || (isString(col.minWidth) && col.minWidth.endsWith('px'));
  });
  $CxTable.columnStore.pxMinColumns = pxMinColumns;

  const percentMinColumns = columns.filter(col => {
    return isString(col.minWidth) && col.minWidth.endsWith('%');
  });
  $CxTable.columnStore.percentMinColumns = percentMinColumns;

  const noWidthColumns = columns.filter(col => {
    return isEmpty(col.width) && isEmpty(col.minWidth);
  });
  $CxTable.columnStore.noWidthColumns = noWidthColumns;
}
