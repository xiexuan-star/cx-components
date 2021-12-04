import { Slot, Slots } from 'vue';

import { cxFormRender } from '../render';
import { CxFormTemplateType } from '../types';

export class CxFormTemplate implements CxFormTemplateType {
  name = '';
  slots: Slots = {};
  attrs: AnyObject = {};

  init() {
    this.propAdaptor();
    return this;
  }

  propAdaptor() {
    throw new Error('请重写propAdaptor方法');
    return this;
  }

  addSlots(slots?: Slots | Slot) {
    if (typeof slots === 'function') {
      Reflect.set(this.slots, 'default', slots);
    } else if (typeof slots === 'object') {
      Object.assign(this.slots, slots);
    }
    return this;
  }

  renderVNode(Comp?: any) {
    return cxFormRender().renderComp(this.attrs, this.slots, Comp);
  }

  renderControl(Comp?: any) {
    return cxFormRender().renderControl(this.attrs, this.slots, Comp);
  }

  render() {
    throw new Error('请重写render方法');
  }
}
