const toString = Object.prototype.toString;

export function is(val: unknown, type: string) {
  return toString.call(val) === `[object ${type}]`;
}

export function isEmpty(value: any) {
  return (
    value === undefined ||
    value === null ||
    (typeof value === 'string' && value.trim() === '') ||
    (typeof value === 'object' && Object.keys(value).length === 0)
  );
}

export const isObject = (val: any): val is Record<any, any> => {
  return val !== null && is(val, 'Object');
};

export function isDate(val: unknown): val is Date {
  return is(val, 'Date');
}

export function isNull(val: unknown): val is null {
  return val === null;
}

export function isNumber(val: unknown): val is number {
  return is(val, 'Number');
}

export function isString(val: unknown): val is string {
  return is(val, 'String');
}

// eslint-disable-next-line @typescript-eslint/ban-types
export const isFunction = (val: unknown): val is Function => typeof val === 'function';

export function isBoolean(val: unknown): val is boolean {
  return is(val, 'Boolean');
}

export function isArray(val: any): val is Array<any> {
  return val && Array.isArray(val);
}
