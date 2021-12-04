import dayjs from 'dayjs';
import { COLUMN_FLAG } from '../constant';
import { ControlAttrs, CxTableColumnObj, CxTableItem, DYNAMIC_CONFIG, Nullable } from '../types';
import * as R from 'ramda';
import { useCxTable } from '../hooks';
import { isFunction, isNumber, isObject, getDateRange } from 'chx-utils';

export * from './dom';
export * from './configAdaptor';

export const getFunctionAttrs = (
  rowData: AnyObject,
  attrs?: ControlAttrs | ((a: { rowData: AnyObject }) => ControlAttrs | undefined)
) => {
  if (isFunction(attrs)) {
    const result = attrs({ rowData });
    return isObject(result) ? result : void 0;
  }
  return attrs;
};


export const changeDynamicIdToText = (dynamic: DYNAMIC_CONFIG) => {
  const {
    DYNAMIC_BUSINESS_TYPE,
    DYNAMIC_MODULE_TYPE,
    DYNAMIC_MODEL_TYPE,
    DYNAMIC_PRICE_TYPE
  } = useCxTable().getContext().dynamicType;
  return {
    businessType: DYNAMIC_BUSINESS_TYPE[dynamic.businessType],
    moduleType: DYNAMIC_MODULE_TYPE[dynamic.moduleType],
    modelType: DYNAMIC_MODEL_TYPE[dynamic.modelType],
    priceType: DYNAMIC_PRICE_TYPE[dynamic.priceType]
  };
};

export const getParentColumn = (columns: CxTableColumnObj[], prop: string) => {
  let result: CxTableColumnObj | undefined;

  function find(cols?: CxTableColumnObj[]) {
    if (!Array.isArray(cols)) return;
    cols.some(col => {
      if (Array.isArray(col.children)) {
        const target = col.children.some(child => {
          find(child.children);
          return child.prop === prop;
        });
        if (target) {
          return (result = col);
        }
      }
    });
  }

  find(columns);
  return result;
};

export function getTargetColumn<T extends { children?: T[]; prop: string }>(
  prop: string,
  cols?: T[]
) {
  if (!Array.isArray(cols)) return;
  let result: T | undefined;
  cols.find(col => {
    if (col.prop === prop) {
      return (result = col);
    }
    return (result = getTargetColumn(prop, col.children));
  });
  return result;
}

export function deepMerge<T = any>(src: any, target: any): T {
  let key: string;
  for (key in target) {
    src[key] =
      src[key] && isObject(src[key]) ? deepMerge(src[key], target[key]) : (src[key] = target[key]);
  }

  return src;
}

const format = (val: Date) => dayjs(val).format('YYYY-MM-DD');
export const formatDate = R.ifElse(R.is(Array), R.map(format), format);
const format2 = (val: Date) => dayjs(val).format('YYYY-MM-DD HH-mm-ss');
export const formatTime = R.ifElse(R.is(Array), R.map(format2), format2);

export function formatFormDefaultValue(defaultEnum: string, searchType: string) {
  switch (defaultEnum) {
    case 'all':
      return -1;
    case 'week':
      return formatDate(getDateRange(7, 'date'));
    case 'today':
      return searchType === 'dateRange'
        ? formatDate(getDateRange(1, 'date'))
        : formatDate(Date.now());
    case 'mouth':
      return searchType === 'dateRange'
        ? formatDate(getDateRange(0, 'month', true))
        : formatDate(Date.now());
    case 'now':
      return formatTime(Date.now());
    default:
      return +defaultEnum || defaultEnum;
  }
}

/**
 * 选择对象属性
 * @param object 需要copy属性的对象
 * @param props 需要copy的属性列表
 */
export function pick<T extends Record<string, any>, K extends keyof T>(
  object: T,
  props: K[] | K = []
): Pick<T, K> {
  const res: any = {};
  const arr = Array.isArray(props) ? props : [props];
  (Object.keys(object) as K[]).forEach((key: K) => {
    if (arr.includes(key)) {
      res[key] =
        typeof object[key] === 'object' && object[key] !== null
          ? R.clone(object[key])
          : object[key];
    }
  });

  return res;
}

export const getColumnSelectText = (
  column: CxTableColumnObj | CxTableItem,
  replaceProp = 'Text'
) => {
  return column.control?.selectText || `${ column.prop.replace(/Id$/, '') }${ replaceProp }`;
};

export function cxTableWarn(...msgs: any[]) {
  console.warn(`[cxTable warn]:`, ...msgs);
}

export function getStringWidth(str: any) {
  if (!str) return 0;
  if (isNumber(str)) {
    str = str + '';
  }

  if (str === true) {
    return 64;
  }

  return [...str].reduce((width, char) => {
    if (/[a-zA-Z]/.test(char)) {
      return width + 13;
    }

    if (/\d/.test(char)) {
      return width + 9;
    }

    if (/\./.test(char)) {
      return width + 4;
    }

    if (/[\u4e00-\u9fa5]/.test(char)) {
      return width + 16;
    }

    if (/-/.test(char)) {
      return width + 4;
    }

    if (/（|）/.test(char)) {
      return width + 14;
    }

    if (/\(|\)/.test(char)) {
      return width + 5;
    }

    if (/-/.test(char)) {
      return width + 10;
    }

    if (/%/.test(char)) {
      return width + 14;
    }

    if (/‰/.test(char)) {
      return width + 16;
    }

    return width + 6;
  }, 0);
}

