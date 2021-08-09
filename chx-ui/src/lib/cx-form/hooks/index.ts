import { Component, Ref } from 'vue'
import { Func } from '../../../types'
import { isObject } from '../../../utils'
import { CxFormError } from '../constructor/error'
import { CxFormAdaptor, CxFormConfig, ElFormExpose } from '../types'

const CxFormRenderMap = new Map<string, { comp?: Component | null | Func<Component>; adaptor?: CxFormAdaptor | null }>()

export const useCxForm = () => {
  let _instance: Ref<ElFormExpose | null> | undefined
  let _config: CxFormConfig | undefined
  // let _cache: CxFormCache | undefined;

  const register = (payload: {
    props?: CxFormConfig
    ref?: Ref<ElFormExpose | null>
    // cache?: CxFormCache;
  }) => {
    const { props: config, ref } = payload
    _instance = ref
    _config = config
    // _cache = cache;
  }

  const getFormRef = () => {
    return _instance
  }

  const setFormConfig = (prop: string, attr: string, val: any) => {
    if (!_config) throw new CxFormError("can't set property before regist")

    const item = _config?.items.find((item) => item.prop === prop)
    if (!item) {
      return console.warn(`[cxForm warn]: prop ${prop} isn't exist on this form's configList `)
    }

    if (Reflect.has(item, attr)) return Reflect.set(item, attr, val)
    ;[...CxFormRenderMap.keys()].find((type) => {
      const typeAttrs = Reflect.get(item, type)
      if (!isObject(typeAttrs)) return
      if (attr === 'options') {
        if (!Array.isArray(val)) throw new CxFormError("can't set options with non-array")
        const options = Reflect.get(typeAttrs, 'options')
        Array.isArray(options) ? (options.splice(0), options.push(...val)) : Reflect.set(typeAttrs, 'options', val)
      } else {
        Reflect.set(typeAttrs, attr, val)
      }
      return true
    })
  }

  // const validCache = () => {
  //   if (!_cache) throw new CxFormError("can't use cache before regist");
  // };

  return {
    register,
    getFormRef,
    setFormConfig,
    // getCache: () => {
    //   validCache();
    //   _cache?.getCache();
    // },
    // removeCache: () => {
    //   validCache();
    //   _cache?.removeCache();
    // },
    // setCache: (dataSource?: any) => {
    //   validCache();
    //   _cache?.setCache(dataSource);
    // },
    /**
     * @description 注册组件
     * @param params {comp:组件,type:组件名,configAdaptor:组件配置项适配器,默认直接合并}
     */
    registerRenderer: (params: {
      comp?: Component | null | Func<Component>
      type: string
      adaptor?: CxFormAdaptor | null
    }) => {
      const { comp, type, adaptor } = params
      CxFormRenderMap.set(type, { comp, adaptor })
    },
    getRenderer: (key: string) => {
      return CxFormRenderMap.get(key)
    },
    getRendererKeys: () => {
      return CxFormRenderMap.keys()
    },
  }
}