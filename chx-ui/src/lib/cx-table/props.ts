import { CSSProperties, PropType } from 'vue';
import {
  CxIgnoreControl,
  CxSpanMethodFun,
  CxStyleSetting,
  CxTableConfig,
  CxDynamicProps,
  CxCellStyleFun,
  CxHeadCellStyleFun,
  CxExpandFun,
  CxCheckSelectFun,
  CxInjectHeadFun,
  CxTableCacheFun,
  PaginationModel,
  CxTableHooks,
  Nullable
} from './types';

export default {
  tableConfig: { type: Object as PropType<CxTableConfig>, default: () => ({ items: [] }) },
  tableData: { type: Array as PropType<AnyObject[]>, default: () => [] },
  /**
   * @description 显示底部总计
   */
  showTotalSum: { type: Boolean, default: false },
  /**
   * @description 固定底部总计
   */
  fixTotalSum: { type: Boolean, default: false },
  /**
   * @description 集成分页器, 传入分页器参数对象即可开启, 可使用useCxPagination获得, 分页参数更新,将抛出paging事件
   */
  pagination: { type: Object as PropType<PaginationModel> },
  /**
   * @description 自定义总计行数据源, 将完全采用该对象作为合计行数据渲染
   */
  customTotalSum: { type: Object as PropType<Nullable<AnyObject>> },
  /**
   * @description 最大高度,传入后将固定头部,可以是数字(将被自动格式化为px高度),也可以是任意描述高度的字符串,如 calc(100vh - 100px)
   */
  height: { type: [Number, String], default: '' },
  /**
   * @description 禁用所有输入类控件, 无法直接影响插槽, 可使用插槽scope中的disable属性判断
   */
  disabled: { type: Boolean, default: false },
  /**
   * @description 空行补位, 补位的空行没有键盘事件响应也无法聚焦
   */
  emptyLimit: { type: Number, default: 0 },
  /**
   * @description 控制colspan/rowspan, 函数类型, 入参为column,rowIndex,rowData, 返回{colspan:number,rowspan:number}对象或[rowspan,colspan]数组
   */
  spanMethod: { type: Function as PropType<CxSpanMethodFun> },
  /**
   * @description 显示添加按钮(特定需求使用,点击该按钮将抛出addNewRow事件)
   */
  showAddBtn: { type: String, default: '' },
  /**
   * @description 开启虚拟滚动, 表格行数较小不建议开启, 会消耗一定的额外性能, 且当其与spanMethod同时使用时,性能开销较大(但仍远小于长列表渲染),渲染前预计算spanMethod 10000行*20列约300ms
   */
  virtualScroll: { type: Boolean, default: false },
  /**
   * @description 表现为激活状态行的index列表, 该属性主要用于自定义行多选,行单选的情况,激活行默认表现为浅蓝色(可与集成单选/多选同时使用)
   */
  activeRows: { type: Array as PropType<number[]> },
  /**
   * @description 目标行/列隐藏控件, 无法直接影响插槽, 插槽可通过scope中的ignore属性自定义设置
   */
  ignoreControl: { type: Function as PropType<CxIgnoreControl> },
  /**
   * @description 目标行/列强制显示控件,无法直接影响插槽, 插槽可通过scope中的isControl属性自定义设置
   */
  forceControl: { type: Function as PropType<CxIgnoreControl> },
  /**
   * @description 默认样式配置,{width:默认单元格宽度,height:默认单元格高度,padding:单元格内左右padding,cache:虚拟滚动视口外缓冲行数}
   */
  styleSetting: { type: Object as PropType<CxStyleSetting> },
  /**
   * @description 是否启用键盘事件,关闭后单元格将无法聚焦
   */
  keyboard: { type: Boolean, default: true },
  /**
   * @description 拓展行,可以是插槽名或一个返回插槽名的函数,入参为column,rowData,rowIndex,如果返回值为空,那么便不渲染,该功能可针对特定的某行开启拓展行.
   */
  expand: { type: [String, Function] as PropType<CxExpandFun | string> },
  /**
   * @description 表格title, 聊胜于无的功能
   */
  title: { type: String, default: '' },
  /**
   * @description 是否开启懒加载, 默认为开启
   */
  lazy: { type: Boolean, default: true },
  /**
   * @description 是否使用宽度适配器提供的宽度,默认开启
   */
  widthAdaptor: { type: Boolean, default: true },
  /**
   * @description 动态表头加载参数,一旦传入该属性,则表格的tableConfig属性将失效
   */
  dynamic: { type: Object as PropType<CxDynamicProps> },
  /**
   * @description 行样式
   */
  cellStyle: {
    type: [Function, Object] as PropType<CSSProperties | CxCellStyleFun>
  },
  /**
   * @description 表头样式
   */
  headCellStyle: {
    type: [Function, Object] as PropType<CSSProperties | CxHeadCellStyleFun>
  },
  /**
   * @description 设置nativeCheckbox多选禁用状态
   */
  checkSelect: { type: Function as PropType<CxCheckSelectFun> },
  /**
   * @description dynamic表头模式下用于手动添加或修改表头
   */
  dynamicInject: { type: Function as PropType<CxInjectHeadFun> },
  /**
   * @description 是否缓存表格数据,传入值为缓存key值或一个返回key值的函数(返回空值则不缓存)
   * 在不同的路由下 不 允许使用相同的key值, 这通常会导致缓存读取错误
   */
  cache: { type: [String, Function] as PropType<string | CxTableCacheFun> },
  /**
   * @description 在dynamic状态下, 是否开启配置弹窗
   */
  configurable: { type: Boolean, default: true },
  /**
   * @description 是否显示表单控件
   */
  showForm: { type: Boolean, default: false },
  /**
   * @description 渲染表单时,是否渲染至其他容器,值为容器的选择器
   */
  formTeleport: { type: String },
  /**
   * @description 钩子
   */
  hooks: { type: Object as PropType<CxTableHooks> },
  /**
   * @description 暂存列表按钮容器的选择器
   */
  cacheListBtn: { type: String },
  /**
   * @description 暂存按钮容器的选择器
   */
  setCacheBtn: { type: String },
  /**
   * @description 斑马纹
   */
  stripe: { type: Boolean, default: true },
  /**
   * @description 表头是否sticky固定
   */
  stickyHead: { type: [Number, String] }
};
