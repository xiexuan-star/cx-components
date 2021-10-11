import { reactive } from 'vue';
import { unsafeWhenDevCall } from '../../../../utils/functor';
import { CX_TABLE_NOT_HOVER_ID } from '../constant';
import { CxTableBaseObj, CxTableColumnObj, CxTableItem } from '../types';
import { cxTableWarn } from '../utils';

export const createCxTableConfig = (): CxTableBaseObj => {
  return reactive({
    __wrapperEle: null,
    get wrapperEle() {
      if (!this.__wrapperEle) {
        unsafeWhenDevCall(() => cxTableWarn(`cxTable dom instance is `, this.__wrapperEle));
      }
      return this.__wrapperEle;
    },
    set wrapperEle(val) {
      this.__wrapperEle = val;
    },
    hoveringRowid: CX_TABLE_NOT_HOVER_ID,
    cacheItemRemove: null,
    entireTotalSum: null,
    editStore: {
      actived: {
        rowData: null,
        column: null
      },
      activedControl: false,
      activedCell: null
    },
    priorityColumnMap: new Map<string, Partial<CxTableItem>>(),
    columns: [] as CxTableColumnObj[],
    flatColumns: [] as CxTableColumnObj[],
    columnStore: {
      centerColumns: [] as CxTableColumnObj[],
      leftFixedColumns: [] as CxTableColumnObj[],
      rightFixedColumns: [] as CxTableColumnObj[],
      pxColumns: [] as CxTableColumnObj[],
      percentColumns: [] as CxTableColumnObj[],
      noWidthColumns: [] as CxTableColumnObj[],
      pxMinColumns: [] as CxTableColumnObj[],
      percentMinColumns: [] as CxTableColumnObj[]
    },
    scrollStore: {
      showBottomShadow: false,
      showLeftShadow: false,
      showRightShadow: false,
      showTopShadow: false,
      scrollLeft: 0,
      scrollTop: 0,
      leftFixedWidth: 0,
      rightFixedWidth: 0,
      topFixedHeight: 0,
      bottomScrollBar: false,
      rightScrollBar: false,
      clientHeight: 0,
      clientWidth: 0,
      renderTotalWidth: 0
    },
    virtualStore: {
      renderPaddingTop: 0,
      renderPaddingBottom: 0,
      renderStartIndex: 0,
      renderLength: 9999,
      renderEndIndex: 9999,
      rowSpanMap: []
    },
    styleStore: {
      CX_TABLE_MIN_WIDTH: 110,
      CX_TABLE_HEIGHT: 40,
      CX_TABLE_SCROLL_BAR: 8,
      CX_TABLE_PADDING: 8,
      CX_VISUAL_CACHE: 5
    }
  });
};
