import { resolveComponent, Slots } from 'vue'

import { CxFormItemConfig } from '../types'

import { CxFormTemplate } from '.'
import { isNumber, isObject } from '../../../utils'
import { useCxForm } from '../hooks'

export class CxFormItem extends CxFormTemplate {
  name = 'CxFormItem'
  attrs: AnyObject = {}
  config: CxFormItemConfig
  constructor(config: CxFormItemConfig) {
    super()
    this.config = config
    this.init()
  }
  addSlots(slots?: Slots) {
    if (isObject(slots)) {
      const itemSlot = { default: slots.default }

      this.config.labelSlot && Reflect.set(itemSlot, 'label', () => slots[this.config.labelSlot!]?.({ ...this.config }))
      Object.assign(this.slots, itemSlot)
    }
    return this
  }
  propAdaptor() {
    // 以下顺序请勿变更
    isNumber(this.config?.spacing) && Reflect.set(this.attrs, 'style', { paddingRight: this.config?.spacing + 'px' })
    Reflect.set(this.attrs, 'key', this.config?.prop ?? '')
    Object.assign(this.attrs, this.config?.itemAttrs ?? {})
    this.config?.labelWidth && Reflect.set(this.attrs, 'labelWidth', this.config.labelWidth + 'px')
    Reflect.set(this.attrs, 'label', this.config?.label ?? '')
    Reflect.set(this.attrs, 'prop', this.config?.prop ?? '')

    return this
  }
  render() {
    const formItem = useCxForm().getRenderer('formItem')?.comp ?? resolveComponent('ElFormItem')
    return this.renderVNode(formItem)
  }
}
