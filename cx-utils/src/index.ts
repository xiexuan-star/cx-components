import { isObject } from './is';
import { computed, ref, Ref, WritableComputedRef } from 'vue';
import * as R from 'ramda';
import { AnyObject, Func, FunctionParams } from './types';

export * from './is';
export * from './functor';
export * from './resizeEvent';
export * from './date';
export * from './state';
export * from './store';
export * from './events';
export * from './eventBus';

export const headUppercase = (s: string) => {
  return s[0].toUpperCase() + s.slice(1);
};

export const arrInsert = <T = any>(target: T[], position: number, ...args: Array<T | T[]>) => {
  return target
    .slice(0, position)
    .concat(flatten(args) as T[])
    .concat(target.slice(position, Infinity));
};

export const flatten = <T>(arr: T) => {
  if (!Array.isArray(arr)) return [arr];
  if (arr.length === 0) return arr;
  const result: T[] = [];
  const stack = [arr];
  let currentItem;
  while ((currentItem = stack.shift())) {
    Array.isArray(currentItem) ? stack.push(...currentItem) : result.push(currentItem);
  }
  return result;
};

export const copyInnerText = (ele: HTMLElement) => {
  const range = document.createRange();
  range.selectNodeContents(ele);
  const selection = window.getSelection();
  selection?.removeAllRanges();
  selection?.addRange(range);
  document.execCommand('copy');
  return ele;
};

export function omit<T extends AnyObject, K extends keyof T>(target: T, keys: K[]) {
  if (!isObject(target)) return target;
  return (Object.keys(target) as K[]).reduce((res, key) => {
    if (!keys.includes(key)) {
      Reflect.set(res, key, target[key]);
    }
    return res;
  }, {} as Omit<T, K>);
}

export function enum2Options<T>(obj: AnyObject, name = 'name', id = 'id'): T[] {
  const result: T[] = [];

  Object.entries(obj).forEach(([key, val]) => {
    if (R.is(Number, val)) {
      result.push({ [name]: key, [id]: val } as unknown as T);
    }
  });

  return result;
}

export function throttle<T extends Func<any>>(
  func: T,
  wait = 100,
  options?: { leading?: boolean; trailing?: boolean }
) {
  let timeout: any, context: any, args: any, result: any;
  let previous = 0;
  if (!options) options = {};

  function later() {
    previous = options?.leading === false ? 0 : Date.now();
    timeout = null;
    result = func.apply(context, args);
    if (!timeout) context = args = null; // 显式地释放内存，防止内存泄漏
  }

  function throttled(this: any, ...innerArgs: FunctionParams<T>) {
    var now = Date.now();
    if (!previous && options?.leading === false) previous = now;
    var remaining = wait - (now - previous);
    context = this;
    args = innerArgs;
    if (remaining <= 0 || remaining > wait) {
      if (timeout) {
        clearTimeout(timeout);
        timeout = null;
      }
      previous = now;
      result = func.apply(context, innerArgs);
      if (!timeout) context = args = null;
    } else if (!timeout && options?.trailing !== false) {
      timeout = setTimeout(later, remaining);
    }
    return result;
  }

  return throttled;
}

/**
 * 为函数添加状态改变
 */
export function loadingDecorator<T extends (...args: any[]) => Promise<any>>(
  fn: T,
  argLoading?: Ref<boolean>
) {
  const loading = ref(false);
  if (argLoading) argLoading.value = false;

  async function call(...args: Parameters<T>) {
    if (loading.value) {
      return Promise.reject('loading...');
    }

    loading.value = true;
    if (argLoading) argLoading.value = true;

    let result = null;
    try {
      result = await fn(...args);
    } catch (e) {
      result = Promise.reject(e);
    }

    if (argLoading) argLoading.value = false;
    loading.value = false;

    return result;
  }

  return [call, loading] as [(...args: Parameters<T>) => ReturnType<T>, Ref<boolean>];
}

export const isDeepObjectEqual = (obj1: AnyObject, obj2: AnyObject): boolean => {
  //1.如果是比较对象===，返回true
  if (obj1 === obj2) return true;

  //2.如果比较的是两个方法，转成字符串比较
  if (typeof obj1 === 'function' && typeof obj2 === 'function') {
    return obj1.toString() === obj2.toString();
  }

  //3如果obj1和obj2都是Date实例，获取毫秒值比较
  if (obj1 instanceof Date && obj2 instanceof Date) return obj1.getTime() === obj2.getTime();

  //4如果比较是两个类型不一致,无须比较直接返回false
  if (
    Object.prototype.toString.call(obj1) !== Object.prototype.toString.call(obj2) ||
    typeof obj1 !== 'object'
  ) {
    return false;
  }

  //5.获取对象所有自身属性的属性名（包括不可枚举属性但不包括Symbol值作为名称的属性
  const obj1Props = Object.getOwnPropertyNames(obj1);
  const obj2Props = Object.getOwnPropertyNames(obj2);

  //自身属性长度相等,
  if (obj1Props.length !== obj2Props.length) return false;

  //递归调用判断每一个属性值是否相等
  return obj1Props.every(prop => isDeepObjectEqual(obj1[prop], obj2[prop]));
};

export function propDecorator<T, K extends Func<any>>(props: T, emit: K, arr: Array<keyof T> = []) {
  if (!arr.length) return [];
  return arr.reduce((p, c) => {
    const option = computed({
      get: () => props[c],
      set: value => emit(`update:${ c }`, value)
    });
    p.push(option);
    return p;
  }, [] as WritableComputedRef<T[keyof T]>[]);
}

/**
 *{
 *    min: number,  最小值
 *    max: number,  最大值
 *    maxLen: number, 最大长度
 *    decimal: number 保留最大小数点位数
 * }
 * @param {Object}
 */
export function amount({
                         val,
                         min,
                         max,
                         maxLen,
                         decimal
                       }: Record<string, number | string>) {
  val = (val + '').trim();
  if (val === '') return '';
  if (min >= 0) val = val.replace(/-/g, '');
  const regStrs = [
    [/[^\-\d.]/g, ''], // 去掉除负号小数点数字以外的字符
    [/\.{2,}/g, '.'], // 去掉两个以上小数点
    [/-{2,}/g, '-'], // 去掉两个以上负号
    [/(?!(\B-))-/g, ''], // 去掉两个以上负号
    [/^\./g, '0.'], // 直接输入小数点默认为0.
    [/(\d+\.\d+)\./, '$1'] // 屏蔽如1.1.1类似的情况
  ] as [RegExp, string][];
  regStrs.forEach(reg => (val = (val as string).replace(reg[0], reg[1])));

  const arr = val.split('.');
  decimal = parseInt(decimal + '') || 0;
  if (arr.length > 1 && arr[1] && decimal && arr[1].length > decimal) {
    arr[1] = arr[1].slice(0, decimal);
  }

  let sign = '';
  maxLen = parseInt(maxLen + '') || 0;
  if (/^-/.test(arr[0])) {
    arr[0] = arr[0].replace(/-/g, '');
    sign = '-';
  }
  if (maxLen && arr[0].length > maxLen) arr[0] = arr[0].slice(0, maxLen);
  if (arr[0]) arr[0] = Number(arr[0].toString()) as any;
  if (sign) arr[0] = sign + arr[0];
  val = arr.join('.');
  if (!decimal && val !== '-') val = Number(val);

  max = parseFloat(max as string);
  min = parseFloat(min as string);
  if (!isNaN(min) && parseFloat(val as string) < min) val = min;
  if (!isNaN(max) && parseFloat(val as string) > max) val = max;

  return val;
}
