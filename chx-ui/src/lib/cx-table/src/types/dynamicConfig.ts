import { CxFormItemConfig } from '../../../..';
import { AnyObject, NameWithId } from '../../../../types';
import { CxTableItem, CxTableItemControlType } from './index';

export interface CxTableFormConfig {
  searchType: 'custom'|'input' | 'search' | 'date' | 'dateRange' | 'time';
  searchDefault?: string;
  searchOptions?: (NameWithId & { disabled?: boolean })[] | AnyObject;
  dynamicSearchOptions?: AnyObject;
}

export interface CxTableFormRegist {
  dep: string;
  cb: (form: AnyObject) => void;
}

export type CxTableDynamicColumn = {
  label: string;
  prop: string;
} & Partial<{
  index: boolean;
  calculate: string | AnyObject;
  dynamicCalculate: AnyObject;
  validator: AnyObject[];
  dynamicValidator: AnyObject[];
  sum: 1 | string;
  icon: string;
  required: boolean;
  slot: string;
  slotType: string;
  children: CxTableDynamicColumn[];
  number: Partial<{ min: number | string; max: number | string; decimal: number | string }>;
  input: Partial<{ min: number | string; max: number | string; decimal: number | string }>;
  defaultValue: any;
  fixed: 'left' | 'right';
  align: 'center' | 'left' | 'right';
  width: number | string;
  importantWidth: number | string;
  autoWidth: boolean;
  accuracy: number;
  influenced: { rule?: string; type: 'equal'; immediate?: boolean };
  sortable: boolean;
  renderText: boolean;
  control: CxTableDynamicControl;
  searchStates: CxTableFormConfig;
  headTip:string;
  sideEffect: {
    request?: {
      url: string;
      type: 'get' | 'post' | 'put' | 'delete';
      params?: Array<string>;
      behavior: 1;
    }[];
  };
}>;

export type CxTableDynamicControl = {
  /**
   * @description 控件种类,可通过useCxTable()中的registerCxRenderer注册自定义的渲染器
   */
  type: CxTableItemControlType;
} & Partial<{
  statusMap: Record<string, { content?: string; type: 'success' | 'error' | 'info' }>;
  options: (NameWithId & { disabled?: boolean })[] | AnyObject;
  dynamicOptions: AnyObject;
  exclusion: boolean;
  maxLength: number;
  minLength: number;
  showWordLimit: boolean;
}>;

export interface CxTableAdaptorPlugin {
  onInit?: (config: CxTableDynamicColumn) => CxTableDynamicColumn;
  onOutput?: (column: CxTableItem) => CxTableItem;
}


export type TeleFormItem = CxFormItemConfig & { register: CxTableFormRegist[] }
export interface CxTableFormAdaptorPlugin{
  onInit?: (config: CxTableDynamicColumn) => CxTableDynamicColumn;
  onOutput?: (column: TeleFormItem) => TeleFormItem;
}
