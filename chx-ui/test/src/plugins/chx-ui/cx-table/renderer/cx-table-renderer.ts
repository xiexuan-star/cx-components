import { decimalFixed, parseTime } from '@/utils';
import {
  createBlock,
  createCommentVNode,
  createVNode,
  Fragment,
  openBlock,
  resolveComponent,
  resolveDirective,
  withDirectives
} from 'vue';
import TableImg from '@/components/TableImg.vue';
import SingleRedFlag from '@/components/SingleRedFlag/index.vue';
import { isEmpty, isFunction, isNumber } from '@/utils/is';
import { PATCH_FLAG } from '@/constant/patchFlag';
import { useRouter } from 'vue-router';
import { rendererConfig, getColumnSelectText, getFunctionAttrs, getStatusAttrs } from '../../../../../../src';


export const renderSwitchNode = ({ column, rowData }: rendererConfig) => {
  rowData[getColumnSelectText(column)] = rowData[column.prop] ? '是' : '否';
  return (
    openBlock(),
    createBlock(resolveComponent('ElSwitch'), {
      modelValue: rowData[column.prop],
      'onUpdate:modelValue': (val: any) => {
        rowData[column.prop] = val;
        rowData[getColumnSelectText(column)] = val ? '是' : '否';
      }
    })
  );
};

export const renderPopperTextNode = (content: string) => {
  const comp = resolveComponent('OneEllipsis');
  if (!comp) return null;
  return createVNode(comp, { content }, null, PATCH_FLAG.PROPS, ['content']);
};

export const renderIndexNode = ({ rowIndex, pagination }: rendererConfig) => {
  return createVNode(
    'i',
    null,
    (function() {
      let result = rowIndex + 1;
      if (pagination) {
        result += ((+pagination.currentPage || 1) - 1) * (+pagination.pageCapacity || 0);
      }
      return result;
    })()
  );
};

// 获取默认节点
export const renderDefaultNode = (params: rendererConfig) => {
  const { column, rowData } = params;
  if (column.renderText) {
    return renderDefaultSelectNode(params);
  }
  const value = rowData[column.prop] ?? column.defaultValue;
  const content = isNumber(column.accuracy) ? decimalFixed(value, column.accuracy, true) : value;
  return renderPopperTextNode(content);
};

// 获取默认数组转字符串文本节点
const getJoinString = (val: any, { rowData, rowIndex, column }: rendererConfig) => {
  return Array.isArray(val)
    ? (function() {
        const optionList = isFunction(column.control?.options)
          ? column.control?.options({ rowData, rowIndex })
          : column.control?.options;
        return (
          val
            .reduce((res, item) => {
              if (typeof item === 'number') {
                const option = optionList?.find(option => option.id === item);
                if (option) {
                  res.push(option.name);
                } else {
                  res.push(item + '');
                }
              } else if (typeof item === 'string') {
                res.push(item);
              }
              return res;
            }, [] as string[])
            .join(',') || column.defaultValue
        );
      })()
    : val || column.defaultValue;
};

export const renderJoinStringNode = (params: rendererConfig) => {
  const val = params.rowData[params.column.prop];
  return (
    openBlock(),
    createBlock(Fragment, null, [renderPopperTextNode(getJoinString(val, params))], PATCH_FLAG.TEXT)
  );
};

// 获取默认选择框节点
export const renderDefaultSelectNode = ({ rowData, column }: rendererConfig) => {
  return renderPopperTextNode(rowData[getColumnSelectText(column)]);
};

// 获取checkbox节点
export const renderDefaultCheckboxNode = ({
  selectConfig,
  bus,
  rowIndex,
  rowData
}: rendererConfig) => {
  const comp = resolveComponent('ElCheckbox');

  if (!comp) {
    return null;
  }

  return createVNode(
    comp,
    {
      modelValue: selectConfig.selectItem[rowIndex + ''],
      disabled: selectConfig.disabled || selectConfig.checkSelect?.(rowData),
      'onUpdate:modelValue': (val: any) => bus.emit('toggleRowSelection', rowIndex, val)
    },
    null,
    PATCH_FLAG.PROPS | PATCH_FLAG.NEED_PATCH,
    ['modelValue', 'disabled']
  );
};

// 获取单选节点
export const renderRadioNode = ({ radioValue, rowIndex }: rendererConfig) => {
  const comp = resolveComponent('ElRadio');

  if (!comp) {
    return null;
  }
  return createVNode(
    comp,
    {
      modelValue: radioValue.value,
      'onUpdate:modelValue': (val: any) => (radioValue.value = val),
      label: rowIndex
    },
    null,
    PATCH_FLAG.PROPS | PATCH_FLAG.NEED_PATCH,
    ['modelValue', 'label']
  );
};

