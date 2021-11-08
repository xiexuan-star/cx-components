import {
  CxControlRenderer,
  CxInjectHeadFun,
  CxRendererRegister,
  CxTableExpose,
  CxTablePlugins,
  CxTablePropType,
  DYNAMIC_CONFIG
} from '../types';
import { useCopy } from './useCopy';
import { ref } from 'vue';
import { isFunction, isObject } from 'chx-utils';

export const CxTableRendererMap = new Map<string, CxControlRenderer>();
export const CxTableActiveControl = new Set<string>();

export type DynamicKeys = Partial<Pick<DYNAMIC_CONFIG, 'businessType' | 'modelType' | 'priceType'>>;

export type Rule = DynamicKeys & { api: string; requestInstance?: any };

export type RuleList = Record<any, Rule[]>;

export type DYNAMIC_KEY = Record<'DYNAMIC_MODULE_TYPE' | 'DYNAMIC_BUSINESS_TYPE' | 'DYNAMIC_MODEL_TYPE' | 'DYNAMIC_PRICE_TYPE',
  Record<string, number | string>>;

type labelProp = { label?: string; prop: string; defaultValue?: string } & {
  [P in `label_1` | `label_0` | `label_2`]?: string;
};
export type CacheRule = Partial<DYNAMIC_CONFIG> & {
  config: { listTitle: labelProp; tableInfo: labelProp[] };
};

export type CacheContext = Partial<{
  requestApiMap: Record<number, string>;
  cacheTypeTab: (props: CxTablePropType) => boolean;
  removeApiMap: Record<number, string>;
  requestInstance: Record<string | number, any>;
  cacheLabelConfig: CacheRule[];
}>;

type messageInstance = {
  success: (msg: string) => void;
  warning: (msg: string) => void;
  info: (msg: string) => void;
  error: (msg: string) => void;
};

const createCxTableContext = () => {
  return {
    contextScopeId: 'defaultScope' as number | string,
    messageInstance: {
      success: () => undefined,
      warning: () => undefined,
      info: () => undefined,
      error: () => undefined
    } as messageInstance,
    dynamicRequestInstance: null as null | any,
    dynamicInject: new Set<CxInjectHeadFun>(),
    dynamicFormContext: { requestApiMap: {} } as { requestApiMap: RuleList },
    dynamicCacheContext: {
      requestApiMap: {},
      removeApiMap: {},
      cacheTypeTab: () => false,
      requestInstance: {},
      cacheLabelConfig: []
    } as CacheContext,
    dynamicType: {
      DYNAMIC_MODULE_TYPE: {},
      DYNAMIC_BUSINESS_TYPE: {},
      DYNAMIC_MODEL_TYPE: {},
      DYNAMIC_PRICE_TYPE: {}
    } as DYNAMIC_KEY,
    precision: {} as Record<string, number>
  };
};

const context = createCxTableContext();
const readOnlyContext = new Proxy(context, {
  get(target, key) {
    return target[key as keyof typeof context];
  },
  set() {
    return false;
  }
});

export const useCxTable = () => {
  const getContext = () => readOnlyContext;

  const instance = ref<Partial<CxTableExpose>>({});

  const instanceProps = ref<Partial<CxTablePropType>>({});

  const copyHandler = ref<Partial<ReturnType<typeof useCopy>>>({});

  const registCxTable = (payload: { registerTarget: CxTableExpose; props: CxTablePropType }) => {
    instance.value = payload.registerTarget;
    instanceProps.value = payload.props;
    copyHandler.value = useCopy(payload.props);
    return cxTableManager;
  };

  const registCxRenderer = (params: { type: string; payload?: CxRendererRegister }) => {
    let render: CxControlRenderer | null = null;
    if (isFunction(params.payload)) {
      render = params.payload;
    } else if (params.payload) {
      render = params.payload.render;
      params.payload.active && CxTableActiveControl.add(params.type);
    }
    render && CxTableRendererMap.set(params.type, render);
    return cxTableManager;
  };

  const setCxTableScopeId = (id: number | string) => {
    context.contextScopeId = id;
    return cxTableManager;
  };

  const setMessageInstance = (instance: messageInstance) => {
    context.messageInstance = instance;
    return cxTableManager;
  };

  const setDynamicFormSearchApi = (moduleType: any, rules: Rule[]) => {
    context.dynamicFormContext.requestApiMap[moduleType] = rules;
    return cxTableManager;
  };

  const setDynamicCacheContext = <T extends keyof CacheContext>(key: T, val: CacheContext[T]) => {
    context.dynamicCacheContext[key] = val;
    return cxTableManager;
  };

  const setDynamicRequestInstance = (instance: any) => {
    context.dynamicRequestInstance = instance;
    return cxTableManager;
  };

  const setDynamicType = (types: Record<string, Record<string, number | string>>) => {
    (Object.keys(context.dynamicType) as (keyof DYNAMIC_KEY)[]).forEach(dynamicKey => {
      if (isObject(types[dynamicKey])) {
        context.dynamicType[dynamicKey] = types[dynamicKey];
      }
    });
    return cxTableManager;
  };

  const setPrecision = (precision: Record<string, number>) => {
    Object.assign(context.precision, precision);
    return cxTableManager;
  };

  const use = (plugin: CxTablePlugins) => {
    if (isFunction(plugin.dynamicInject)) {
      context.dynamicInject.add(plugin.dynamicInject);
    }
    return cxTableManager;
  };

  const cxTableManager = {
    registCxTable,
    setPrecision,
    setCxTableScopeId,
    setMessageInstance,
    setDynamicType,
    setDynamicFormSearchApi,
    setDynamicRequestInstance,
    setDynamicCacheContext,
    getContext,
    use,
    instance,
    registCxRenderer,
    copyHandler: copyHandler
  };

  return cxTableManager;
};
