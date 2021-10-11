import { useContext } from 'vue';
import { AnyObject } from '../../../../types';
import { CxTableBaseObj, CxTablePropType } from '../types';
import { EventBus } from '../utils';

export const useBus = ($CxTable: CxTableBaseObj, props: CxTablePropType) => {
  const bus = new EventBus();
  const { emit } = useContext();
  bus.on('addNewRow', (content: string) => {
    if (props.disabled) return;
    const emptyRow = $CxTable.flatColumns.reduce((res, column) => {
      Reflect.set(res, column.prop, '');
      return res;
    }, {} as AnyObject);
    emit(content, emptyRow);
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
