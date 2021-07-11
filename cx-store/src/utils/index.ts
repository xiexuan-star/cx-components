import { AnyObject, Func } from "../statistic/types";

export const cloneDeep = <T = any>(data: T) => {
  return JSON.parse(JSON.stringify(data)) as T;
}

// eslint-disable-next-line @typescript-eslint/ban-types
export const isFunction = (val: unknown): val is Function => typeof val === 'function';

export const isObject = (val: any): val is Record<any, any> => {
  return val !== null && Object.prototype.toString.call(val) === `[object Object]`;
};

export const getStoreKey = (key: string) => {
  return `_${key}_`;
};

export const getStoreResult = (val: any, hooks: Array<Func<any>>) => {
  return hooks.reduce((res, hook) => (isFunction(hook) ? hook(res) : res), val);
};

export const JSONInvoker = (target: AnyObject | Array<any>) => {
  if (!isObject(target) && !Array.isArray(target)) return target;
  Object.entries(target).forEach(([key, val]) => {
    try {
      const parsedVal = JSON.parse(val);
      Reflect.set(target, key, JSONInvoker(parsedVal));
    } catch (err) {
      //;
    }
  });
  return target;
};
