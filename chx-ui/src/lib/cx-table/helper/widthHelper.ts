import { isObject, isString } from 'chx-utils';
import { CxTableWidthMap } from '../constant/width';
import { CxTableBaseObj, CxTableColumnObj, CxTableItem, CxTablePropType } from '../types';
import { cxTableWarn, getColumnSelectText, getStatusAttrs, getStringWidth, } from '../utils';
import { decimalFixed } from '../utils';

const selectType = ['search', 'select', 'optionSelect', 'sourceSelect'];

// 旧方法,专用于适配vxe,vxe完全弃用后可删除
export const widthTypeAdaptor = (
  item: string | CxTableItem
): ReturnType<typeof CxTableWidthMap.get> & { isMin: boolean } => {
  const label = (isObject(item) ? item.label : item) ?? '';
  const { required, icon, slot, width: itemWidth } = (isObject(item) && item) || {};

  // 映射关系
  const targetItem = [...CxTableWidthMap.values()].find(item => item.rule(label))!;

  // 表头字符长度(与映射值取最大值)
  const textWidth = getStringWidth(label) + 20 + (+!!required + +!!icon) * 10;
  const width = targetItem.important ? targetItem.width : Math.max(targetItem.width, textWidth);

  const result = {
    ...targetItem,
    // 对于插槽的情况, 无法判断具体长度, 故单独处理(取配置项当中的值)
    width: +(slot && itemWidth ? itemWidth : width),
    // 是否允许拉伸
    isMin: !targetItem.static
  };

  return result;
};

// 表格内容区字符宽度(基准宽度)
export const contentWidthAdaptor = (column: CxTableItem, props: CxTablePropType) => {
  return Math.max(
    ...props.tableData?.map(rowData => {
      let content: undefined | string = rowData[column.prop],
        append = 0;
      const type = column?.control?.type;
      // 当处于特殊字段时,直接取最大宽度
      if (['备注'].includes(column.label) && column?.control?.type === 'input') {
        return +Infinity;
      } else if (type === 'input') {
        append = 40;
      } else if (type === 'select' || type === 'search') {
        content = rowData[getColumnSelectText(column)];
        append = 55;
      } else if (['nativeCheckbox', 'nativeRadio'].includes(type!)) {
        return 60;
      } else if (['nativeDelete'].includes(type!)) {
        return 60;
      } else if (type === 'inscription') {
        // 当处于多选框情况,直接取最大宽度
        return +Infinity;
      } else if (['status', 'tag'].includes(type!)) {
        content = getStatusAttrs(rowData, column).content;
      } else if (column.renderText) {
        content = rowData[getColumnSelectText(column)];
      }

      if (column.accuracy) {
        content = decimalFixed(content, column.accuracy, true);
      }

      let contentWidth = getStringWidth(content ?? '');

      if (column.slot) {
        const textContentWidth = getStringWidth(rowData[getColumnSelectText(column)]);
        const nameContentWidth = getStringWidth(rowData[getColumnSelectText(column, 'Name')]);
        contentWidth = Math.max(contentWidth, textContentWidth, nameContentWidth);
        if (selectType.includes(column.slotType!)) {
          contentWidth += 55;
        } else if (['input'].includes(column.slotType!)) {
          contentWidth += 40;
        }
      }

      return contentWidth + append + 16;
    })
  );
};

// 表头字符宽度(最小宽度)
export const headWidthAdaptor = ({
                                   label,
                                   required,
                                   icon,
                                   control,
                                   slot,
                                   headSlot,
                                   configWidth,
                                   configMinWidth,
                                   slotType,
                                   headTip
                                 }: CxTableColumnObj) => {
  const type = control?.type;
  if (['nativeCheckbox', 'nativeRadio'].includes(type!)) {
    return 60;
  } else if (['nativeDelete', 'expandSwitch'].includes(type!)) {
    return 60;
  }
  // 对于插槽的情况, 无法判断具体长度, 故单独处理(取配置项当中的值)
  else if ((slot || headSlot) && (configWidth || configMinWidth)) {
    return (configWidth ?? configMinWidth) as number;
  }
  let width = getStringWidth(label) + 16 + +!!required * 16 + +!!icon * 20;
  if ((slot || headSlot) && ['search', 'select'].includes(slotType!)) {
    width += 55;
  } else if (['input'].includes(slotType!)) {
    width += 40;
  }
  if (headTip) {
    width += 20;
  }
  return width;
};

