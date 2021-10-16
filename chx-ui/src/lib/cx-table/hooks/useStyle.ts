import { CSSProperties } from 'vue';
import { CxTableItem, CxTablePropType } from '../types';
import { formatWidth } from '../utils';
import { isFunction, isNumber } from '../../../utils';

function assignStyle(
  current: CSSProperties,
  assign: CxTablePropType['cellStyle'] | CxTablePropType['headCellStyle'],
  payload: any
) {
  Object.assign(current, isFunction(assign) ? assign(payload) : assign);
}
export function useStyle(
  col: CxTableItem,
  props: CxTablePropType
): (params?: AnyObject, type?: 'body' | 'head') => CSSProperties {
  return (params, type, rowData?: AnyObject, rowIndex?: number) => {
    const result: CSSProperties = { textAlign: col.align === 'center' ? 'center' : 'left' };
    if (type === 'body') {
      props.cellStyle && assignStyle(result, props.cellStyle, { column: col, rowData, rowIndex });
      col.cellStyle && assignStyle(result, col.cellStyle, { column: col, rowData, rowIndex });
    }
    if (type === 'head') {
      props.headCellStyle && assignStyle(result, props.headCellStyle, { column: col });
      col.headCellStyle && assignStyle(result, col.headCellStyle, { column: col });
    }
    if (isNumber(params?.height)) {
      result.height = formatWidth(params?.height);
    }
    return result;
  };
}
