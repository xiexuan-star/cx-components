import { CxTableBaseObj } from '../types';

export const useScrollState = ($CxTable: CxTableBaseObj) => {
  const { wrapperEle, scrollStore } = $CxTable;
  if (!wrapperEle) return;

  setTimeout(() => {
    const { clientHeight, scrollHeight, clientWidth, scrollWidth } = wrapperEle;
    scrollStore.clientHeight = clientHeight;
    scrollStore.clientWidth = clientWidth;
    scrollStore.rightScrollBar = clientHeight < scrollHeight;
    scrollStore.bottomScrollBar = clientWidth < scrollWidth;
  });
};