// 表头映射宽度(最大宽度)
export const widthMapAdaptor = ({
                                  label,
                                  slot,
                                  headSlot,
                                  slotType,
                                  configWidth,
                                  configMinWidth
                                }: CxTableColumnObj) => {
  const targetItem = [...CxTableWidthMap.values()].find(item => item.rule(label))!;

  let { width, static: isStatic } = targetItem;

  // 对于插槽的情况, 无法判断具体长度, 故单独处理(取配置项当中的值)
  if (slot || headSlot) {
    if (configWidth || configMinWidth) {
      width = (configWidth ?? configMinWidth) as number;
      isStatic = !!configWidth;
    }
    if (selectType.includes(slotType!)) {
      width += 55;
    } else if (['input'].includes(slotType!)) {
      width += 40;
    }
  }

  const result = {
    ...targetItem,
    width,
    // 是否允许拉伸
    isMin: !isStatic
  };
  return result;
};

/**
 * 宽度优先级:
 * 由低到高排序为
 * 一级: widthMap映射-------------------- 最大宽度1
 * 二级: widthMap中带important关键字------ 最大宽度2 (L_MAX)
 * 三级: 表头字符长度--------------------- 最小宽度 (L_MIN)
 * 四级: 表格内容区宽度  ------------------ 一般情况 (L_CONTENT)
 * 五级: 通过setConfig设置的宽度----------- 特殊情况(高优先级)
 * 六级: 通过动态表头设置的宽度
 *
 * 在需求变动后, 前三级得到的结果作为最大宽度使用(L_MAX), 内容区宽度即作为通常宽度,五级,六级为特殊情况处理的宽度,优先级高于前四级
 * 特殊情况: 带有控件的列宽度为'一般情况'宽度加上控件所必须的宽度
 * 存在的问题: 插槽无法通过组件控制, 只能通过setConfig,动态表头配置等方式覆盖
 */
export const getColumnWidth = (
  $CxTable: CxTableBaseObj,
  column: CxTableColumnObj,
  props: CxTablePropType
) => {
  !isString(column.label) && cxTableWarn(`invalid cxTable config => ${ column.label } label`);

  const priority = $CxTable.priorityColumnMap.get(column.prop) ?? {};

  const result = { isMin: false, width: 0 };
  if (column.importantWidth) {
    // 六级
    const width = +column.importantWidth;
    isNaN(width) && cxTableWarn(`invalid cxTable config => ${ column.prop } importantWidth`);
    result.width = width || 0;
    result.isMin = !!column.autoWidth;
    return result;
  } else if (priority.width) {
    // 五级
    const width = +priority.width;
    isNaN(width) && cxTableWarn(`invalid cxTable config => ${ column.prop } priorityWidth`);
    result.width = width || 0;
  }
  // 二级(一级)
  const { width: L_MAX, isMin } = widthMapAdaptor(column) ?? {};

  // 是否使用适配器中的宽度可通过widthAdaptor开关关闭(不影响最高优先级的importantWidth与setConfig中的宽度)
  if (!props.widthAdaptor) {
    Reflect.set(result, 'width', column.configWidth);
  } else if (!result.width) {
    // 四级
    const L_CONTENT = contentWidthAdaptor(column, props);

    // 三级
    const L_MIN = headWidthAdaptor(column);

    result.width = L_CONTENT < L_MIN ? L_MIN : L_CONTENT > L_MAX ? L_MAX : L_CONTENT;
  }
  result.isMin = isMin;
  return result;
};
