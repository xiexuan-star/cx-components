import { CSSProperties, Ref, VNode } from 'vue';
import { Nullable, PaginationModel, withUndefined } from '.';
import {
  CxBroadcast, useDynamicConfig, useExpandConfig, usePriorityConfig, useRadioConfig, useSelectConfig, useValidator
} from '../hooks';
import { CxTableFormConfig } from './dynamicConfig';
import { CxCellProp } from './tableProp';
import { EventBus } from 'chx-utils';

export type CxTableExpose = ReturnType<typeof useValidator> &
  Omit<ReturnType<typeof useExpandConfig>, 'expandConfig'> &
  Omit<ReturnType<typeof useRadioConfig>, 'radioValue'> &
  Omit<ReturnType<typeof useSelectConfig>, 'selectConfig' | 'setCheckSelect'> &
  Omit<ReturnType<typeof usePriorityConfig>, 'onSetConfig'> &
  Pick<ReturnType<typeof useDynamicConfig>, 'forceUpdate'> & {
  isCxTableRef: true,
  getTableData: () => AnyObject[],
  triggerBroadcast: (prop: string, rowData: AnyObject) => void;
  /**
   * @param params[rowData] 与rowIndex二者取其一即可
   * @param params[rowIndex] 与rowData二者取其一即可
   */
  focusCell: (params: { prop: string; rowData?: AnyObject; rowIndex?: number }) => void;
  // setCache: (dataSource?: any) => void;
  // getCache: () => void;
  // removeCache: () => void;
  search: (payload?: AnyObject) => void;
  removeCacheItem: () => void;
};

export interface rendererConfig {
  rowData: AnyObject;
  column: CxTableColumnObj;
  selectConfig: AnyObject;
  radioValue: Ref<number>;
  expandConfig: boolean[];
  rowIndex: number;
  bus: EventBus;
  pagination?: PaginationModel;
  broadcast: CxBroadcast;
}

export type CxTableCacheFun = () => void | string;

export type CxRendererRegister =
  | {
  render: CxControlRenderer;
  /**
   * 控制是否受到单元格激活状态的影响
   */
  active?: boolean;
}
  | CxControlRenderer;

export type CxControlRenderer = (
  params: {
    isActived: boolean;
    prop: string;
    disabled: boolean;
    ignore: boolean;
    force: boolean;
  } & rendererConfig
) => VNode | JSX.Element | string | null | void;

export interface CxTableSlotData extends CxCellProp {
  rowIndex: number;
  isActived: boolean;
}

export interface CxBroadcastPayload {
  prop: string;
  rowData: AnyObject;
}

export type CxCellStyleFun = (params: {
  column: CxTableItem;
  rowData?: AnyObject;
  rowIndex: number;
}) => CSSProperties;
export type CxHeadCellStyleFun = (params: { column: CxTableItem }) => CSSProperties;
export type CxCheckSelectFun = (rowData: AnyObject) => boolean | void;
export type CxInjectHeadFun = (col: CxTableItem[]) => CxTableItem[] | Promise<CxTableItem[]>;

export interface CxTableConfig {
  items: CxTableItem[];
}

export type CalculateFun = (rowData: AnyObject) => any;
type SumFun = (data: AnyObject[]) => any;

export interface CxTableColumnObj extends CxTableItem {
  columnFlag: number;
  getStyle: (
    params?: AnyObject,
    type?: 'body' | 'head',
    rowData?: AnyObject,
    rowIndex?: number
  ) => CSSProperties;
  configWidth?: number | string;
  configMinWidth?: number | string;
  renderWidth: number;
  _colid: string;
  children: withUndefined<CxTableColumnObj[]>;
}

export interface ValidatorFun {
  (params: { column: CxTableColumnObj; value: any; rowIndex: number; rowData: AnyObject }):
    | string
    | void;
}

export type CxTableSortFun = (a: any, b: any) => number;

