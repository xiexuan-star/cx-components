import { CxFormItemConfig } from '../../..';
import { CxTableItem } from './index';

export type CxTableFormConfig = {
  searchType: 'custom' | 'input' | 'search' | 'date' | 'dateRange' | 'time';
} & Partial<{
  searchSourceId: number;
  searchColumnId: number;
  searchColumnProp: string;
  searchDefault: string;
  searchOptions: (NameWithId & { disabled?: boolean })[] | AnyObject | ((payload: { form: AnyObject }) => ({ disabled?: boolean } & NameWithId)[]);
  dynamicSearchOptions: AnyObject;
}>

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
  headTip: string;
  jsonData: { defaultItem: boolean };
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
  type: string;
} & Partial<{
  statusMap: Record<string, { content?: string; type: 'success' | 'error' | 'info' }>;
  source: number;
  sourceColumnId: number;
  sourceColumnProp: string;
  options: (NameWithId & { disabled?: boolean })[] | AnyObject | ((params: {
    rowData: AnyObject;
    rowIndex: number;
  }) => ({ disabled?: boolean } & NameWithId)[]);
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

export interface CxTableFormAdaptorPlugin {
  onInit?: (config: CxTableDynamicColumn) => CxTableDynamicColumn;
  onOutput?: (column: TeleFormItem) => TeleFormItem;
}
