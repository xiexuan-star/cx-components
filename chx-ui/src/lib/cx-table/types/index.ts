import { CX_SORT_STATUS } from '../constant';
import { CxCheckSelectFun, CxTableItem, CxTableSortFun } from './tableConfig';

export * from './tableConfig';
export * from './tableProp';
export * from './dynamicConfig';

export type ArrayElement<T> = T extends Array<infer R> ? R : never;
export type ParamsItem = ArrayElement<DYNAMIC_FORM_REQUEST_PARAMS['items']>;

export type Nullable<T> = T | null;

export type CopyOptions = Partial<{
  omitProps: string[];
  onPaste: (rows: AnyObject[]) => AnyObject[];
}>;

export type TableDataVisitor = {
  sortedData: AnyObject[];
  sortProp: string;
  sort: boolean | CxTableSortFun | undefined;
  sortStatus: CX_SORT_STATUS;
};

export type withUndefined<T> = T | undefined;

export interface SelectConfig {
  selectAll: boolean;
  actualAll: boolean;
  selectItem: boolean[];
  indeterminate: boolean;
  disabled: boolean;
  disabledItem: boolean[];
  checkSelect?: CxCheckSelectFun;
}

export type PaginationModel = {
  currentPage: number;
  pageCapacity: number;
  pageSizes: number[];
  total: number;
};

export interface SelectCheckType<T = AnyObject> {
  row: T;
  index: number;
}

export interface CxTableSelectParam<T = AnyObject> {
  checkedList: SelectCheckType<T>[];
  unCheckList: SelectCheckType<T>[];
}

export interface DYNAMIC_CONFIG {
  businessType: number;
  moduleType: number;
  modelType: number;
  priceType: number;
}

export interface DYNAMIC_FORM_REQUEST_PARAMS extends DYNAMIC_CONFIG {
  currentPage?: number;
  pageCapacity?: number;
  items?: {
    multi?: [];
    prop: string;
    val1?: string;
    val2?: string;
    value?: string;
  }[];
  sortDirection?: CX_SORT_STATUS;
  sortProp?: '';
}

export interface CxTablePlugins {
  dynamicInject(cols: CxTableItem[]): CxTableItem[] | Promise<CxTableItem[]>;
}