export type CxTableItem = {
  /**
   * @description 列表头文本内容
   */
  label: string;
  /**
   * @description 列字段
   */
  prop: string;
} & Partial<{
  /**
   * @description 配置该属性,那么单元格内容将始终显示为该函数的返回值, 入参为rowData, 允许在计算过程中对rowData进行修改
   */
  calculate: CalculateFun;
  /**
   * @description 单元格校验函数,入参为{column,rowData,rowIndex,value(单元格内容)},如果有返回内容将作为错误信息展示,否则视作校验通过
   */
  validator: ValidatorFun;
  /**
   * @description 是否展示该列的合计数据, add表示将该列数据作为数字进行合计, 如果传入其他字符串那么合计行将始终显示此字符串,或传入回调函数,入参为tableData, 合计行始终显示它的返回值
   */
  sum: SumFun | 'add' | string;
  /**
   * @description 列插槽名, 优先级最高的单元格显示方式,scope中为{column,rowIndex,rowData,isActived(聚焦),ignore(ignoreControl返回值),disabled(表格禁用)}
   */
  slot: string | CxControlRenderer;
  /**
   * @description slot的类型, 用于确定宽度(类型值同control中的type,可传可不传)
   */
  slotType: string;
  /**
   * @description 列表头插槽名,注意没有聚焦状态与禁用状态,需要自行判断,无scope
   */
  headSlot: string;
  /**
   * @description 合计行插槽名, 同样没有聚焦状态与禁用状态,同样无scope
   */
  sumSlot: string;
  /**
   * @description 表头icon, 只需传入iconfont类名中的后半部分,如 icon-pencilqianbi,只需传入pencilqianbi
   */
  icon: string;
  /**
   * @description 是否必填,该选项会自动为单元格添加一个非空值的validator判断
   */
  required: boolean;
  /**
   * @description 子列, 会自动渲染为多级表头,可无限嵌套
   */
  children: CxTableItem[];
  /**
   * @description 特殊字段, 为系统中自定义指令v-number-input的参数, 只适用于组件集成的输入框配置
   */
  number: { min?: number | string; decimal?: number | string; max?: number | string };
  /**
   * @description 单元格无法取值时的默认值
   */
  defaultValue: any;
  /**
   * @description 控件属性对象
   */
  control: CxTableControl;
  /**
   * @description 固定列, 该列会自动移动到表格左/右侧
   */
  fixed: 'left' | 'right';
  /**
   * @description 单元格对齐方式,默认为left
   */
  align: 'left' | 'right' | 'center';
  /**
   * @description 该列是否隐藏,也可通过直接操作表格config实现,此处添加该属性只是为了方便书写配置文件
   */
  hide: boolean;
  /**
   * @description 列宽度,支持数字和百分比(以表格视口宽度为基准),传入该参数后,该列将不再参与表格宽度的余量分配,所以尽量避免所有列都传入该参数
   */
  width: number | string;
  /**
   * @description 最小宽度,同样支持百分比与数字, 与width不同的时该列将参与表格宽度的余量分配
   */
  minWidth: number | string;
  /**
   * @description 列宽度(优先级最高)的宽度,会无视宽度适配器的宽度
   */
  importantWidth: number | string;
  /**
   * @description importantWidth是否是自适应宽度,对应宽度适配器中的isMin
   */
  autoWidth: boolean;
  /**
   * @description 列数据精度,传入该值后,该列数据将自动对小数位数进行格式化,包括sum为add时的合计数据
   */
  accuracy: number;
  /**
   * @description 列表头样式,值为一个CSSProperties对象或一个返回CSSProperties对象的函数,入参为column(其实没必要)
   */
  headCellStyle: CSSProperties | CxHeadCellStyleFun;
  /**
   * @description 该列普通单元格样式,值为一个CSSProperties对象或一个返回CSSProperties对象的函数,入参为column,rowData
   */
  cellStyle: CSSProperties | CxCellStyleFun;
  /**
   * @description 该列是否可排序,true为默认表现(即将列数据视为数字进行排序),或一个排序函数,入参为相比较的两个行数据,如(a,b)=>{ return a-b } 注意此处a,b并不是行数据而是rowData[column.prop]的值, 传入后可通过表头右侧的按钮进行排序, 支持正序/逆序与原排序,但是按钮与表头插槽冲突,待完善
   */
  sortable: boolean | CxTableSortFun;
  broadcastRegister: (broadcast: CxBroadcast) => void;
  /**
   * @description 是否按selectText显示, 查找顺序: 1. selectText 2. replace Id to Text
   */
  renderText: boolean;
  /**
   * @description 用于动态表单渲染
   */
  searchStates: CxTableFormConfig;
  /**
   * @description 表头提示文本
   */
  headTip: string;
}>;

