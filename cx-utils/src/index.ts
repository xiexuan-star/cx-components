import { isObject } from './is';
import { ref, Ref } from 'vue';
import * as R from 'ramda';
import { AnyObject, Func, FunctionParams } from './types';

export * from './is';
export * from './functor';
export * from './resizeEvent';
export * from './date';
export * from './state';
export * from './store'

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
