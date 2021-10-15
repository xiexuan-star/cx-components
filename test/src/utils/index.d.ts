export * from './utils';

interface AmountParams {
  val: string;
  min?: number;
  max?: number;
  maxLen?: number;
  decimal?: number;
}

export function removeIndexFromArr(arr: Array<any>, indexArr: Array<number>): void;

export function amount(arg: AmountParams): string | number;
/**
 *
 * @param cFormat 默认值: YYYY-MM-DD HH:mm'
 * @param defaultValue 默认值: '--'
 */
export function parseTime(
  time: Date | string | number,
  cFormat?: string,
  defaultValue?: string
): string;
export function parseDate(time: Date | string | number): string;
export function formatTime(time: number, option: string): string;

export function getQueryObject(url: string): Record<string, string>;
export function param(json: Record<string, string | number | boolean>): string;
export function param2Obj(url: string): Record<string, any>;

export function byteLength(str: string): number;

export function cleanArray(actual: any[]): any[];

export function html2Text(val: string): string;

export function objectMerge(
  target: Record<string, unknown>,
  source: Record<string, unknown>
): Record<string, unknown>;

export function toggleClass(element: HTMLElement, className: string): void;

export function getTime(type: string): Date;

export function debounce(
  func: (...arg: any[]) => void,
  wait: number,
  immediate: boolean
): (...arg: any[]) => void;

export function deepClone<T extends Record<string, any> = Record<string, any>>(source: T): T;
export function copyObj<T extends Record<string, any> = Record<string, any>>(
  obj: T,
  replacer?: Array<number | string> | null
): T;

export function uniqueArr(arr: any[]): any[];

export function hasClass(ele: HTMLElement, cls: string): boolean;
export function addClass(ele: HTMLElement, cls: string): void;
export function removeClass(ele: HTMLElement, cls: string): void;

export function compareNum(num: number, min: number, max: number, bool?: boolean): boolean;

export function decimals(num: number, fixed?: number): number;

export function parseJSON(text: string): Record<string, unknown> | string;

export function formatBarcode(str: string): string;

export function assignToObj(
  target: Record<string, unknown>,
  obj: Record<string, unknown>,
  options?: { arr: string[]; keyObj?: string[] }
): Record<string, unknown>;

export function numSeparator(num: number | string, fixed?: number): string | 0;

export function drawForm(
  form: Record<string, unknown>,
  arr: string[],
  flag?: boolean
): Record<string, unknown>;

export function idToText<T = any>(
  arr: T[],
  searchId: string | number,
  keys?: { id: string; name: string }
): any;

export function formatRow(row: Record<string, unknown>): Record<string, unknown>;

export function isPc(): boolean;

/**
 * 空函数
 */
export function none(...args: any[]): void;

export function async<T = any>(
  promise: Promise<T>
): Promise<[null | (Error & { state?: number }), T]>;

export function throttle<T extends (...arg: any[]) => void>(func: T, delay: number): typeof none;
export function asyncLockFun<T extends (...args: any) => any>(
  func: T
): (...args: Parameters<T>) => Promise<void>;
