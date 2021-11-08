import { isFunction } from 'chx-utils';
import { CxBroadcastPayload } from '../types/index';

export class CxBroadcast {
  deps = new Map<string, WeakMap<AnyObject, ((payload: CxBroadcastPayload) => void)[]>>();
  entireDep = [] as ((payload: CxBroadcastPayload) => void)[];

  trigger(key: string, rowData: AnyObject, payload: CxBroadcastPayload) {
    const dep = this.getDep(key, rowData);
    // 发送局部广播
    dep.forEach(cb => isFunction(cb) && cb(payload));
    // 发送全局广播
    this.entireDep.forEach(cb => isFunction(cb) && cb(payload));
  }
  registEntireListener(cb: (payload: CxBroadcastPayload) => void) {
    !this.entireDep.includes(cb) && this.entireDep.push(cb);
  }
  registListener(key: string, rowData: AnyObject, cb: (payload: CxBroadcastPayload) => void) {
    const dep = this.getDep(key, rowData);
    !dep.includes(cb) && dep.push(cb);
  }
  getDep(key: string, rowData: AnyObject) {
    let result = [] as any[];

    let rowsDep = this.deps.get(key);

    if (!rowsDep) {
      rowsDep = new WeakMap();
      rowsDep.set(rowData, result);
      this.deps.set(key, rowsDep);
    } else {
      const deps = rowsDep.get(rowData);
      if (deps) {
        result = deps;
      } else {
        rowsDep.set(rowData, result);
      }
    }
    return result;
  }
}
export const useBroadcast = () => {
  return {
    broadcast: new CxBroadcast()
  };
};
