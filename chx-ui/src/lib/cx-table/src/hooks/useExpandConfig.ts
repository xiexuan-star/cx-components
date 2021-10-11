import { reactive } from '@vue/reactivity';

export const useExpandConfig = () => {
  const expandConfig = reactive<boolean[]>([]);

  const clearExpand = () => {
    expandConfig.splice(0);
  };

  const setExpand = (index: number, val: boolean) => {
    Reflect.set(expandConfig, index, val);
  };

  return { expandConfig, clearExpand, setExpand };
};
