import { createVNode, resolveComponent, h } from 'vue';
import { decimalFixed, getColumnSelectText, PATCH_FLAG } from '../../../../dist/chx-ui.esm';

export const renderPopperTextNode = (content) => {
  const comp = resolveComponent('CxEllipsis');
  if (!comp) return null;
  return createVNode(comp, { content }, null, PATCH_FLAG.PROPS, ['content']);
};

export const renderDefaultSelectNode = ({ rowData, column }) => {
  return renderPopperTextNode(rowData[getColumnSelectText(column)]);
};

export const renderDefaultNode = (params) => {
  const { column, rowData } = params;
  const value = rowData[column.prop] ?? column.defaultValue;

  if (column.renderText) {
    return renderDefaultSelectNode(params);
  }
  const content =
    typeof column.accuracy === 'number'
      ? decimalFixed(value, column.accuracy, true)
      : value;
  return renderPopperTextNode(content);
};

export const renderInputNode = params => {
  const { column, rowData } = params;
  const attrs = column.control?.attrs;
  const assignedAttrs = typeof attrs === 'function' ? attrs({ rowData, column }) : attrs;
  return h('input', {
    value: rowData[column.prop],
    onInput(event) {
      rowData[column.prop] = event.target.value;
    },
    ...assignedAttrs,
  });
};

export const renderIndexNode = params => {
  return h('div', null, params.rowIndex + 1);
};
