import { CxTableBaseObj, CxTablePropType } from '../types';
import { EventBus } from 'chx-utils';

export const useCxTableEvent = ($CxTable: CxTableBaseObj, props: CxTablePropType, emit: Func<any>) => {
  const bus = new EventBus();
  bus.on('addNewRow', () => {
    if (props.disabled) return;
    const emptyRow = $CxTable.flatColumns.reduce((res, column) => {
      Reflect.set(res, column.prop, '');
      return res;
    }, {} as AnyObject);
    emit('addNewRow', emptyRow);
  });
  bus.on('expandCheck', (params: any) => {
    emit('expandCheck', params);
  });
  bus.on('tdFocus', (params: any) => emit('tdFocus', params));
  bus.on('deleteRow', (rowIndex: number) => {
    const { tableData } = props;
    tableData?.splice(rowIndex, 1);
  });
  return { bus };
};
