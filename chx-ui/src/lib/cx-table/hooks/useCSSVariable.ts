import { computed } from 'vue';
import { CxTableBaseObj } from '../types';

export const useCSSVariable = ($CxTable: CxTableBaseObj) => {
  return {
    cssVariable: computed(() => {
      return {
        '--padding': $CxTable.styleStore.CX_TABLE_PADDING,
        '--cellHeight': $CxTable.styleStore.CX_TABLE_HEIGHT,
        '--scrollWidth': $CxTable.styleStore.CX_TABLE_SCROLL_BAR
      };
    })
  };
};
