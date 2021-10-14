import { getPrecisionConfig, PRECISION_TYPE, PRECISION_TYPE_ARR } from '@/config/precision';
import { isArray, isErrorLike, isEmpty, isFunction } from './is';
import { ElMessage, ElMessageBox } from 'element-plus';
import { parseTimeParams } from '@/hooks/pickerOptions';
import { decimals } from '.';
import { cloneDeep } from 'lodash';
import { CxTableDynamicColumn } from 'chx-ui';

/**
 * 下载文件
 * @param buffer 数据
 * @param name 文件名
 */
export function download(buffer: BlobPart, name: string) {
  if (!buffer) return;
  const link = document.createElement('a');
  const url = (link.href = URL.createObjectURL(new Blob([buffer])));
  link.style.display = 'none';
  link.download = name;

  document.body.appendChild(link);
  link.click();

  URL.revokeObjectURL(url);
  document.body.removeChild(link);
  return 'ok';
}

/**
 * 处理下载失败的函数
 */
export function dealErrMsg(err: Blob | Error) {
  if (!(err instanceof Blob)) {
    return ElMessage.error(isErrorLike(err) ? err.message : '系统错误');
  }

  const reader = new FileReader();
  reader.readAsText(err);
  reader.onload = e => {
    try {
      const res = JSON.parse(e.target?.result as string);
      ElMessage.error(res.message);
    } catch (error) {
      ElMessage.error('系统错误');
    }
  };
}

/**
 * 数字补位
 * @param precision 精度
 * @param force 是否强制修正
 */
export function decimalFixed<T extends unknown>(
  value: T,
  precision: number | undefined,
  force = false
): T | string {
  if (value === '' || isNaN(+value) || precision === undefined) {
    return value;
  }

  if (precision < 0 || precision !== parseInt(precision + '', 10)) {
    console.error('精度错误', precision);
    return value;
  }

  const num = +(+value).toPrecision(12);
  if (force) {
    return (+decimals(+num, precision)).toFixed(precision);
  }

  const len = num.toString().split('.')[1]?.length || 0;
  return (+decimals(+num, Math.max(precision, len))).toFixed(Math.max(precision, len));
}

export function dealDateRange<T = AnyObject>(
  params: T,
  dateRange: [Date, Date] | null,
  fmt = 'YYYY-MM-DD'
): T & DateRange {
  const [beginDate, endDate] = parseTimeParams(dateRange, fmt);
  return Object.assign({}, params, { beginDate, endDate });
}

/**
 * 数字补位扩展版
 * @param value 需要补位的值
 * @param precisionType 精度类型
 * @returns 补位后的值
 */
export function decimalFixedExtend<T extends unknown>(value: T, precisionType: PRECISION_TYPE) {
  if (!PRECISION_TYPE_ARR.includes(precisionType)) return value;

  const precisionConfig = getPrecisionConfig();

  return decimalFixed(value, precisionConfig[precisionType]);
}

/**
 * 对象属性剔除
 * @param object 需要剔除属性的对象
 * @param props 需要剔除的属性列表
 */
export function omit<T extends Record<string, any>, K extends keyof T>(
  object: T,
  props: K[] | K = []
): Omit<T, K> {
  const res: any = {};
  const arr = Array.isArray(props) ? props : [props];
  (Object.keys(object) as K[]).forEach((key: K) => {
    if (!arr.includes(key)) {
      res[key] =
        typeof object[key] === 'object' && object[key] !== null
          ? cloneDeep(object[key])
          : object[key];
    }
  });

  return res;
}

/**
 * 返回剔除对象中指定值字段的新对象
 * @param obj 需要剔除的对象
 * @param value 指定的值
 */
export function omitSpecifyValue<T = any>(obj: AnyObject, value: any): T {
  const newObj: any = {};
  for (const key in obj) {
    const val = obj[key];
    if (isArray(value) && !value.includes(val)) {
      newObj[key] = val;
    }

    if (!isArray(value) && val !== value) {
      newObj[key] = val;
    }
  }

  return newObj;
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
          ? cloneDeep(object[key])
          : object[key];
    }
  });

  return res;
}

/**
 * @description 格式化宽度
 * @param width
 */
export function parseWidth(width: number | string | null): number | string | null {
  if (width !== undefined) {
    width = parseInt(width as string, 10);
    if (isNaN(width)) {
      width = null;
    }
  }
  return width;
}