// 获取折叠行开关节点
export const renderExpandSwitch = ({ rowData, expandConfig, rowIndex, bus }: rendererConfig) => {
  const classList = ['cx-table_expand_switch', 'iconfont', `icon-xiangxia`];

  if (expandConfig[rowIndex]) {
    classList.push('cx-table_expand_active');
  }

  const onClick = () => {
    expandConfig[rowIndex] = !expandConfig[rowIndex];
    bus.emit('expandCheck', { rowIndex, value: expandConfig[rowIndex], rowData });
  };

  return createVNode('i', { class: classList, onClick });
};

const formatType = {
  date: 'YYYY-MM-DD',
  time: 'YYYY-MM-DD HH:mm'
};
// 获取时间节点
export const renderTimeNode = (type: 'date' | 'time', { rowData, column }: rendererConfig) => {
  return createVNode(
    'div',
    null,
    parseTime(
      rowData[column.prop],
      column.control?.timeFormat || formatType[type],
      column.defaultValue
    ),
    PATCH_FLAG.TEXT
  );
};

// 获取图片节点
export const renderImgNode = ({ rowData, column }: rendererConfig) => {
  const photos = rowData[column.prop] ?? [];
  const attrs = getFunctionAttrs(rowData, column.control?.attrs);
  return createVNode(
    TableImg,
    {
      photos: Array.isArray(photos) ? photos : photos ? [photos] : [],
      ...attrs,
      picHost: attrs?.picHost || ''
    },
    null,
    PATCH_FLAG.PROPS,
    ['photos', 'picHost']
  );
};

// 获取输入框节点
export const renderInputNode = ({ rowData, column }: rendererConfig) => {
  const comp = resolveComponent('ElInput');

  if (!comp) {
    return null;
  }

  const attrs = getFunctionAttrs(rowData, column.control?.attrs);
  const onBlur = (event: any) => {
    rowData[column.prop] = rowData[column.prop]?.trim?.() ?? rowData[column.prop];

    if (isNumber(column.accuracy)) {
      rowData[column.prop] = decimalFixed(rowData[column.prop], column.accuracy, true);
      isFunction(attrs?.onInput) && attrs?.onInput?.(event, rowData);
      isFunction(attrs?.onBlur) && attrs?.onBlur?.(event, rowData);
    }
  };

  const onInput = (event: any) => {
    isFunction(attrs?.onInput) && attrs?.onInput(event, rowData);
  };

  const onChange = (event: any) => {
    isFunction(attrs?.onChange) && attrs?.onChange(event, rowData);
  };

  const hoisted_directive_1 = resolveDirective('number-input');

  const inputCompCreator = () =>
    createVNode(
      comp,
      {
        size: 'mini',
        modelValue: rowData[column.prop],
        'onUpdate:modelValue': (val: any) => (rowData[column.prop] = val),
        ...attrs,
        onBlur,
        onInput,
        onChange
      },
      null,
      PATCH_FLAG.FULL_PROPS | PATCH_FLAG.NEED_PATCH
    );

  return (
    openBlock(),
    createBlock(Fragment, null, [
      hoisted_directive_1 && column.number
        ? withDirectives(inputCompCreator(), [[hoisted_directive_1, column.number]])
        : inputCompCreator()
    ])
  );
};

const updateSelectText = (id: number, { rowData, column, rowIndex }: rendererConfig) => {
  const option = (isFunction(column.control?.options)
    ? column.control?.options({ rowData, rowIndex })
    : column.control?.options
  )?.find(item => item.id === id);
  rowData[getColumnSelectText(column)] = option?.name;
};

const onChange = (id: number, payload: rendererConfig, attrs: AnyObject | undefined) => {
  const { rowData, column } = payload;
  rowData[column.prop] = id;
  updateSelectText(id, payload);
  isFunction(attrs?.onChange) && attrs?.onChange(id, rowData);
};

// 获取选择框节点
export const renderSelectNode = (params: rendererConfig) => {
  const { rowData, column, rowIndex } = params;
  const comp = resolveComponent('ElSelect');
  const comp2 = resolveComponent('ElOption');
  if (!comp || !comp2) {
    return null;
  }
  const attrs = getFunctionAttrs(rowData, column.control?.attrs);

  !isEmpty(rowData[column.prop]) && updateSelectText(rowData[column.prop], params);

  return createVNode(
    comp,
    {
      modelValue: rowData[column.prop],
      'onUpdate:modelValue': (val: any) => (rowData[column.prop] = val),
      size: 'mini',
      ...attrs,
      onChange: (id: number) => onChange(id, params, attrs)
    },
    {
      default: () => {
        return (
          openBlock(true),
          createBlock(
            Fragment,
            null,
            (isFunction(column.control?.options)
              ? column.control?.options({ rowData, rowIndex })
              : column.control?.options
            )?.map(option => {
              return createVNode(
                comp2,
                {
                  label: option.name,
                  value: option.id,
                  key: option.id,
                  disabled: option.disabled
                },
                null,
                PATCH_FLAG.PROPS,
                ['label', 'value']
              );
            }) ?? [createCommentVNode('v-if', true)],
            PATCH_FLAG.KEYED_FRAGMENT
          )
        );
      }
    },
    PATCH_FLAG.FULL_PROPS | PATCH_FLAG.NEED_PATCH
  );
};

