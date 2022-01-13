import { isFunction, isNumber, isString } from 'chx-utils';
import { createBlock, createCommentVNode, createTextVNode, createVNode, Fragment, openBlock, Ref } from 'vue';
import { EventBus } from 'chx-utils';
import { CxEllipsis } from '../../index';
import { COLUMN_FLAG, PATCH_FLAG } from '../constant';
import { CxBroadcast, CxTableRendererMap } from '../hooks';
import { CxCellProp, CxIgnoreControl, PaginationModel, SelectConfig } from '../types';
import { decimalFixed, getColumnSelectText, pick } from '../utils';

interface Params extends CxCellProp {
  rowIndex: number;
  selectConfig: SelectConfig;
  radioValue: Ref<number>;
  expandConfig: boolean[];
  bus: EventBus;
  pagination?: PaginationModel;
  broadcast: CxBroadcast;
}

const renderDefaultNode = (params: Params) => {
  const withDefault = (v:any)=>v??params.column.defaultValue;
  return createVNode(CxEllipsis,
    {
      content: params.column.renderText
        ? withDefault(params.rowData[getColumnSelectText(params.column)])
        : isNumber(params.column.accuracy)
          ? decimalFixed(withDefault(params.rowData[params.column.prop]), params.column.accuracy, true)
          : withDefault(params.rowData[params.column.prop])
    },
    null,
    PATCH_FLAG.PROPS, ['content']);
};

export const renderCellContent = (
  props: CxCellProp,
  isActived: boolean,
  rowIndex: number,
  sum = false,
  rootSlots: AnyObject,
  selectConfig: SelectConfig,
  radioValue: Ref<number>,
  disabled: boolean,
  bus: EventBus,
  expandConfig: boolean[],
  broadcast: CxBroadcast,
  pagination?: PaginationModel,
  ignoreControl?: CxIgnoreControl,
  forceControl?: CxIgnoreControl
): any => {
  const params: Params = {
    ...props,
    expandConfig,
    rowIndex,
    selectConfig,
    radioValue,
    bus,
    pagination,
    broadcast,
  };
  return (
    openBlock(),
      createBlock(Fragment, null, [
        sum
          ? renderCellSum(params, rootSlots)
          : props.column.columnFlag & COLUMN_FLAG.SLOT_COLUMN
            ? renderCellSlot(params, isActived, disabled, rootSlots, ignoreControl, forceControl)
            : props.column.columnFlag & COLUMN_FLAG.CONTROL_COLUMN
              ? renderCustomCell(params, isActived, disabled, ignoreControl, forceControl)
              : props.column.columnFlag & COLUMN_FLAG.CALC_COLUMN
                ? renderCalcCell(params)
                : renderDefaultNode(params),
      ])
  );
};

const renderCellSum = (params: Params, rootSlots?: AnyObject) => {
  return (
    openBlock(),
      createBlock(Fragment, null, [
        params.column.sumSlot
          ? rootSlots?.[params.column.sumSlot!]
            ? rootSlots?.[params.column.sumSlot!](params)
            : null
          : params.column.control?.type === 'index' || (isString(params.column.sum) && params.column.sum !== 'add')
            ? createTextVNode((params.column.sum as string) ?? '总计')
            : renderDefaultNode(params),
      ])
  );
};

const renderCellSlot = (
  params: Params,
  isActived: boolean,
  disabled: boolean,
  rootSlots?: AnyObject,
  ignoreControl?: CxIgnoreControl,
  forceControl?: CxIgnoreControl
) => {
  if (isFunction(params.column.slot)) {
    return params.column.slot({
      ...params,
      isActived,
      disabled,
      prop: params.column.prop,
      ignore: ignoreControl ? ignoreControl(pick(params, ['column', 'rowIndex', 'rowData'])) : false,
      force: forceControl ? forceControl(pick(params, ['column', 'rowIndex', 'rowData'])) : false,
    });
  }
  return rootSlots?.[params.column.slot!]
    ? rootSlots?.[params.column.slot!]({
      ...params,
      isActived,
      disabled,
      prop: params.column.prop,
      ignore: ignoreControl ? ignoreControl(pick(params, ['column', 'rowIndex', 'rowData'])) : false,
      force: forceControl ? forceControl(pick(params, ['column', 'rowIndex', 'rowData'])) : false,
    })
    : null;
};

const renderCalcCell = (params: Params) => {
  const { column, rowData } = params;
  return (
    openBlock(),
      createBlock(Fragment, null, [
        isFunction(column.calculate)
          ? createVNode(CxEllipsis, { content: column.calculate(rowData) }, null, PATCH_FLAG.PROPS, ['content'])
          : createCommentVNode('v-if', true),
      ])
  );
};

const renderCustomCell = (
  params: Params,
  isActived: boolean,
  disabled: boolean,
  ignoreControl?: CxIgnoreControl,
  forceControl?: CxIgnoreControl
): any => {
  const { type } = params.column.control ?? {};

  const renderer = CxTableRendererMap.get(type as string);

  if (isFunction(renderer)) {
    const ignore = ignoreControl ? ignoreControl(pick(params, ['column', 'rowIndex', 'rowData'])) : false;
    const force = forceControl ? forceControl(pick(params, ['column', 'rowIndex', 'rowData'])) : false;
    return renderer({ ...params, isActived, disabled, prop: params.column.prop, ignore, force });
  }
  return renderDefaultNode(params);
};
