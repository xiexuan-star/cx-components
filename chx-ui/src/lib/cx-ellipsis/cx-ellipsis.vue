<template>
  <div
    ref="containerRef"
    class="cx-ellipsis"
    :class="{ ellipsis: tipVisible }"
    :style="{ '--paddingRight': paddingRight, '--bgColor': activeBgColor }"
    v-uni-popper="popperConfig"
  >
    <div style="overflow: hidden">
      <p ref="contentRef" class="tips">{{ content }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, onUnmounted, reactive, ref, watch } from 'vue';
import { addResizeListener, removeResizeListener } from 'chx-utils';

export default defineComponent({
  name: 'CxEllipsis',
  props: {
    content: { type: [String, Number], default: '' },
    activeBgColor: { type: String, default: '#fff' },
    placement: {
      type: String,
      default: 'left'
    }
  },
  setup(props, { expose }) {
    const containerRef = ref<HTMLElement | null>(null);
    const contentRef = ref<HTMLElement | null>(null);

    const tipVisible = ref(false);
    const paddingRight = ref('0');

    async function calcContentWidth() {
      const el = contentRef.value;
      if (!el || !containerRef.value) return;
      const pW = el?.clientWidth;
      const wrapW = containerRef.value?.clientWidth || 80;
      const pdLeft = parseFloat(getComputedStyle(containerRef.value!).paddingLeft);
      const pdRight = parseFloat(getComputedStyle(containerRef.value!).paddingRight);
      paddingRight.value = pdRight + 'px';
      const realWidth = wrapW - pdLeft - pdRight;
      tipVisible.value = pW > realWidth;
    }

    const resizeFn = () => calcContentWidth();
    onMounted(() => {
      calcContentWidth();
      addResizeListener(contentRef.value, resizeFn);
    });
    onUnmounted(() => {
      removeResizeListener(contentRef.value, resizeFn);
    });

    expose({
      calcContentWidth
    });

    const popperConfig = reactive({
      text: props.content as any,
      visible: tipVisible.value,
      controlType: 'mouse',
      placement: props.placement
    });

    watch(
      [() => props.content, () => props.placement, tipVisible],
      ([content, placement, tipVisible]) => {
        popperConfig.text = content as any;
        popperConfig.placement = placement as any;
        popperConfig.visible = tipVisible as any;
      }
    );

    return {
      popperConfig,
      containerRef,
      tipVisible,
      paddingRight,
      contentRef
    };
  }
});
</script>

<style lang="scss" scoped>
.cx-ellipsis {
  position: relative;
  box-sizing: border-box;
  overflow: hidden;

  &.ellipsis::before {
    position: absolute;
    display: block;
    padding-right: var(--paddingRight);
    right: 0;
    content: '...';
    background-color: var(--bgColor);
  }

  .tips {
    min-width: max-content;
  }
}
</style>
