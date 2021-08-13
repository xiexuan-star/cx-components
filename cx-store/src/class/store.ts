import { DEFAULT_EXPIRE, GLOBAL_STORAGE } from '../statistic/const';
import { CxLocalStoreType, CxStorePlugin, CxStoreResult, Func } from '../statistic/types';
import { getStoreKey, getStoreResult, isFunction, isObject } from '../utils';

export default class CxLocalStore implements CxLocalStoreType {
  private instance: Storage;
  private onSet: Array<Func<any>> = [];
  private onGet: Array<Func<any>> = [];
  constructor(type: 'session' | 'local') {
    if (!['session', 'local'].includes(type)) {
      throw new TypeError(`can't init store with type: ${type}`);
    }
    this.instance = type === 'session' ? sessionStorage : localStorage;
  }
  /**
   * @description 在对应的storage中设置一条数据
   * @param key 数据key值
   * @param val 数据value值
   * @param expire 数据过期时间,单位秒
   * @param module 模块名,默认为global
   * @returns 返回true说明设置成功,false则设置失败
   */
  set(key: string, val: any, expire = DEFAULT_EXPIRE, module = GLOBAL_STORAGE) {
    const v = getStoreResult(val, this.onSet);
    try {
      const moduleStore = this.getModule(module);
      Reflect.set(moduleStore, key, {
        expire: expire * 1000,
        val: v,
        time: Date.now()
      });
      this.instance.setItem(getStoreKey(module), JSON.stringify(moduleStore));
      return true;
    } catch {
      console.error(`failed to set storage: { key:${key},val:${val} }`);
      return false;
    }
  }
  /**
   * @description 取出对应storage中的一条数据
   * @param key 数据key
   * @param module 模块名
   * @returns 数据value
   */
  get<T = any>(key: string, module = GLOBAL_STORAGE): T | void {
    const moduleStore = this.getModule(module);
    try {
      const result = Reflect.get(moduleStore, key);
      if (!result) return;
      const { time, expire, val } = result;
      if (+time + +expire <= Date.now()) {
        this.remove(key, module);
        return;
      }
      return getStoreResult(val, this.onGet);
    } catch {
      console.error(`failed to getItem with key : ${key}`);
      return;
    }
  }
  /**
   * @description 删去对应storage中的一条数据
   * @param key
   * @param module
   * @returns 删除是否成功
   */
  remove(key: string, module = GLOBAL_STORAGE) {
    try {
      const moduleStore = this.getModule(module);
      Reflect.deleteProperty(moduleStore, key);
      this.instance.setItem(getStoreKey(module), JSON.stringify(moduleStore));
      return true;
    } catch {
      return false;
    }
  }
  private getModule(module: string) {
    try {
      return JSON.parse(this.instance.getItem(getStoreKey(module)) ?? '{}') as CxStoreResult;
    } catch {
      return {};
    }
  }
  use(plugin: CxStorePlugin) {
    if (!isObject(plugin)) return;
    const { onSet, onGet } = plugin;
    isFunction(onSet) && this.onSet.push(onSet);
    isFunction(onGet) && this.onGet.push(onGet);
  }
}
