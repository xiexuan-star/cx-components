import { AnyObject } from '../types';
export * from './is';
export declare const parseTime: (time: string, format?: string) => string;
export declare function omit<T extends AnyObject, K extends keyof T>(target: T, keys: K[]): Pick<T, Exclude<keyof T, K>>;
