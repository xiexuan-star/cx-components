import { AnyObject, Func } from "../statistic/types";
export declare const cloneDeep: <T = any>(data: T) => T;
export declare const isFunction: (val: unknown) => val is Function;
export declare const isObject: (val: any) => val is Record<any, any>;
export declare const getStoreKey: (key: string) => string;
export declare const getStoreResult: (val: any, hooks: Array<Func<any>>) => any;
export declare const JSONInvoker: (target: AnyObject | Array<any>) => AnyObject;