export function parseMinWidth(minWidth: any): number {
  if (typeof minWidth !== 'undefined') {
    minWidth = parseWidth(minWidth);
    if (isNaN(minWidth)) {
      minWidth = 60;
    }
  }
  return minWidth;
}

/**
 * parse刻字内容
 */
export function parseInscription(inscriptionNote?: string | string[]) {
  if (!inscriptionNote) {
    return [];
  }

  if (Array.isArray(inscriptionNote)) {
    return inscriptionNote;
  }

  try {
    const arr = JSON.parse(inscriptionNote);
    return Array.isArray(arr) ? arr : [`${arr}`];
  } catch (e) {
    return [inscriptionNote];
  }
}

/**
 * 格式化params数据
 * @param params 数据对象
 * @param flag 是否将数组格式化成带逗号的字符串
 */
export function formatParams<T extends Record<string, unknown>>(params: T, flag?: boolean) {
  if (isEmpty(params)) {
    return {};
  }

  const obj = Object.create(null);
  for (const [key, value] of Object.entries(params)) {
    if (value === -1 || isEmpty(value)) {
      continue;
    } else if (Array.isArray(value) && flag) {
      obj[key] = value.join(',');
    } else {
      obj[key] = value;
    }
  }

  return obj;
}

/**
 *
 * @param str 首字母大写还是小写
 * @param flag true: 转化大写, false: 转化小写
 * @description 首字母大小写转化
 */
export function strFirstCase(str: string, flag = true) {
  if (!str) return '';
  return str[0][flag ? 'toUpperCase' : 'toLowerCase']() + str.substr(1);
}

export async function mConfirm({
  msg = '还有信息没有保存，确定编辑其他下单信息？',
  errMsg = '已取消',
  type = 'warning',
  confirmButtonText = '确定',
  cancelButtonText = '取消',
  title = '提示'
}) {
  try {
    setTimeout(async () => {
      const btn = document.querySelector<HTMLElement>(
        '.el-overlay.is-message-box .el-button--primary'
      );

      if (btn) btn.focus();
    }, 0);
    return await ElMessageBox.confirm(msg, title, {
      confirmButtonText,
      cancelButtonText,
      type: type as any
    });
  } catch (e) {
    document.body.focus();
    ElMessage({
      type: 'info',
      message: errMsg
    });
  }
}

export function mAlert(msg = '确认？', title = '提示') {
  return ElMessageBox.alert(msg, title, {
    confirmButtonText: '确定'
  });
}

interface ToMapOptions<T> {
  valueKey?: string; // map值对应数据中的key, 为假值时使用整个数据作为值
  idKey?: string; // 数据key
  fomatter?(value: T): any; // value 格式化函数
}

/**
 * arr转map
 * @param options 默认值: { valueKey: 'name' }
 * @param options.id 默认值: 'id'
 */
export function arrToMap<T = string>(arr?: any[], options: ToMapOptions<T> = { valueKey: 'name' }) {
  const { valueKey, idKey = 'id', fomatter } = options;

  const map = new Map();
  (arr || []).forEach(v => {
    if (v && typeof v === 'object') {
      const value = valueKey ? v[valueKey] : v;
      map.set(v[idKey], fomatter ? fomatter(value) : value);
    } else {
      map.set(v, v); // 数据不是对象，将数据直接作为键值设置
    }
  });

  return map;
}

/**
 * @description 判断对象是否为vue组件参数
 * @param {Object} obj
 */
export function isVueConfig(obj?: AnyObject): boolean {
  if (!obj) return false;
  return (
    isFunction(obj.render) ||
    isFunction(obj.setup) ||
    isFunction(obj.data) ||
    isFunction(obj.methods) ||
    isFunction(obj.computed)
  );
}

export function deepMerge<T = any>(src: any, target: any): T {
  let key: string;
  for (key in target) {
    src[key] =
      src[key] && src[key].toString() === '[object Object]'
        ? deepMerge(src[key], target[key])
        : (src[key] = target[key]);
  }

  return src;
}

/**
 * @param arr
 * @param idKey
 * @param nameKey
 * @description 将列表装换成nameWidthId数组
 */
export function other2NameWithId<T extends AnyObject>(
  arr: T[] = [],
  idKey: keyof T,
  nameKey: keyof T
): NameWithId[] {
  if (!Array.isArray(arr)) return [];
  return arr.map(item => ({
    id: item[idKey],
    name: item[nameKey]
  }));
}

/**
 * 将改变行数据和更改文本
 * @param row
 * @param prop
 * @param id
 * @param options
 * @param param4
 */
