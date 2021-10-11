import { AnyObject, Func } from '../types';
export * from './is';
export declare function omit<T extends AnyObject, K extends keyof T>(target: T, keys: K[]): Pick<T, Exclude<keyof T, K>>;
export declare function useEnumOptions<T>(obj: AnyObject, name?: string, id?: string): T[];
export declare function throttle(func: Func<any>, wait?: number, options?: {
    leading?: boolean;
    trailing?: boolean;
}): () => any;
