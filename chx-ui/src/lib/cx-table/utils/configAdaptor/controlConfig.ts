import { calcInnerOptions, getEvalResult, getOptionsDeps, getStringDepends } from './adaptorUtils';
import {
  CxTableDynamicColumn,
  ControlAttrs,
  CxBroadcastRegister
} from '../../types';
import { isFunction, isNumber, isObject } from 'chx-utils';

export class CxControlConfig {
  type: string = '';
  attrs: ControlAttrs = {};

  constructor(config: CxTableDynamicColumn) {
    Reflect.set(this, 'type', config.control?.type ?? '');

    switch (this.type) {
      case 'input':
        this.inputConfigAdaptor(config);
        break;
      case 'inscription':
      case 'search':
      case 'select':
        this.selectConfigAdaptor(config);
        break;
      case 'status':
      case 'tag':
        this.tagConfigAdaptor(config);
        break;
    }
  }

  tagConfigAdaptor(config: CxTableDynamicColumn) {
    const statusMap = Object.entries(config.control?.statusMap ?? {}).reduce((res, [key, val]) => {
      res[key] = { ...val, prop: config.prop };
      return res;
    }, {} as AnyObject);
    Reflect.set(this, 'statusMap', statusMap);
  }

  // 文本输入框配置项
  inputConfigAdaptor(config: CxTableDynamicColumn) {
    const { control, influenced, sideEffect, prop } = config;
    if (!control) return;
    isNumber(control.maxLength) && Reflect.set(this.attrs!, 'maxlength', control.maxLength);
    isNumber(control.minLength) && Reflect.set(this.attrs!, 'minlength', control.minLength);
    control.showWordLimit && Reflect.set(this.attrs!, 'showWordLimit', true);

    influenced &&
    (this.attrs!.broadcastRegister = register => {
      this.influencedRegister(register, config);
    });

    sideEffect &&
    Reflect.set(this.attrs!, 'onChange', (val: string, rowData: AnyObject) => {
      this.sideEffectHandle(prop, rowData, sideEffect);
    });
  }

  // 单选框配置项
  selectConfigAdaptor(config: CxTableDynamicColumn) {
    const { prop, control, influenced, sideEffect } = config;

    if (!control) return;

    let currentOption: (NameWithId & { disabled?: boolean })[] = [];

    if (Array.isArray(control.options)) {
      Reflect.set(this, 'options', (currentOption = control.options));
    } else if (isObject(control.options)) {
      Reflect.set(this, 'options', ({ rowData }: { rowData: AnyObject }) => {
        return (currentOption = calcInnerOptions(control?.options ?? [], rowData));
      });
    } else if (isFunction(control.options)) {
      Reflect.set(this, 'options', (params: { rowData: AnyObject; rowIndex: number; }) =>
        (currentOption = (control.options as Function)(params)))
    }

    // 选项唯一
    if (control.exclusion) {
      const oldValMap = new WeakMap<AnyObject, any>();
      // 将特定逻辑注册至广播接收器
      this.attrs!.broadcastRegister = register => {
        // 删除事件的广播
        register('nativeDelete', params => {
          const option = currentOption.find(item => item.id === params.rowData[prop]);
          option && Reflect.set(option, 'disabled', false);
        });

        // options依赖项发生改变时清空该列数据
        const deps = getOptionsDeps(control?.options ?? []);
        const cb: Parameters<CxBroadcastRegister>[1] = params => {
          Reflect.set(params.rowData, prop, '');
          Reflect.set(params.rowData, prop + 'Text', '');
        };
        deps.forEach(dep => register(dep, cb));

        // 注册influenced
        influenced && this.influencedRegister(register, config);
      };
      Reflect.set(this.attrs!, 'onChange', (val: any, rowData: AnyObject) => {
        const oldVal = oldValMap.get(rowData);
        const oldItem = currentOption.find(item => item.id === oldVal);
        oldItem && Reflect.set(oldItem, 'disabled', false);
        oldValMap.set(rowData, val);

        const currentItem = currentOption.find(item => item.id === val);
        currentItem && Reflect.set(currentItem, 'disabled', true);
        sideEffect && this.sideEffectHandle(prop, rowData, sideEffect);
      });
    } else {
      sideEffect &&
      Reflect.set(this.attrs!, 'onChange', (val: string, rowData: AnyObject) => {
        sideEffect && this.sideEffectHandle(prop, rowData, sideEffect);
      });
    }
  }

  // 将influenced中的项注册至广播接收器
  influencedRegister(register: CxBroadcastRegister, config: CxTableDynamicColumn) {
    if (typeof config.influenced === 'object') {
      const { rule, type } = config.influenced;
      if (!rule || !type) return;

      const depends = getStringDepends(rule);

      depends.forEach(prop => {
        if (type === 'equal') {
          register(prop, params => {
            Reflect.set(params.rowData, config.prop, getEvalResult(rule, params.rowData, true));
          });
        }
      });
    }
  }

  // 副作用处理
  sideEffectHandle(
    prop: string,
    rowData: AnyObject,
    sideEffect: CxTableDynamicColumn['sideEffect']
  ) {
    if (typeof sideEffect !== 'object') return;
    Object.entries(sideEffect).forEach(([key, val]) => {
      if (key === 'request' && Array.isArray(val)) {
        // val.forEach(async requestConfig => {
        //   const { type, url } = requestConfig;

        //   if (!$factory[type]) return;

        //   const params = requestConfig.params ? R.pick(requestConfig.params, rowData) : {};
        //   const { data, state } = await $factory[type](url, params);

        //   if (state !== 200) return;
        //   switch (requestConfig.behavior) {
        //     case 1:
        //       Object.assign(rowData, data);
        //       break;
        //   }
        // });
      }
    });
  }
}
