import { isFunction, isNumber, isString } from 'chx-utils';
import { createBlock, createCommentVNode, createTextVNode, createVNode, Fragment, openBlock, Ref } from 'vue';
import { EventBus } from 'chx-utils';
import { CxEllipsis } from '../../index';
import { COLUMN_FLAG, PATCH_FLAG } from '../constant';
import { CxBroadcast, CxTableRendererMap } from '../hooks';
import { CxCellProp, CxIgnoreControl, CxTableBaseObj, PaginationModel, SelectConfig } from '../types';
import { decimalFixed, getColumnSelectText } from '../utils';

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
  const withDefault = (v: any) => v ?? params.column.defaultValue;
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
  forceControl?: CxIgnoreControl,
  calculateCacheMap?: CxTableBaseObj['calculateCacheMap']
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
  const renderer = CxTableRendererMap.get('default');
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
                ? renderCalcCell(params, calculateCacheMap)
                : renderer
                  ? renderer({
                    ...params,
                    prop: params.column.prop,
                    ignore: false,
                    force: false,
                    isActived: false,
                    disabled: false
                  })
                  : renderDefaultNode(params)
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
      ignore: ignoreControl ? ignoreControl({
        'column': params.column,
        'rowIndex': params.rowIndex,
        'rowData': params.rowData
      }) : false,
      force: forceControl ? forceControl({
        'column': params.column,
        'rowIndex': params.rowIndex,
        'rowData': params.rowData
      }) : false,
    });
  }
  return rootSlots?.[params.column.slot!]
    ? rootSlots?.[params.column.slot!]({
      ...params,
      isActived,
      disabled,
      prop: params.column.prop,
      ignore: ignoreControl ? ignoreControl({
        'column': params.column,
        'rowIndex': params.rowIndex,
        'rowData': params.rowData
      }) : false,
      force: forceControl ? forceControl({
        'column': params.column,
        'rowIndex': params.rowIndex,
        'rowData': params.rowData
      }) : false,
    })
    : null;
};

const renderCalcCell = (params: Params, cacheMap: CxTableBaseObj['calculateCacheMap']) => {
  const { column, rowData } = params;
  const rowCache = cacheMap.get(rowData) || {};
  cacheMap.set(rowData, rowCache);
  isFunction(column.calculate) && (rowCache[column.prop] = column.calculate(rowData));
  const renderer = CxTableRendererMap.get('default');
  return (
    openBlock(),
      createBlock(Fragment, null, [
        renderer
          ? renderer({
            ...params,
            rowData: { ...params.rowData, [column.prop]: rowCache[column.prop] },
            prop: params.column.prop,
            ignore: false,
            force: false,
            isActived: false,
            disabled: false
          })
          : renderDefaultNode({ ...params, rowData: { ...params.rowData, [column.prop]: rowCache[column.prop] }, })
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
    const ignore = ignoreControl ? ignoreControl({
      'column': params.column,
      'rowIndex': params.rowIndex,
      'rowData': params.rowData
    }) : false;
    const force = forceControl ? forceControl({
      'column': params.column,
      'rowIndex': params.rowIndex,
      'rowData': params.rowData
    }) : false;
    return renderer({ ...params, isActived, disabled, prop: params.column.prop, ignore, force });
  }
  return renderDefaultNode(params);
};