export interface CxTableBaseObj {
  wrapperEle: Nullable<HTMLElement>;
  priorityColumnMap: Map<string, Partial<CxTableItem>>;
  columns: CxTableColumnObj[];
  flatColumns: CxTableColumnObj[];
  hoveringRowid: string;
  cacheItemRemove: Nullable<() => void>;
  entireTotalSum: Nullable<AnyObject>;
  editStore: {
    actived: {
      rowData: Nullable<AnyObject>;
      column: Nullable<CxTableColumnObj>;
    };
    activedControl: Nullable<HTMLElement> | boolean;
    activedCell: Nullable<HTMLElement>;
  };
  columnStore: {
    centerColumns: CxTableColumnObj[];
    leftFixedColumns: CxTableColumnObj[];
    rightFixedColumns: CxTableColumnObj[];
    pxColumns: CxTableColumnObj[];
    percentColumns: CxTableColumnObj[];
    noWidthColumns: CxTableColumnObj[];
    pxMinColumns: CxTableColumnObj[];
    percentMinColumns: CxTableColumnObj[];
  };
  scrollStore: {
    showLeftShadow: boolean;
    showRightShadow: boolean;
    showTopShadow: boolean;
    showBottomShadow: boolean;
    scrollLeft: number;
    scrollTop: number;
    leftFixedWidth: number;
    rightFixedWidth: number;
    topFixedHeight: number;
    bottomScrollBar: boolean;
    rightScrollBar: boolean;
    clientHeight: number;
    clientWidth: number;
    renderTotalWidth: number;
  };
  virtualStore: {
    renderPaddingTop: number;
    renderPaddingBottom: number;
    renderStartIndex: number;
    renderLength: number;
    renderEndIndex: number;
    rowSpanMap: number[];
  };
  styleStore: {
    CX_TABLE_MIN_WIDTH: number;
    CX_TABLE_HEIGHT: number;
    CX_TABLE_SCROLL_BAR: number;
    CX_TABLE_PADDING: number;
    CX_VISUAL_CACHE: number;
  };
}

// export type CxTableItemControlType =
//   | 'default'
//   | 'nativeCheckbox' // 集成多选
//   | 'nativeRadio' // 集成单选
//   | 'nativeDelete' // 集成删除按钮
//   | 'expandSwitch' // 扩展行开关
//   | 'index' // 序号
//   | 'input' // 文本输入框
//   | 'numberInput' // 数字输入框
//   | 'select' // 单选
//   | 'search' // 带拼音搜索的单选
//   | 'imgs' // 图片(集成viewer插件)
//   | 'time' // 时间
//   | 'date' // 日期
//   | 'note' // 文本域
//   | 'status' // 状态值映射
//   | 'memo' //备忘
//   | 'specification' // 规格
//   | 'inscription' // 多选下拉
//   | 'switch' // 开关
//   | 'orderText' // 单号文本(hover复制跳转)
//   | 'tag' // 标签
//   | 'goldColorGroup' // 金材质+金颜色组
//   | 'goldColorTextGroup'
//   | 'stoneUnitGroup' // 石料重量+单位组
//   | 'stoneUnitTextGroup'; // 石料重量+单位组

export type IndexCalcFun = (params: number) => number;

export type CxBroadcastRegister = (key: string, cb: (payload: CxBroadcastPayload) => void) => void;

export type ControlAttrs = {
  broadcastRegister?: (register: CxBroadcastRegister) => void;
  [K: string]: any;
};

export type CxTableControl = {
  /**
   * @description 控件种类,可通过useCxTable()中的registerCxRenderer注册自定义的渲染器
   */
  type: string;
} & Partial<{
  /**
   * @description 当有分页器时,可能序号并不是从0开始, 所以提供该函数用以计算序号,入参为实际序号,返回值为展示序号
   */
  indexCalc: IndexCalcFun;
  /**
   * @description 在默认控件(input,select,search等表单控件)上绑定自定义属性,可在input上绑定onInput事件,回调函数的第二个参数为rowData,可用于联动操作,select/search控件可绑定onChange事件,同样回调函数中第二个参数为rowData,可用于联动
   * broadcastRegister 其他列数据变化时会发送广播, 该属性可用于在当前单元格注册广播处理函数
   */
  attrs: ControlAttrs | (({ rowData, rowIndex }: { rowData: AnyObject, rowIndex: number }) => ControlAttrs);
  /**
   * @description select/search控件的options列表,可以是一个静态的options列表,也可以是一个返回options列表的函数,入参为{rowData,rowIndex}
   */
  options:
    | ({ disabled?: boolean } & NameWithId)[]
    | ((params: {
    rowData: AnyObject;
    rowIndex: number;
  }) => ({ disabled?: boolean } & NameWithId)[]);
  /**
   * @description select/search控件中,展示文本的字段名,默认值为column.prop+'Text'
   */
  selectText: string;
  /**
   * @description 时间格式化字符,默认值为 yyyy-mm-dd,type为date/time时生效
   */
  timeFormat: string;
  /**
   * @description 状态值映射表, type为status,tag时生效,将rowData[column.prop]的值映射为statusValue中的值
   */
  statusMap:
    | Record<string,
    { content?: string; prop?: string; type?: 'success' | 'danger' | 'primary' | 'info' }>
    | string[];
}>;
