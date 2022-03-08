import { useTableId } from '../hooks';
import { CxTableBaseObj, CxTableColumnObj, Nullable } from '../types';

export const domShare = {
  getEle<T extends HTMLElement>(container: HTMLElement, selector: string) {
    return container.querySelector<T>(selector);
  },
  getCell($CxTable: CxTableBaseObj, column: CxTableColumnObj, rowData: AnyObject) {
    const wrapperEle = $CxTable.wrapperEle!;
    return wrapperEle.querySelector<HTMLTableCellElement>(
      `.cx-table__wrapper tr[rowid=${ useTableId().getRowIdFromMap(rowData) }] td[colid=${
        column._colid
      }]`
    );
  },
  getAncestor(ele: HTMLElement, nodeName = 'TD', limited = 5) {
    let result: Nullable<HTMLElement> = ele;

    while (result && limited > 0) {
      if (result.nodeName === nodeName) break;
      result = result.parentElement;
      limited--;
    }
    return result;
  },
  scrollTo($CxTable: CxTableBaseObj, targetPosition: number) {
    $CxTable.wrapperEle?.scrollTo({ top: targetPosition });
  },
  scrollToTd(
    td: Nullable<HTMLElement>,
    container: Nullable<HTMLElement>,
    fixLeft: number,
    fixRight: number,
    fixTop: number
  ) {
    if (!td || !container) return;
    const {
      offsetLeft: tdLeft,
      offsetTop: tdTop,
      clientWidth: tdWidth,
      clientHeight: tdHeight
    } = td;
    const {
      scrollLeft: containerLeft,
      scrollTop: containerTop,
      clientWidth: containerWidth,
      clientHeight: containerHeight
    } = container;

    if (tdLeft < containerLeft + fixLeft) {
      // 说明td被卷入了左侧
      container.scrollLeft = tdLeft - fixLeft;
    }
    if (tdLeft + tdWidth > containerLeft + containerWidth - fixRight) {
      // 说明td被卷入了右侧
      container.scrollLeft = tdLeft + tdWidth - containerWidth + fixRight;
    }
    if (tdTop < containerTop) {
      // 说明td被卷入了上侧
      container.scrollTop = tdTop;
    }
    if (tdTop + tdHeight > containerTop + containerHeight - fixTop) {
      // 说明td被卷入了下侧
      container.scrollTop = tdTop - containerHeight + tdHeight + fixTop;
    }
  }
};
