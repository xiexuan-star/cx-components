import { Ref } from 'vue';
export * from './is';
export * from './resizeEvent';
export declare function omit<T extends AnyObject, K extends keyof T>(target: T, keys: K[]): Omit<T, K>;
export declare function useEnumOptions<T>(obj: AnyObject, name?: string, id?: string): T[];
export declare function throttle<T extends Func<any>>(func: T, wait?: number, options?: {
    leading?: boolean;
    trailing?: boolean;
}): (this: any, ...innerArgs: FunctionParams<T>) => any;
/**
 * 为函数添加状态改变
 */
export declare function useLoading<T extends (...args: any[]) => Promise<any>>(fn: T, argLoading?: Ref<boolean>): [(...args: Parameters<T>) => ReturnType<T>, Ref<boolean>];
export declare const isDeepObjectEqual: (obj1: AnyObject, obj2: AnyObject) => boolean;
