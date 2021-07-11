import { CxLocalStoreType, CxStorePlugin } from '../statistic/types';
export default class CxLocalStore implements CxLocalStoreType {
    private instance;
    private onSet;
    private onGet;
    constructor(type: 'session' | 'local');
    /**
     * @description 在对应的storage中设置一条数据
     * @param key 数据key值
     * @param val 数据value值
     * @param expire 数据过期时间,单位秒
     * @param module 模块名,默认为global
     * @returns 返回true说明设置成功,false则设置失败
     */
    set(key: string, val: any, expire?: number, module?: string): boolean;
    /**
     * @description 取出对应storage中的一条数据
     * @param key 数据key
     * @param module 模块名
     * @returns 数据value
     */
    get(key: string, module?: string): any | void;
    /**
     * @description 删去对应storage中的一条数据
     * @param key
     * @param module
     * @returns 删除是否成功
     */
    remove(key: string, module?: string): boolean;
    private getModule;
    use(plugin: CxStorePlugin): void;
}
