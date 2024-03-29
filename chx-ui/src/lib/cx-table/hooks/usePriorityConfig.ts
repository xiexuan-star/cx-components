import { isObject } from 'chx-utils';
import { debounce } from 'lodash-es';
import { CxTableBaseObj, CxTableItem } from '../types';
import { deepMerge } from '../utils';

export const usePriorityConfig = ({ priorityColumnMap }: CxTableBaseObj) => {
  const onSetConfig: Func<any>[] = [];

  const flushDone = debounce(() => {
    onSetConfig.forEach(cb => cb());
  }, 0);

  const setConfig = (
    prop: string,
    config: Partial<Omit<CxTableItem, 'control'> & { control: Partial<CxTableItem['control']> }>
  ) => {
    if (!config || !isObject(config)) throw new TypeError('config must be a object');
    const old = priorityColumnMap.get(prop) ?? {};
    deepMerge(old, config);
    priorityColumnMap.set(prop, old);
    flushDone();
  };

  const clearConfig = () => {
    priorityColumnMap.clear();
  };

  const removeConfig = (prop: string) => {
    priorityColumnMap.delete(prop);
  };

  return { setConfig, removeConfig, clearConfig, onSetConfig };
};
