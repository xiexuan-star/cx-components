import { AnyObject,Func,NameWithId } from './types';

const toString = Object.prototype.toString;

export function is(val: unknown, type: string) {
  return toString.call(val) === `[object ${ type }]`;
}

export function isEmpty(value: any) {
  return (
    value === undefined ||
    value === null ||
    (typeof value === 'string' && value.trim() === '') ||
    (typeof value === 'object' && Object.keys(value).length === 0)
  );
}

export function isAbsolutePath(path: string) {
  return /^(https?|tel|mailto)/.test(path);
}

export const isDef = <T = unknown>(val?: T): val is T => {
  return typeof val !== 'undefined';
};

export const isUnDef = <T = unknown>(val?: T): val is T => {
  return !isDef(val);
};

export const isObject = (val: any): val is Record<any, any> => {
  return val !== null && is(val, 'Object');
};

export function isDate(val: unknown): val is Date {
  return is(val, 'Date');
}

export function isNull(val: unknown): val is null {
  return val === null;
}

export function isNullAndUnDef(val: unknown): val is null | undefined {
  return isUnDef(val) && isNull(val);
}

export function isNumber(val: unknown): val is number {
  return is(val, 'Number');
}

export function isPromise<T = any>(val: unknown): val is Promise<T> {
  return is(val, 'Promise') && isObject(val) && isFunction(val.then) && isFunction(val.catch);
}

export function isString(val: unknown): val is string {
  return is(val, 'String');
}

// eslint-disable-next-line @typescript-eslint/ban-types
export const isFunction = (val: unknown): val is Function => typeof val === 'function';

export function isBoolean(val: unknown): val is boolean {
  return is(val, 'Boolean');
}

export function isRegExp(val: unknown): val is RegExp {
  return is(val, 'RegExp');
}

export function isArray(val: any): val is Array<any> {
  return val && Array.isArray(val);
}

export const isWindow = (val: any): val is Window => {
  return typeof window !== 'undefined' && is(val, 'Window');
};

export const isElement = (val: unknown): val is Element => {
  return isObject(val) && !!val.tagName;
};

export const isServer = typeof window === 'undefined';

export const isClient = typeof window !== 'undefined';

export function isImageDom(o: Element) {
  return o && ['IMAGE', 'IMG'].includes(o.tagName);
}

export const isTextarea = (element: Element | null): element is HTMLTextAreaElement => {
  return element !== null && element.tagName.toLowerCase() === 'textarea';
};

export const isMobile = (): boolean => {
  return !!navigator.userAgent.match(
    /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
  );
};

export const isUrl = (path: string): boolean => {
  // eslint-disable-next-line
  const reg = /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/;
  return reg.test(path);
};

export function isHTMLElement(node?: Node | EventTarget | null): node is HTMLElement {
  return !!node && Reflect.get(node, 'nodeType') === Node.ELEMENT_NODE;
}

export function isHTMLInputElement(el?: Node | null): el is HTMLInputElement {
  return isHTMLElement(el) && el.tagName === 'INPUT';
}

export function isAnyObject(data: unknown): data is AnyObject {
  return Object.prototype.toString.call(data) === '[object Object]';
}

export function isErrorLike(err: unknown): err is Error {
  return typeof err === 'object' && !!err && Reflect.has(err, 'message');
}

export function isNameWithId(obj: AnyObject): obj is NameWithId {
  return Reflect.has(obj, 'id') && Reflect.has(obj, 'name');
}

export function isSame(reg: RegExp, str: string) {
  if (str.indexOf('.') === -1) {
    return false;
  }
  const res = str.match(reg);

  if (Array.isArray(res) && res[0] === str) {
    return true;
  }
  return false;
}