export function copySort(arr: AnyObject[], sortFun: any) {
  return [...arr].sort(sortFun);
}

export const getTotalSumData = (cols: CxTableColumnObj[], data: AnyObject[]): AnyObject => {
  const result: AnyObject = {};
  cols.forEach(col => {
    if (col.columnFlag & COLUMN_FLAG.TEXT_SUM_COLUMN) {
      result[col.prop] = '总计';
    } else if (col.columnFlag & COLUMN_FLAG.ADD_SUM_COLUMN) {
      if (col.columnFlag & COLUMN_FLAG.CALC_COLUMN) {
        data.forEach(rowData => {
          rowData[col.prop] = col.calculate?.(rowData) ?? rowData[col.prop];
        });
      }
      result[col.prop] = getSums(data, col.prop);
    } else if (col.columnFlag & COLUMN_FLAG.CUSTOM_SUM_COLUMN) {
      result[col.prop] = isFunction(col.sum) ? col.sum(data) : null;
    }
  });
  return result;
};

export const findAncestor = (inputEle: HTMLInputElement, className: string, searchLimit = 6) => {
  let result: Nullable<HTMLElement> = null;

  let parent = inputEle.parentNode as HTMLElement;

  do {
    if (parent.nodeName === 'TD') break;
    if (parent.classList.contains(className)) {
      result = parent;
      break;
    }
    parent = parent.parentNode as HTMLElement;
  } while (searchLimit--);

  return result;
};

/**
 * @param {boolean[]} arr 数据源
 * @param {number} index 索引
 * @description 更新boolean数组状态
 */
export const toggleArrState = (arr: boolean[], index: number) => {
  Reflect.set(arr, index, !arr[index]);
};

// items数组扁平化
export const arrFlat = <T extends AnyObject>(items: T[], childProp = 'children') => {
  const result: T[] = [];

  const getItems = (item: T) => {
    if (item[childProp]?.length) {
      item[childProp].forEach((child: any) => {
        getItems(child);
      });
    } else {
      result.push(item);
    }
  };

  items.forEach(getItems);

  return result;
};

/**
 * @param {string | number | undefined} width 数据源
 * @description 宽度字符格式化
 */
export const formatWidth = (width: string | number | undefined) => {
  if (!width) return;
  const duplicate = width + '';

  if (duplicate.includes('%') || duplicate.includes('px')) return duplicate;
  return `${ parseFloat(duplicate) }px`;
};

/**
 * @param {Object} target 被覆盖对象
 * @param {Object} attr 覆盖对象
 * @description 合并元素属性,对class,style属性进行特殊合并
 */
export const assignAttrs = (target: AnyObject = {}, attr: AnyObject = {}) => {
  const style = Object.assign({}, target.style, attr.style);

  const classDup = `${ target.class || '' } ${ attr.class || '' }`;

  return Object.assign({}, target, attr, { style, class: classDup });
};

/**
 * @description 转换为分层表头列表
 * @param columns 表头参数列表
 */
export const invokeLayeredRow = (columns: CxTableColumnObj[]) => {
  const result: CxTableColumnObj[][] = [];

  const getHeaders = (columns: CxTableColumnObj[], level: number) => {
    if (!result[level]) result[level] = [] as CxTableColumnObj[];

    columns.forEach((item: CxTableColumnObj) => {
      if (!item.hide) {
        result[level].push(item);
      }
      if (item.children?.length) {
        getHeaders(item.children, level + 1);
      }
    });
  };

  getHeaders(columns, 0);

  return result;
};

export const getSums = (arr: AnyObject[], prop = 'renderWidth') => {
  let result = 0;

  function sums(arr: AnyObject[]) {
    arr.forEach(item => {
      if (item?.children?.length) {
        sums(item.children);
      } else {
        result += +item[prop] || 0;
      }
    });
  }

  sums(arr);
  return result;
};

export const getPreOrNextItem = <T = AnyObject>(
  arr: T[],
  item: T,
  direction: 'pre' | 'next',
  prop?: string
): T => {
  const index = arr.findIndex((arrItem) => {
    return prop ? arrItem[prop] === item[prop] : arrItem === item;
  });
  if (index < 0) return item;
  return arr[index + (direction === 'pre' ? -1 : 1)] ?? item;
};

export const getStatusAttrs = (rowData: AnyObject, column: CxTableColumnObj | CxTableItem) => {
  const { statusMap } = column.control ?? {};

  // statusMap分2种情况, Array => string[] / Object => { [k:string]:{content?:string,prop?:string,type?:string} }
  const { content, prop, type } = Array.isArray(statusMap)
    ? { content: statusMap[rowData[column.prop]], prop: undefined, type: undefined }
    : statusMap?.[rowData[column.prop]] ?? statusMap?.default ?? {};

  return {
    content: content ? content : prop ? rowData[prop] : rowData[prop + 'Text'] ?? '',
    type
  };
};