export function id2name(
  row: AnyObject,
  prop: string,
  id: number,
  options: AnyObject[],
  { idKey = 'id', nameKey = 'name', selectKey = '' } = {}
) {
  const option = options?.find(item => item[idKey] === id);
  row[selectKey || prop.replace(/Id$/, '') + 'Text'] = option?.[nameKey] ?? '';
  return option;
}

export function formatGoodsIndex(list: ({ goodsIds: number; goodsIndex: number } & AnyObject)[]) {
  const goodsStr = list.map(item => item.goodsIndex).sort((a, b) => a - b);
  return goodsStr
    .reduce((res, item) => {
      if (!res.length) res.push([item]);
      else {
        const arr = res.slice(-1)[0];
        if (item - arr.slice(-1)[0] === 1) {
          arr.push(item);
        } else {
          res.push([item]);
        }
      }
      return res;
    }, [] as number[][])
    .map(item => {
      if (item.length > 1) {
        return `${item[0]}-${item.slice(-1)[0]}`;
      } else {
        return item[0];
      }
    })
    .join(',');
}

/**
 * 表格数据添加合并行属性
 * @param data 表格数据
 * @param spanProp 计算出合并数值的prop
 * @param spanKey 存放合并数值的key
 */
export function addTableSpanProp(
  data: AnyObject[],
  spanProp: string | string[] = 'produceNo',
  spanKey = 'row_span'
) {
  if (!data.length) return;
  const obj: AnyObject = {};
  data.forEach((item, index) => {
    spanProp = Array.isArray(spanProp) ? spanProp : [spanProp];
    const key = spanProp[0];
    if (item[key]) {
      const compareValue = spanProp.reduce((res, cur) => (res += item[cur]), '');
      if (index && obj[index - 1] && obj[index - 1][key] === compareValue) {
        obj[index] = {
          index: obj[index - 1].index,
          sum: 0,
          [key]: compareValue
        };
        obj[obj[index - 1].index].sum++;
      } else {
        obj[index] = { index, sum: 1, [key]: compareValue };
      }
    } else {
      Reflect.set(item, spanKey, 1);
    }
  });
  Object.entries(obj).forEach(([key, value]) => {
    Reflect.set(data[+key], spanKey, value.sum);
  });
}

/**
 * 获取合并方法的工厂函数
 * @param spanProps 需要合并的props
 * @param spanKey 存放合并数据的key
 */
export function getSpanMethod(spanProps: string[], spanKey = 'row_span') {
  return ({ rowData, column }: any) => {
    if (spanProps.includes(column.prop)) {
      return [rowData[spanKey] || 0, 1];
    }
    return [1, 1];
  };
}

// 函数柯里化
export const curryingFun = (fn: Func<any>, arr: any[] = []) => (...args: any[]) =>
  (arg => (arg.length === fn.length ? fn(...arg) : curryingFun(fn, arg)))([...arr, ...args]);

// 获取text文本字段
export const getTextKey = (key: string, suffix = '') => {
  return key.replace('Id', '') + suffix;
};
/**
 * @param row 需要覆盖的数据
 * @param keysMap
 * @param sourceList
 *
 * keysMap的格式，key是代表row里的字段，
 */
export const updateRowList = (
  row: AnyObject,
  keysMap: Map<string, { key?: string; id: string; name?: string }>,
  sourceList: AnyObject[],
  omitKey?: string
) => {
  // 筛选出合格的list
  const list = sourceList.filter((item: AnyObject) => {
    return Array.from(keysMap.values()).every(ele => {
      const key = ele.key ?? ele.id;
      return isEmpty(row[key]) || row[key] === item[ele.id] || key === omitKey;
    });
  });

  const keysArr = Array.from(keysMap.entries());
  const mapKeys = Array.from(keysMap.keys());
  const obj = keysArr.reduce((res, [key, value]) => {
    if (Reflect.get(value, 'name')) {
      res[value.id] = new Set();
    }
    res[key] = new Set();
    return res;
  }, {} as Record<string, Set<number | string | NameWithId>>);

  const endObj = list.reduce((res, item: AnyObject) => {
    keysArr.forEach(([key, value]) => {
      if (isEmpty(item[value.id])) return;
      if (Reflect.get(value, 'name')) {
        if (res[value.id].has(item[value.id])) return;
        res[value.id].add(item[value.id]);
        res[key].add({ id: item[value.id], name: item[value.name!] });
      } else {
        res[key].add(item[value.id]);
      }
    });
    return res;
  }, obj);

  const returnObj = Object.entries(endObj).reduce((res, [key, value]) => {
    if (mapKeys.includes(key)) res[key] = Array.from(value);
    return res;
  }, {} as AnyObject);

  // const unitObj = {};
  // if (list.length) Reflect.set(unitObj, 'measureUnit', list[0].measureUnit);

  Object.assign(row, returnObj);

  return returnObj;
};

