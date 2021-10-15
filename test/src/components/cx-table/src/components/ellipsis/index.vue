<template>
  <div
    ref="refOneEllipsis"
    class="one-ellipsis"
    :class="{ ellipsis: tipVisible }"
    :style="{ '--paddingRight': paddingRight, '--bgColor': activeBgColor }"
    v-uni-popper="popperConfig"
  >
    <div style="overflow:hidden">
      <p ref="refContent" class="note-tooltip">{{ content }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, onUnmounted, reactive, ref, watch } from 'vue';
import { Nullable } from '../../..';
import { addResizeListener, removeResizeListener } from '../../../../../utils/resizeEvent';

export default defineComponent({
  name: 'Ellipsis',
  props: {
    content: { type: [String, Number], default: '' },
    activeBgColor: { type: String, default: '#fff' },
    placement: {
      type: String,
      default: 'left'
    }
  },
  setup(props, { expose }) {
    const refOneEllipsis = ref<Nullable<HTMLElement>>();
    const refContent = ref<Nullable<HTMLElement>>();

    const tipVisible = ref(false);
    const paddingRight = ref('0');

    async function calcContentWidth() {
      const el = refContent.value;
      if (!el || !refOneEllipsis.value) return;
      const pW = el?.clientWidth;
      const wrapW = refOneEllipsis.value?.clientWidth || 80;
      const pdLeft = parseFloat(getComputedStyle(refOneEllipsis.value!).paddingLeft);
      const pdRight = parseFloat(getComputedStyle(refOneEllipsis.value!).paddingRight);
      paddingRight.value = pdRight + 'px';
      const realWidth = wrapW - pdLeft - pdRight;
      tipVisible.value = pW > realWidth;
    }

    const resizeFn = () => calcContentWidth();
    onMounted(() => {
      const conentP: any = refContent.value;
      calcContentWidth();

      addResizeListener(conentP, resizeFn);

      onUnmounted(() => {
        removeResizeListener(conentP, resizeFn);
      });
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
      refOneEllipsis,
      tipVisible,
      paddingRight,
      refContent
    };
  }
});
</script>

<style lang="scss" scoped>
.one-ellipsis {
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
  .note-tooltip {
    min-width: max-content;
  }
}
</style>
