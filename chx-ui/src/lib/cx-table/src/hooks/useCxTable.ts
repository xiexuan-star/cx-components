import {
  CxControlRenderer,
  CxInjectHeadFun,
  CxRendererRegister,
  CxTableExpose,
  CxTablePlugins,
  CxTablePropType,
  DYNAMIC_CONFIG
} from '../types';
import { cxTableWarn, isFunction } from '../utils';
import { useCopy } from './useCopy';
import { ref } from '@vue/reactivity';

export const CxTableRendererMap = new Map<string, CxControlRenderer>();
export const CxTableActiveControl = new Set<string>();

export type DynamicKeys = Partial<Pick<DYNAMIC_CONFIG, 'businessType' | 'modelType' | 'priceType'>>;

export type Rule = DynamicKeys & { api: string; requestInstance?: any };

export type RuleList = Record<any, Rule[]>;

const createCxTableContext = () => {
  return {
    contextScopeId: 'defaultScope' as number | string,
    dynamicInject: new Set<CxInjectHeadFun>(),
    dynamicFormApi: {} as RuleList
  };
};

const context = createCxTableContext();
const readOnlyContext = new Proxy(context, {
  get(target, key) {
    return target[key as keyof typeof context];
  },
  set() {
    cxTableWarn(`context can't be mutated by setter.`)
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
  };

  const setCxTableScopeId = (id: number | string) => {
    context.contextScopeId = id;
  };

  const setDynamicFormSearchApi = (moduleType: any, rules: Rule[]) => {
    context.dynamicFormApi[moduleType] = rules;
  };

  const use = (plugin: CxTablePlugins) => {
    if (isFunction(plugin.dynamicInject)) {
      context.dynamicInject.add(plugin.dynamicInject);
    }
  };

  return {
    registCxTable,
    setCxTableScopeId,
    setDynamicFormSearchApi,
    getContext,
    use,
    instance,
    registCxRenderer,
    copyHandler: copyHandler
  };
};
