import { Ref, nextTick } from 'vue';

export const useLazyLoad = (ele: HTMLElement, tableVisible: Ref<boolean>) => {
  if (!IntersectionObserver) {
    tableVisible.value = true;
  }
  const observer = new IntersectionObserver(async entries => {
    if (tableVisible.value) return;
    await nextTick();
    tableVisible.value = Reflect.get(entries?.[0] ?? { isIntersecting: true }, 'isIntersecting');
  });
  observer.observe(ele);
};
