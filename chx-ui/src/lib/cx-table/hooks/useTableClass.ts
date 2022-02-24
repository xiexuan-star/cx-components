import { computed } from 'vue';
import { CxTableBaseObj } from '../types';

export const useTableClass = (props: AnyObject, CxTable: CxTableBaseObj) => {
  return computed(() => {
    const result = [];

    if (props.fixed) {
      const { scrollStore } = CxTable;
      const { showLeftShadow, showRightShadow, showTopShadow, showBottomShadow } = scrollStore;
      result.push(`cx-table_fixed_${ props.fixed }`);
      if (showLeftShadow && props.fixed === 'left') {
        result.push('cx-table_left_shadow');
      } else if (showRightShadow && props.fixed === 'right') {
        result.push('cx-table_right_shadow');
      } else if (showTopShadow && props.fixed === 'top') {
        result.push('cx-table_top_shadow');
      } else if (showBottomShadow && props.fixed === 'bottom') {
        result.push('cx-table_bottom_shadow');
      }
    }else {
      result.push('cx-table_center')
    }

    return result;
  });
};