export function firstCharUpperCase(str: string) {
  return str[0].toUpperCase() + str.slice(1);
}

export function firstCharLowerCase(str: string) {
  return str[0].toLowerCase() + str.slice(1);
}

/**
 * @description 将空格装换成可显示字符
 */
export function space2Code(str: string) {
  return str?.replace(/ /g, '\xa0') ?? '';
}

/**
 * @description 表格内下拉文本显示
 */
export function showPropText(row: AnyObject, prop: string, suffix = 'Text') {
  const key = prop.replace('Id', '') + suffix;
  return row[key] ?? '';
}

/**
 * @description 将idnameArr to idNameObj
 */
export function idNameArr2Obj(arr: NameWithId[]) {
  return arr.reduce(
    (res, item) => (Reflect.set(res, item.id, item.name), res),
    {} as Record<number, string>
  );
}

/**
 * @description 数组repeat
 */
export function headRepeat(arr: CxTableDynamicColumn[], repeat?: number) {
  if (!repeat) return [] as CxTableDynamicColumn[];
  let res: CxTableDynamicColumn[] = [];
  for (let index = 0; index < repeat; index++) {
    res = [
      ...res,
      ...arr.map(item => {
        // if (repeat === 1) return item;
        return {
          ...item,
          label: `${item.label}${repeat === 1 ? '' : index + 1}`,
          prop: `${item.prop}_${index}`
        };
      })
    ];
  }
  return res;
}

/**
 * @description 阿拉伯数字转大写
 */
export function ToChineseNum(n: number | string) {
  n = String(n);
  if (!/^(0|[1-9]\d*)(\.\d+)?$/.test(n)) {
    return '数据非法'; //判断数据是否大于0
  }

  let unit = '千百拾亿千百拾万千百拾元角分',
    str = '';
  n += '00';

  const indexpoint = n.indexOf('.'); // 如果是小数，截取小数点前面的位数

  if (indexpoint >= 0) {
    n = n.substring(0, indexpoint) + n.substr(indexpoint + 1, 2); // 若为小数，截取需要使用的unit单位
  }

  unit = unit.substr(unit.length - n.length); // 若为整数，截取需要使用的unit单位
  for (let i = 0; i < n.length; i++) {
    str += '零壹贰叁肆伍陆柒捌玖'.charAt(+n.charAt(i)) + unit.charAt(i); //遍历转化为大写的数字
  }

  return str
    .replace(/零(千|百|拾|角)/g, '零')
    .replace(/(零)+/g, '零')
    .replace(/零(万|亿|元)/g, '$1')
    .replace(/(亿)万|壹(拾)/g, '$1$2')
    .replace(/^元零?|零分/g, '')
    .replace(/元$/g, '元整'); // 替换掉数字里面的零字符，得到结果
}

export const isDeepObjectEqual = (obj1: AnyObject, obj2: AnyObject): boolean => {
  //1.如果是比较对象===，返回true
  if (obj1 === obj2) return true;

  //2.如果比较的是两个方法，转成字符串比较
  if (typeof obj1 === 'function' && typeof obj2 === 'function')
    return obj1.toString() === obj2.toString();

  //3如果obj1和obj2都是Date实例，获取毫秒值比较
  if (obj1 instanceof Date && obj2 instanceof Date) return obj1.getTime() === obj2.getTime();

  //4如果比较是两个类型不一致,无须比较直接返回false
  if (
    Object.prototype.toString.call(obj1) !== Object.prototype.toString.call(obj2) ||
    typeof obj1 !== 'object'
  )
    return false;

  //5.获取对象所有自身属性的属性名（包括不可枚举属性但不包括Symbol值作为名称的属性
  const obj1Props = Object.getOwnPropertyNames(obj1);
  const obj2Props = Object.getOwnPropertyNames(obj2);

  //自身属性长度相等,
  if (obj1Props.length !== obj2Props.length) return false;

  //递归调用判断每一个属性值是否相等
  return obj1Props.every(prop => isDeepObjectEqual(obj1[prop], obj2[prop]));
};
