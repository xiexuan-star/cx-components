import { nextTick, Ref, watch } from 'vue';
import { debounce } from 'lodash-es';
import { CX_STYLE_SETTING } from '../constant';
import { wrapperScrollEventHandle } from '../helper/eventHelper';
import { CxTableBaseObj, CxTableItem, CxTablePropType } from '../types';
import { useColumnValidity, useRowDataValidity } from './useAuthorization';
import { useColumn } from './useColumn';
import { useScrollState } from './useScrollState';
import { isNumber } from 'chx-utils';
import { useUpdateState } from './useUpdateState';

export const useWatch = (
  props: CxTablePropType,
  $CxTable: CxTableBaseObj,
  columnProxy: Ref<CxTableItem[]>,
  tableWrapper: Ref,
  expandConfig: boolean[],
  tableVisible: Ref<boolean>
) => {
  const updateVisible = async () => {
    await nextTick();
    useScrollState($CxTable);
    wrapperScrollEventHandle($CxTable, props);
  };
  watch(() => tableVisible.value, updateVisible);

  const { updateState } = useUpdateState(props, $CxTable);
  const updateTableState = debounce(updateState, 50);

  const updateColumn = async () => {
    useColumn($CxTable, columnProxy, props);
    useColumnValidity($CxTable);
    updateTableState();
  };

  const updateData = async () => {
    useRowDataValidity(props);
    updateTableState();
  };
  watch([() => props.tableData.length, () => props.emptyLimit], updateData);

  const updateExpand = async () => {
    await nextTick();
    useScrollState($CxTable);
  };
  watch(() => expandConfig, updateExpand, { deep: true, immediate: true });

  const updateStyleSetting = () => {
    Object.entries(props.styleSetting ?? {}).forEach(([key, val]) => {
      const settingKey = Reflect.get(CX_STYLE_SETTING, key);
      settingKey && isNumber(val) && Reflect.set($CxTable.styleStore, settingKey, val);
    });
    updateTableState()
  };
  watch(() => props.styleSetting, updateStyleSetting, { immediate: true, deep: true });

  return {
    updateVisible,
    updateColumn,
    updateData,
    updateExpand,
    updateTableState,
    updateStyleSetting
  };
};
