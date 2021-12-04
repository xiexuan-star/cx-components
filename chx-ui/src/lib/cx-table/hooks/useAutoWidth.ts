import { getColumnWidth } from '../helper/widthHelper';
import { CxTableBaseObj, CxTablePropType } from '../types';
import { getParentColumn } from '../utils';

export const useAutoWidth = ($CxTable: CxTableBaseObj) => {
  const { wrapperEle } = $CxTable;
  if (!wrapperEle) return;
  const { columnStore, styleStore } = $CxTable;
  const {
    pxColumns,
    pxMinColumns,
    percentColumns,
    percentMinColumns,
    noWidthColumns
  } = columnStore;

  const wrapperWidth = wrapperEle.clientWidth;

  let remainWidth = wrapperWidth;

  let meanWidth = wrapperWidth / 100;

  let tableWidth = 0;

  pxColumns.forEach(col => {
    const pxWidth = parseInt(col.width + '');
    tableWidth += pxWidth;
    col.renderWidth = pxWidth;
  });
  pxMinColumns.forEach(col => {
    const pxWidth = parseInt(col.minWidth + '');
    tableWidth += pxWidth;
    col.renderWidth = pxWidth;
  });
  percentColumns.forEach(col => {
    const scaleWidth = Math.floor(parseInt(col.width + '') * meanWidth);
    tableWidth += scaleWidth;
    col.renderWidth = scaleWidth;
  });
  percentMinColumns.forEach(col => {
    const scaleWidth = Math.floor(parseInt(col.minWidth + '') * meanWidth);
    tableWidth += scaleWidth;
    col.renderWidth = scaleWidth;
  });
  noWidthColumns.forEach(col => {
    const width = styleStore.CX_TABLE_MIN_WIDTH;
    tableWidth += width;
    col.renderWidth = width;
  });

  remainWidth -= tableWidth;

  meanWidth =
    remainWidth > 0
      ? Math.floor(
        remainWidth / (percentMinColumns.length + pxMinColumns.length + noWidthColumns.length)
      )
      : 0;

  if (remainWidth > 0) {
    if (remainWidth > 0) {
      percentMinColumns
        .concat(pxMinColumns)
        .concat(noWidthColumns)
        .forEach((col: any) => {
          tableWidth += meanWidth;
          col.renderWidth += meanWidth;
        });
    }
  }
  const dynamicList = percentMinColumns.concat(pxMinColumns).concat(noWidthColumns);
  let dynamicSize = dynamicList.length - 1;
  if (dynamicSize > 0) {
    let offsetWidth = wrapperWidth - tableWidth;
    if (offsetWidth > 0) {
      while (offsetWidth > 0 && dynamicSize >= 0) {
        offsetWidth--;
        dynamicList[dynamicSize--].renderWidth++;
      }
      tableWidth = wrapperWidth;
    }
  }

  $CxTable.scrollStore.renderTotalWidth = tableWidth;
};

export const updateCxTableWidth = async (
  $CxTable: CxTableBaseObj,
  props: CxTablePropType,
  prop: string
) => {
  let targetColumn = $CxTable.flatColumns?.find(column => column.prop === prop);
  const parentColumn = getParentColumn($CxTable.columns, prop);

  /**
   * 由于在select,search,slot等情况下, 存在只有text变化而id不变化的情况, 难以通过列prop(xxxId)监听到全部的表格内容变化
   * 故需要由xxxText反推id列prop
   */
  if (!targetColumn) {
    if (/.+Text/.test(prop)) {
      const idProp = prop.replace(/Text$/, 'Id');
      targetColumn = $CxTable.flatColumns?.find(column => column.prop === idProp);
    }
  }

  if (!targetColumn) {
    targetColumn = $CxTable.flatColumns?.find(column => column.control?.selectText === prop);
  }

  if (!targetColumn) return;

  const widthState = getColumnWidth($CxTable, targetColumn, props);
  let { width } = widthState;
  const { isMin } = widthState;
  // 处理只有一个子项的情况
  if (parentColumn?.children?.length === 1) {
    const { width: parentWidth } = getColumnWidth($CxTable, parentColumn, props);
    width = Math.max(parentWidth, width);
  }
  // 当处于最后一列且配置了configurable,需要增加40px
  if (prop === $CxTable.flatColumns[$CxTable.flatColumns.length - 1].prop && props.configurable) {
    width += 40;
  }

  Reflect.set(targetColumn, isMin ? 'minWidth' : 'width', width),
    Reflect.deleteProperty(targetColumn, isMin ? 'width' : 'minWidth');
};
