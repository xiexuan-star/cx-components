export * from './enum';
import { InjectionKey } from 'vue';
import { CxTableBaseObj, CxTablePropType, DYNAMIC_CONFIG } from '../types';

export const CX_TABLE_ROW_ID_PREPEND = 'cxrow-';

export const CX_TABLE_ROW_KEY = 'row-key-';

export const CX_TABLE_COLUMN_ID_PREPEND = 'cxcol-';

export const CX_TABLE_COLUMN_KEY = 'col-key-';

export const CX_TABLE_ID_PREPEND = 'cxtable-';

export const CX_TABLE_SUM_ROW_KEY = 'cxtable-sum';

export const CX_TABLE_VISUAL_ROW_KEY = 'cxtable-virtual-row';

export const CX_TABLE_EVENT_LIST = [
  'register',
  'radioChange',
  'selectChange',
  'selectItemChange',
  'paging',
  'addNewRow',
  'tdFocus',
  'expandCheck',
  'broadcast',
  'dynamicUpdate',
  'columnUpdate',
  'dynamicSetting',
  'cached',
  'dragSort'
];

export const CX_TABLE_INPUT_TYPE = ['input', 'numberInput', 'note'];

export const CX_TABLE_SELECT_TYPE = ['select', 'search', 'inscription', ''];

export const CX_TABLE_SUM_INDEX = -100;

export const CX_TABLE_EMPTY_INDEX = -200;

export const CX_TABLE_PER_CHAR_WIDTH = 20;

export const CX_TABLE_NOT_HOVER_ID = 'cxrow-not-hover';

export const CX_TABLE_DYNAMIC_PROPS: Array<keyof DYNAMIC_CONFIG> = [
  'moduleType',
  'businessType',
  'priceType',
  'modelType'
];

export const CX_TABLE_DYNAMIC_CACHE = '__CX_TABLE_DYNAMIC_CACHE__';

export const CX_TABLE_CACHE_PENDING = '__CX_TABLE_CACHE_PENDING_';

export const CX_TABLE_THROTTLE_DURATION = 0.5;

export const CX_TABLE_ROOT_PROP: InjectionKey<CxTablePropType> = Symbol('__CX_TABLE_ROOT_PROP__');

export const CX_TABLE_BASE_OBJ: InjectionKey<CxTableBaseObj> = Symbol('__CX_TABLE_BASE_OBJ__');
