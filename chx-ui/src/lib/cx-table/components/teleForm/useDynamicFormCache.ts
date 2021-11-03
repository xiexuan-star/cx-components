import { CxTablePropType, DYNAMIC_CONFIG } from '../../types';
import { cxTableWarn } from '../../utils';
import { DynamicFormCacheModule, DynamicFormVisibleCacheModule } from './constant';
import { useCxTable } from '../../hooks';
import { localStore } from '../../../../utils/storage';
import { IO } from '../../../../utils';

export const useDynamicFormCache = (rootProps: CxTablePropType) => {
  const getCacheKey = (dynamic?: DYNAMIC_CONFIG) => {
    return !dynamic
      ? ''
      : `u_${useCxTable().getContext().contextScopeId}_m1_${dynamic.moduleType}_b_${
          dynamic.businessType
        }_m2_${dynamic.modelType}_p_${dynamic.priceType}`;
  };

  const getCache = (module: string = DynamicFormCacheModule) => {
    return () => localStore.get(getCacheKey(rootProps.dynamic), module);
  };

  const getFormCacheIO = IO.of(getCache());

  const getVisibleCacheIO = IO.of(getCache(DynamicFormVisibleCacheModule));

  const setCache = (module = DynamicFormCacheModule) => {
    return (val: any) => {
      try {
        localStore.set(getCacheKey(rootProps.dynamic), val, void 0, module);
      } catch {
        cxTableWarn(`can't set dynamic form cache from dynamicConfig:`, rootProps.dynamic);
      }
    };
  };

  const setFormCacheIO = IO.of(setCache());

  const setVisibleCacheIO = IO.of(setCache(DynamicFormVisibleCacheModule));

  return { getFormCacheIO, getVisibleCacheIO, setFormCacheIO, setVisibleCacheIO };
};
