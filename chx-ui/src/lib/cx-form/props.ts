import { PropType } from 'vue'
import { AnyObject } from '../../types'
import { CxFormItemConfig } from './types'

export const CxFormProps = {
  form: { type: Object as PropType<AnyObject>, default: () => ({}) },
  inline: { type: Boolean, default: true },
  disabled: { type: Boolean, default: false },
  closable: { type: Boolean, default: false },
  items: { type: Array as PropType<CxFormItemConfig[]>, default: (): any[] => [] },
  class: { type: [Array, Object, String], default: (): any[] => [] },
  formAttrs: { type: Object as PropType<AnyObject> },
}
