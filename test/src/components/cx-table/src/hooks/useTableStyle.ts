import { computed, CSSProperties } from 'vue';
import { CxTableBaseObj } from '../types';
import { invokeLayeredRow, getSums } from '../utils';

export const useTableStyle = (
  props: AnyObject,
  CxTable: CxTableBaseObj,
  type: 'head' | 'body' | 'table'
) => {
  const { scrollStore, styleStore, columnStore } = CxTable;
  const { CX_TABLE_SCROLL_BAR, CX_TABLE_HEIGHT } = styleStore;
  if (type === 'head') {
    return computed(() => {
      const result: CSSProperties = {};
      if (props.fixed) {
        result.height = scrollStore.topFixedHeight + 'px';
        if (props.fixed === 'top') {
          result.top = 0;
          result.left = -scrollStore.scrollLeft + 'px';
          result.width = scrollStore.clientWidth + 'px';
        }
        if (props.fixed === 'left') {
          result.left = 0;
        }
        if (props.fixed === 'right') {
          result.right = scrollStore.rightScrollBar ? CX_TABLE_SCROLL_BAR + 'px' : 0;
        }
      }
      return result;
    });
  } else if (type === 'body') {
    return computed(() => {
      const result: CSSProperties = {};
      if (props.fixed) {
        if (props.fixed === 'left') {
          const { topFixedHeight, bottomScrollBar, clientHeight } = scrollStore;
          result.left = 0;
          result.top = props.onlyTotal ? 0 : topFixedHeight + 'px';
          if (props.onlyTotal) {
            result.height = CX_TABLE_HEIGHT + 'px';
          } else {
            result.height = bottomScrollBar ? clientHeight - topFixedHeight + 'px' : 0;
          }
        }
        if (props.fixed === 'right') {
          const { topFixedHeight, rightScrollBar, bottomScrollBar, clientHeight } = scrollStore;
          result.right = rightScrollBar && !props.onlyTotal ? CX_TABLE_SCROLL_BAR + 'px' : 0;
          result.top = props.onlyTotal ? 0 : topFixedHeight + 'px';
          if (props.onlyTotal) {
            result.height = CX_TABLE_HEIGHT + 'px';
          } else {
            result.height = bottomScrollBar ? clientHeight - topFixedHeight + 'px' : 0;
          }
        }
        if (props.fixed === 'bottom') {
          const { bottomScrollBar } = scrollStore;
          result.left = 0;
          result.bottom = bottomScrollBar ? CX_TABLE_SCROLL_BAR + 'px' : 0;
          result.width = scrollStore.clientWidth + 'px';
          result.height = CX_TABLE_HEIGHT + 'px';
          result.left = -scrollStore.scrollLeft + 'px';
        }
      }
      return result;
    });
  } else {
    return computed(() => {
      const result: CSSProperties = {};
      const fixedHeight = invokeLayeredRow(CxTable.columns).length * CX_TABLE_HEIGHT;
      scrollStore.topFixedHeight = fixedHeight;
      if (props.fixed === 'left') {
        const width = getSums(columnStore.leftFixedColumns);
        result.width = width + 'px';
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        scrollStore.leftFixedWidth = width;
      } else if (props.fixed === 'right') {
        const width = getSums(columnStore.rightFixedColumns);
        result.width = width + 'px';
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        scrollStore.rightFixedWidth = width;
      } else if (props.fixed === 'top') {
        result.height = fixedHeight + 'px';
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      } else if (props.fixed === 'bottom') {
        result.height = CX_TABLE_HEIGHT + 'px';
      }
      return result;
    });
  }
};