// 获取拼音搜索选择框节点
export const renderSearchNode = (params: rendererConfig) => {
  const { rowData, column, rowIndex } = params;
  const comp = resolveComponent('SelectSearch');
  if (!comp) {
    return null;
  }
  !isEmpty(rowData[column.prop]) && updateSelectText(rowData[column.prop], params);

  const attrs = getFunctionAttrs(rowData, column.control?.attrs);
  return createVNode(
    comp,
    {
      size: 'mini',
      ...attrs,
      onChange: (id: number) => onChange(id, params, attrs),
      options: isFunction(column.control?.options)
        ? column.control?.options({ rowData, rowIndex })
        : column.control?.options ?? [],
      modelValue: rowData[column.prop],
      'onUpdate:modelValue': (val: any) => (rowData[column.prop] = val)
    },
    null,
    PATCH_FLAG.FULL_PROPS | PATCH_FLAG.NEED_PATCH
  );
};

// 获取numberInput组件节点
export const renderNumberInput = ({ rowData, column }: rendererConfig) => {
  const comp = resolveComponent('NumberInput');
  if (!comp) {
    return null;
  }
  const attrs = getFunctionAttrs(rowData, column.control?.attrs);
  const onBlur = (event: any) => {
    if (isNumber(column.accuracy)) {
      rowData[column.prop] = decimalFixed(rowData[column.prop], column.accuracy, true);
      isFunction(attrs?.onInput) && attrs?.onInput?.(event, rowData);
    }
  };

  return createVNode(
    comp,
    {
      size: 'mini',
      modelValue: rowData[column.prop],
      'onUpdate:modelValue': (val: any) => (rowData[column.prop] = val),
      precision: column.accuracy,
      ...attrs,
      onBlur
    },
    null,
    PATCH_FLAG.FULL_PROPS | PATCH_FLAG.NEED_PATCH
  );
};

// 获取删除行节点
export const renderDelOperationNode = ({
  rowData,
  column,
  rowIndex,
  bus,
  broadcast
}: rendererConfig) => {
  const comp = resolveComponent('CxBtn');
  if (!comp) return null;
  return createVNode(
    comp,
    {
      content: '删除',
      type: 'danger',
      level: 3,
      key: rowIndex,
      onClick: () => {
        broadcast.trigger('nativeDelete', rowData, { rowData, prop: column.prop });
        bus.emit('deleteRow', rowIndex);
      }
    },
    null,
    PATCH_FLAG.NEED_PATCH
  );
};

// 获取石料规格节点
export const renderSpecificationNode = ({ rowData, column }: rendererConfig) => {
  const comp = resolveComponent('Specification');
  if (!comp) return null;
  const attrs = getFunctionAttrs(rowData, column.control?.attrs);

  const onBlur = (event: any) => {
    isFunction(attrs?.onInput) && attrs?.onInput?.(event, rowData);
  };

  return createVNode(
    comp,
    {
      modelValue: rowData[column.prop],
      'onUpdate:modelValue': (val: string) => Reflect.set(rowData, column.prop, val),
      decimal: column.accuracy ?? 2,
      ...attrs,
      onBlur
    },
    null,
    PATCH_FLAG.FULL_PROPS
  );
};

// 渲染备忘列
export const renderMemoRedFlag = ({ rowData, column }: rendererConfig) => {
  const comp = resolveComponent('MemoRedFlag');
  if (!comp) return null;
  const attrs = getFunctionAttrs(rowData, column.control?.attrs);
  const pAttrs = rowData.goodsIndex
    ? { goodsIndex: rowData.goodsIndex, memo: rowData.memo, ...attrs }
    : { icon: true, produceNo: rowData.produceNo, orderId: rowData.id, row: rowData, ...attrs };
  const compName = rowData.goodsIndex ? SingleRedFlag : comp;
  return createVNode(compName, pAttrs);
};

export const renderTagNode = (
  { rowData, column }: rendererConfig,
  renderType: 'status' | 'tag'
) => {
  const { content, type } = getStatusAttrs(rowData, column);

  return createVNode(
    renderType === 'status' ? 'div' : resolveComponent('CxTag'),
    { type, size: 'mini' },
    { default: () => content },
    PATCH_FLAG.STABLE_FRAGMENT | PATCH_FLAG.PROPS,
    ['type']
  );
};
