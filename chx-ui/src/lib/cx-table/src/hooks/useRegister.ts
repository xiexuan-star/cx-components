import { Ref, nextTick } from 'vue';
import {
  registKeyboardEvent,
  registMouseEvent,
  registResponsive,
  registScrollEvent,
  wrapperScrollEventHandle
} from '../helper/eventHelper';
import { CxTableBaseObj, CxTablePropType, TableDataVisitor } from '../types';
import { EventBus } from '../utils';
import { useAutoWidth } from './useAutoWidth';
import { useScrollState } from './useScrollState';

export const useRegister = (
  $CxTable: CxTableBaseObj,
  props: CxTablePropType,
  tableDataVisitor: TableDataVisitor,
  tableWrapper: Ref<any>,
  bus: EventBus,
  tid: string
) => {
  registScrollEvent($CxTable, props as CxTablePropType);
  props.keyboard && registKeyboardEvent($CxTable, props, tableDataVisitor, bus, tid);

  registResponsive(tableWrapper, [
    async () => {
      await nextTick();
      useAutoWidth($CxTable);
      await nextTick();
      wrapperScrollEventHandle($CxTable, props as CxTablePropType);
      await nextTick();
      useScrollState($CxTable);
    }
  ]);
  registMouseEvent($CxTable);
};
