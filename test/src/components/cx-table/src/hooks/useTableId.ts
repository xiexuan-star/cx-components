import { CX_TABLE_COLUMN_ID_PREPEND, CX_TABLE_ID_PREPEND } from '../constant';
import { CxTableItem } from '../types';

let colid = 0,
  rowid = 0,
  tid = 0;

const rowIdMap = new WeakMap<AnyObject, string>();
const colIdMap = new Map<string, string>();
export const useTableId = () => {
  const generateColId = (col: CxTableItem) => {
    const key = col.label + col.prop;
    let result = colIdMap.get(key);
    if (!result) {
      result = CX_TABLE_COLUMN_ID_PREPEND + colid++;
      colIdMap.set(key, result);
    }
    return result;
  };
  const generateRowId = () => {
    return CX_TABLE_COLUMN_ID_PREPEND + rowid++;
  };
  const generateTableId = () => {
    return CX_TABLE_ID_PREPEND + tid++;
  };
  const getRowIdFromMap = (key: any) => {
    let result = rowIdMap.get(key);
    if (!result) {
      result = generateRowId();
      setRowIdToMap(key, result);
    }
    return result;
  };
  const setRowIdToMap = (key: any, value: string) => {
    rowIdMap.set(key, value);
    return value;
  };
  return { generateColId, generateRowId, generateTableId, getRowIdFromMap, setRowIdToMap };
};
