export interface CxStoreResultItem {
    time: number;
    val: any;
    expire: number;
}
export interface CxStoreResult {
    [prop: string]: CxStoreResultItem;
}
export interface CxStoreOnSetPayload {
    key: string;
    val: any;
    module: string;
    expire: number;
}
export interface CxStoreOnSet {
    (payload: CxStoreOnSetPayload): CxStoreOnSetPayload;
}
export interface CxStoreOnGet {
    (payload?: any): any;
}
export interface CxStorePlugin {
    onSet?: CxStoreOnSet;
    onGet?: CxStoreOnGet;
}
export declare abstract class CxLocalStoreType {
    abstract get(key: string, module: string): any | undefined;
    abstract set(key: string, val: any, expire: number, module: string): boolean;
    abstract remove(key: string, module: string): boolean;
}
export interface AnyObject {
    [k: string]: any;
}
export interface Func<T = any> {
    (...args: any[]): T;
}
