import { computed } from 'vue';
import { CxTableBaseObj } from '../types';

export const useTableClass = (props: AnyObject, CxTable: CxTableBaseObj) => {
  return computed(() => {
    const result = [];

    if (props.fixed) {
      const { scrollStore } = CxTable;
      const { showLeftShadow, showRightShadow, showTopShadow, showBottomShadow } = scrollStore;
      result.push(`cx-table__fixed__${ props.fixed }`);
      if (showLeftShadow && props.fixed === 'left') {
        result.push('cx-table__left__shadow');
      } else if (showRightShadow && props.fixed === 'right') {
        result.push('cx-table__right__shadow');
      } else if (showTopShadow && props.fixed === 'top') {
        result.push('cx-table__top__shadow');
      } else if (showBottomShadow && props.fixed === 'bottom') {
        result.push('cx-table__bottom__shadow');
      }
    }else {
      result.push('cx-table__center')
    }

    return result;
  });
};
