import {
  Ref,
  ref,
  unref,
  UnwrapRef,
  computed,
  WritableComputedOptions,
  WritableComputedRef,
  ComputedRef,
  onBeforeUpdate
} from 'vue';
import { Func } from '../types';

interface GetState<T> {
  (isRef: true): Ref<UnwrapRef<T>>;
  (isRef?: false): UnwrapRef<T>;
}

export function useState<T>(initValue: T): [GetState<T>, (val: UnwrapRef<T>) => UnwrapRef<T>] {
  const state = ref(initValue);
  const getState = ((isRef?: boolean) => (isRef ? state : unref(state))) as GetState<T>;

  return [getState, (val: UnwrapRef<T>) => (state.value = val)];
}

export function useRef<T>() {
  return useState<T | null>(null)[0];
}

/**
 * v-for的ref引用
 */
export function useRefs<T>(): [Set<T>, (el: T) => void] {
  const itemRefs = new Set<T>();
  const setItemRef = (el: T) => el && itemRefs.add(el);
  onBeforeUpdate(() => itemRefs.clear());

  return [itemRefs, setItemRef];
}

/**
 * v-for的ref引用
 * @return 数组
 */
export function useRefsArray<T>(): [T[], (el: T) => void] {
  let itemRefs: T[] = [];
  const setItemRef = (el: T) => {
    itemRefs.push(el);
  };
  onBeforeUpdate(() => {
    itemRefs = [];
  });
  return [itemRefs, setItemRef];
}

// ===============================================================================================

interface GetComputed<T, R> {
  (isRef: true): R;
  (isRef: false): T;
  (): T;
}

type UseComputedArg<T> = WritableComputedOptions<T>['get'] | WritableComputedOptions<T>;

function isWritableComputedOptions<T>(arg: UseComputedArg<T>): arg is WritableComputedOptions<T> {
  return typeof arg === 'object' && Reflect.has(arg || {}, 'set');
}

export function useComputed<T>(
  getter: WritableComputedOptions<T>['get']
): GetComputed<T, ComputedRef<T>>;

export function useComputed<T>(
  options: WritableComputedOptions<T>
): [GetComputed<T, WritableComputedRef<T>>, (val: T) => void];

export function useComputed<T>(arg: UseComputedArg<T>) {
  const data = isWritableComputedOptions(arg) ? computed(arg) : computed(arg);
  const getData = (isRef?: boolean) => (isRef ? data : data.value);

  if (!isWritableComputedOptions(arg)) {
    return getData;
  }

  return [getData, (val: T) => (data.value = val)];
}

// ===================================================================================================
/**
 * 返回{ [key]: Ref }
 * @params obj { [变量名]: useState或useComputed返回的getter函数 }
 */
export function getRefs(obj: Record<string, GetState<any> | GetComputed<any, any>>) {
  const result: Record<string, Ref<any>> = {};
  Object.entries(obj).forEach(([k, fn]) => (result[k] = fn(true)));

  return result;
}

export function useSync<T, K extends Func<any>>(props: T, emit: K, arr: Array<keyof T> = []) {
  if (!arr.length) return [];
  return arr.reduce((p, c) => {
    const option = computed({
      get: () => props[c],
      set: value => emit(`update:${c}`, value)
    });
    p.push(option);
    return p;
  }, [] as WritableComputedRef<T[keyof T]>[]);
}
