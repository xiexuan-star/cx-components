import { isFunction, isNumber, isObject, sessionStore } from 'chx-utils';
import { debounce } from 'lodash-es';
import * as R from 'ramda';
import { nextTick, ref, watch } from 'vue';
import {
  CX_TABLE_CACHE_PENDING, CX_TABLE_DYNAMIC_CACHE, CX_TABLE_DYNAMIC_PROPS, CX_TABLE_THROTTLE_DURATION
} from '../constant';
import { CxTableDynamicColumn, CxTableItem, CxTablePropType, DYNAMIC_CONFIG } from '../types';
import { CxConfigAdaptor, cxTableWarn } from '../utils';
import { useCxTable } from './useCxTable';

const cacheMap: Record<string, Func<any>[]> = {};

const resolveColumns = (cols: CxTableItem[], props: CxTablePropType) => {
  const context = useCxTable().getContext();

  return [...context.dynamicInject, props.dynamicInject].reduce((res, inject) => {
    return isFunction(inject) ? inject(res) : res;
  }, cols);
};

export const getCxDynamicHead = async (dynamic: DYNAMIC_CONFIG) => {
  const url = '/header/dynamic';

  return new Promise<SResponse<any>>((resolve, reject) => {
    const key = JSON.stringify(dynamic);
    const data = sessionStore.get(key, CX_TABLE_DYNAMIC_CACHE);
    if (data === CX_TABLE_CACHE_PENDING) {
      new Promise<SResponse<any>>(innerResolve => {
        !cacheMap[key] && Reflect.set(cacheMap, key, []);
        cacheMap[key].push(innerResolve);
      })
        .then(resolve)
        .catch(reject);
    } else if (data) {
      resolve({ data, state: 200, message: '' });
    } else {
      sessionStore.set(
        key,
        CX_TABLE_CACHE_PENDING,
        CX_TABLE_THROTTLE_DURATION,
        CX_TABLE_DYNAMIC_CACHE
      );

      const invalidIndex = CX_TABLE_DYNAMIC_PROPS.findIndex(key => {
        if (!isNumber(Reflect.get(dynamic!, key))) {
          cxTableWarn(`dynamic参数传递错误:${ key } is not a number`);
          return true;
        }
      });
      if (invalidIndex >= 0) {
        return reject();
      }

      useCxTable()
        ?.getContext()
        ?.dynamicRequestInstance.get(url, { ...dynamic, random: Math.random() })
        .then(resolve)
        .catch(reject);
    }
  });
};

export const useDynamicConfig = (props: CxTablePropType, emit: Func<any>) => {
  const columnProxy = ref<CxTableItem[]>([]);
  const dynamicColumn = ref<CxTableDynamicColumn[]>([]);
  const loading = ref(false);

  const forceUpdate = debounce((isDynamicChange = false) => {
    if (isObject(props.dynamic)) {
      loading.value = true;
      const key = JSON.stringify(props.dynamic);
      getCxDynamicHead(props.dynamic)
        .then(async ({ data }) => {
          if (Array.isArray(data)) {
            sessionStore.set(key, data, CX_TABLE_THROTTLE_DURATION, CX_TABLE_DYNAMIC_CACHE);
            if (Array.isArray(cacheMap[key])) {
              const duplicate = R.clone(data);
              cacheMap[key].forEach(resolve => {
                resolve({ data: duplicate, state: 200, message: '' });
              });
              Reflect.deleteProperty(cacheMap, key);
            }
            data = data.map(CxConfigAdaptor.of);
            dynamicColumn.value = R.clone(data);
            data = resolveColumns(data, props);
            columnProxy.value = data;
          }
          await nextTick();
          isDynamicChange && emit('dynamicUpdate');
        })
        .finally(() => {
          loading.value = false;
          const data = sessionStore.get(key, CX_TABLE_DYNAMIC_CACHE);
          if (data === CX_TABLE_CACHE_PENDING) {
            sessionStore.remove(key, CX_TABLE_DYNAMIC_CACHE);
          }
          if (Array.isArray(cacheMap[key])) {
            cacheMap[key].forEach(resolve => {
              resolve({ data: R.clone(data), state: 200, message: '' });
            });
          }
          Reflect.deleteProperty(cacheMap, key);
        });
    } else {
      columnProxy.value = resolveColumns(R.clone(props.tableConfig.items), props);
    }
  }, 300);

  if (isObject(props.dynamic)) {
    watch(() => props.dynamic, R.converge(forceUpdate, [R.T]), { deep: true, immediate: true });
  } else {
    watch(() => props.tableConfig.items, R.converge(forceUpdate, [R.F]), {
      deep: true,
      immediate: true
    });
  }
  return { columnProxy, loading, forceUpdate, dynamicColumn };
};
