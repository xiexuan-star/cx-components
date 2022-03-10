import { cxAnimation } from 'chx-utils';
import { useTableId } from '../hooks';
import { CxTableBaseObj, CxTableColumnObj, Nullable } from '../types';

function getDomShare() {
  return {
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
        cxAnimation(container.scrollLeft, tdLeft - fixLeft, 500, v => container.scrollLeft = v);
      }
      if (tdLeft + tdWidth > containerLeft + containerWidth - fixRight) {
        // 说明td被卷入了右侧
        cxAnimation(container.scrollLeft, tdLeft + tdWidth - containerWidth + fixRight, 500, v => container.scrollLeft = v);
      }
      if (tdTop < containerTop) {
        // 说明td被卷入了上侧
        cxAnimation(container.scrollTop, tdTop, 500, v => container.scrollTop = v);
      }
      if (tdTop + tdHeight > containerTop + containerHeight - fixTop) {
        // 说明td被卷入了下侧
        cxAnimation(container.scrollTop, tdTop - containerHeight + tdHeight + fixTop, 500, v => container.scrollTop = v);
      }
    }
  };
}

export const domShare = getDomShare();
