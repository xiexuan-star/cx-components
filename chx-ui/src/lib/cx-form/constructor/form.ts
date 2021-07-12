import { ref, Ref, resolveComponent } from 'vue';

import { cxFormDefaultConfig } from '../const';
import { CxFormConfig, ElFormExpose } from '../types';

import { CxFormTemplate } from '.';
import { AnyObject } from '../../../types';
import { omit } from '../../../utils';

export class CxForm extends CxFormTemplate {
  name = 'CxForm';
  attrs: AnyObject = {};
  private ref: Ref<null | ElFormExpose> = ref(null);
  private config: CxFormConfig;
  constructor(config: CxFormConfig) {
    super();
    this.config = config;
    this.init();
  }
  getFormRef() {
    return this.ref;
  }
  propAdaptor() {
    Object.assign(this.attrs, cxFormDefaultConfig.form(), omit(this.config, ['items']));
    Reflect.set(this.attrs, 'ref', this.ref);
    Reflect.set(this.attrs, 'model', this.config?.form ?? {});
    Reflect.set(
      this.attrs,
      'rules',
      this.config?.items?.reduce((res, item) => {
        item.rule && Reflect.set(res, item.prop, item.rule);
        return res;
      }, {})
    );
    return this;
  }
  render() {
    return this.renderVNode(resolveComponent('ElForm'));
  }
}
