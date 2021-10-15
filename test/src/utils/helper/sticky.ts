import { throttle } from 'lodash-es';
import { onBeforeUnmount, onMounted } from 'vue';

export function useSticky(eleName: string, { top = 0, left = 0, zIndex = 10 } = {}) {
  onMounted(() => {
    const ele = document.querySelector(eleName) as HTMLElement;
    if (!ele) return;
    const offsetLeft = ele.offsetLeft + 190;
    const appMain = document.querySelector('.app-main');
    function scrollEvent() {
      if (ele.offsetTop - appMain!.scrollTop < 0) {
        ele.style.cssText = `position: fixed; left: ${left || offsetLeft}px; top: ${top ||
          88}px; z-index: ${zIndex}`;
      } else {
        ele.style.cssText = '';
      }
    }

    const throttleScrollEvent = throttle(scrollEvent, 500);

    appMain?.addEventListener('scroll', throttleScrollEvent);
    onBeforeUnmount(() => {
      appMain?.removeEventListener('scroll', throttleScrollEvent);
    });
  });
}
