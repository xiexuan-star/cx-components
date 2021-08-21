import { Slot, Slots, VNode } from 'vue'
import { AnyObject } from '../../../types'
import { CxFormControl } from '../constructor'

interface ValidateCallback {
  (err?: Error): void
}

interface FormValidateCallback {
  (isValid: boolean, invalidFields: AnyObject): void
}

export interface ElFormExpose {
  validate(): Promise<boolean>
  validate(callback: ValidateCallback): void
  validateField(props: string | string[], callback?: FormValidateCallback): void
  clearValidate(props?: string | string[]): void
  resetFields(): void
}

export interface CxFormTemplateType {
  name: string
  slots: Slots
  attrs: AnyObject
  init: () => this
  propAdaptor: () => this
  addSlots: (slots: Slots | Slot) => this
  renderVNode: (Comp?: any) => VNode | null
  render: () => VNode | null | void
}

export type CxFormCache = {
  setCache: (dataSource?: any) => void
  getCache: () => void
  removeCache: () => void
}
export interface CxFormConfig {
  inline?: boolean
  attrs?: AnyObject
  rules?: AnyObject
  form: AnyObject
  closable: boolean
  items: CxFormItemConfig[]
  formAttrs?:AnyObject
}

export interface CxFormChangeHandle {
  (payload: { prop: string; val: any; form: AnyObject; option?: AnyObject }): void
}

export type option = { name: string; id: string | number; disabled?: boolean }
export type CxFormSelectOptions = option[] | ((payload: { form: AnyObject }) => option[])

export type CxFormItemConfig = {
  prop: string
} & Partial<{
  label: string
  labelWidth: string | number
  closable: boolean
  width: string | number
  rule: AnyObject | AnyObject[]
  hide: boolean
  onChange: CxFormChangeHandle
  /**
   * @description 绑定在ElFormItem上的属性
   */
  itemAttrs: AnyObject
  /**
   * @description label与control的间距
   */
  spacing: number
  placeholder: string
  /**
   * @description control中的插槽名, 如 slot: { default:defaultSlotName,append:appendSlotName }
   */
  slot: Record<string, string>
  labelSlot: string
  custom: {
    // slot 为custom状态下对应的控件插槽名,与一般的插槽不同,该插槽会自动为最外层的所有元素绑定v-model与custom对象中的的其他属性,无需手动绑定
    slot: string
    [propName: string]: any
  }
  /**
   * @description 输入框控件属性
   */
  input: { trim?: boolean; searchIcon?: boolean; [propName: string]: any }
  select: { options: CxFormSelectOptions; [propName: string]: any }
  search: { options: CxFormSelectOptions; [propName: string]: any }
  textarea: { showWordLimit?: boolean; [propName: string]: any }
  selectMultiply: AnyObject
  date: AnyObject
  dateRange: AnyObject
  time: AnyObject
  inscription: AnyObject
  radio: AnyObject
  checkbox: AnyObject
  switchAttr: AnyObject
}>

export type CxFormItemType =
  | 'input'
  | 'textarea'
  | 'select'
  | 'search'
  | 'selectMultiply'
  | 'dateRange'
  | 'date'
  | 'custom'
  | 'time'

export interface CxFormAdaptor {
  (this: CxFormControl): any
}
