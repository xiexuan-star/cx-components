import { Slot, Slots } from '@vue/runtime-core'

import { CxFormItemConfig } from '../types'
import { useCxForm } from '../hooks'

import { CxFormTemplate } from '.'
import { useContext } from 'vue'
import { AnyObject, Func } from '../../../types'
import { isFunction, isObject } from '../../../utils'
export class CxFormControl extends CxFormTemplate {
  name = 'CxFormControl'
  parse: Func<any> | null = null
  config: CxFormItemConfig
  attrs: AnyObject = {}
  form: AnyObject
  prop: string
  type = ''
  constructor(form: AnyObject, controlConfig: CxFormItemConfig) {
    super()
    this.form = form
    this.config = controlConfig
    this.prop = controlConfig.prop
    this.init()
  }
  init() {
    this.propAdaptor().bindModel()
    return this
  }
  addSlots(slots: Slots | Slot) {
    if (!isObject(slots)) return this
    isObject(this.config?.slot) &&
      Object.entries(this.config!.slot).forEach(([key, val]) => {
        Reflect.set(this.slots, key, Reflect.get(slots, val))
      })
    const customSlot = this.config?.custom?.slot
    customSlot && Reflect.set(this.slots, customSlot, Reflect.get(slots, customSlot))
    return this
  }
  private bindModel() {
    if (this.prop) {
      Reflect.set(this.attrs, 'modelValue', this.form[this.prop])
      Reflect.set(this.attrs, 'onUpdate:modelValue', (val: any) => {
        if (Array.isArray(val)) {
          val = val.map((item) => {
            return this.parse ? this.parse(item) : item
          })
        } else if (val) {
          val = this.parse ? this.parse(val) : val
        }
        Reflect.set(this.form, this.prop, val)
      })
    }
    return this
  }
  propAdaptor() {
    const { getRendererKeys, getRenderer } = useCxForm()
    Reflect.set(this.attrs, 'prop', this.prop)
    ;[...getRendererKeys()].find((type) => {
      if (!isObject(Reflect.get(this.config!, type))) return
      const { adaptor } = getRenderer(type) ?? {}
      this.type = type
      isFunction(adaptor) ? adaptor.apply(this) : Object.assign(this.attrs, Reflect.get(this.config!, type))
      return true
    })

    const placeholder = Reflect.get(this.config ?? {}, 'placeholder')
    placeholder && Reflect.set(this.attrs, 'placeholder', placeholder)
    const { emit } = useContext()
    Reflect.set(this.attrs, 'onChange', (val: any) => {
      isFunction(emit) && emit('change', { prop: this.prop, val, form: this.form })
      isFunction(this.config?.onChange) && this.config?.onChange({ prop: this.prop, val, form: this.form })
    })
    !isObject(this.attrs?.style) && Reflect.set(this.attrs, 'style', {})
    this.config.width && isObject(this.attrs?.style) && Reflect.set(this.attrs.style, 'width', `${this.config.width}px`)
    return this
  }
  render() {
    let Control
    if (this.type === 'custom') {
      Control = Reflect.get(this.slots, this.config?.custom?.slot ?? '')
    } else {
      const comp = useCxForm().getRenderer(this.type)?.comp
      Control = isFunction(comp) ? (comp as Function)() : comp
    }

    return this.renderVNode(Control)
  }
}
