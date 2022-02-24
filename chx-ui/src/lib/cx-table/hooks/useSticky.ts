import { isFunction } from 'chx-utils';
import { throttle, wrap } from 'lodash-es';
import { nextTick, ref, watch } from 'vue';
import { CxTableBaseObj, CxTablePropType } from '../types';

export const useSticky = (props: CxTablePropType, $CxTable: CxTableBaseObj) => {
  const needStickyHeader = ref(false);
  const wrapperWidth = ref(0);
  const wrapperLeft = ref(0);
  const wrapperRight = ref(0);
  const onScroll = throttle(() => {
    if (!$CxTable.wrapperEle) return;
    wrapperWidth.value = $CxTable.wrapperEle.clientWidth;
    const rect = $CxTable.wrapperEle.getBoundingClientRect();
    needStickyHeader.value = rect.top <= props.stickyHead;
    wrapperLeft.value = rect.left;
    wrapperRight.value = rect.right;
  }, 100, { leading: false, trailing: true });

  watch(() => props.stickyHead, async v => {
    if (!props.scrollWrapper) return;
    await nextTick();
    const wrapper = isFunction(props.scrollWrapper) ? props.scrollWrapper() : props.scrollWrapper;
    if (v) {
      wrapper.addEventListener('scroll', onScroll);
      window.addEventListener('scroll',onScroll);
    } else {
      wrapper.removeEventListener('scroll', onScroll);
      window.removeEventListener('scroll',onScroll);
    }
  }, { immediate: true });

  return { needStickyHeader, wrapperWidth, wrapperLeft, wrapperRight };
};
