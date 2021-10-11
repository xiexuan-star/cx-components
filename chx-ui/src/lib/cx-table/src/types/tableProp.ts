import { AnyObject } from '@/types';
import { CSSProperties } from '@vue/runtime-dom';
import { Nullable, PaginationModel } from '.';
import { TypeOption } from '../constant/enum';
import {
  CxCellStyleFun,
  CxCheckSelectFun,
  CxHeadCellStyleFun,
  CxInjectHeadFun,
  CxTableCacheFun,
  CxTableColumnObj,
  CxTableConfig,
  CxTableItem
} from './tableConfig';
export interface CxTableCommonData {
  rowData: AnyObject;
  column: CxTableItem;
  rowIndex: number;
}
export type CxIgnoreControl = (params: {
  rowIndex: number;
  column: CxTableItem;
  rowData: AnyObject;
}) => boolean;

export type CxSpanMethodFun = (
  params: CxTableCommonData
) => { rowspan: number; colspan: number } | [number, number];

export type CxExpandFun = (rowData: AnyObject, rowIndex: number) => string | null | void;

export interface CxDynamicProps {
  businessType: number;
  modelType: number;
  priceType: number;
  moduleType: number;
}

export type CxTablePropType = {
  tableConfig: CxTableConfig;
  tableData: AnyObject[];
} & Partial<{
  height: number | string;
  pagination: PaginationModel;
  disabled: boolean;
  showTotalSum: boolean;
  floatTotalSum: boolean;
  fixTotalSum: boolean;
  customTotalSum: Nullable<AnyObject>;
  emptyLimit: number;
  spanMethod: Nullable<CxSpanMethodFun>;
  showAddBtn: string;
  virtualScroll: boolean;
  activeRows: number[];
  ignoreControl: CxIgnoreControl;
  forceControl:CxIgnoreControl;
  styleSetting: CxStyleSetting;
  keyboard: boolean;
  expand: string | CxExpandFun;
  title: string;
  widthAdaptor: boolean;
  dynamic: CxDynamicProps;
  cellStyle: CSSProperties | CxCellStyleFun;
  headCellStyle: CSSProperties | CxHeadCellStyleFun;
  checkSelect: CxCheckSelectFun;
  dynamicInject: CxInjectHeadFun;
  cache: string | CxTableCacheFun;
  configurable: boolean;
  showForm: boolean;
  formTeleport: string;
  hooks: CxTableHooks;
  setCacheBtn: string;
  cacheListBtn: string;
  stripe: boolean;
}>;

export interface CxTableHooks<Cache = any> {
  onSearch?<T = AnyObject>(rows: T[], data: AnyObject & { rows: T[] }): T[];
  onSetCache?(next: (arg: Cache) => void): void;
  onGetCache?(cache: Cache, type: TypeOption, rows: AnyObject[], form: AnyObject): void;
  afterSetCache?(): void;
}

export interface CxCellProp {
  column: CxTableColumnObj;
  rowData: AnyObject;
}

export interface CxStyleSetting {
  width: number;
  height: number;
  padding: number;
  cache: number;
}

export interface CxBasicSetting {
  keyboardEvent: boolean;
}
