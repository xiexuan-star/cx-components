<template>
  <div :style="{'--wrapper-width':wrapperWidth}" :class="`cx-description cx-description__${size}`" ref="wrapperRef">
    <section :style="{ width: tableWidth }" class="table">
      <cx-description-row
        :size="size"
        :renderWidth="renderWidth"
        v-for="row in rows"
        :columnNum="column"
        :row="row"
        :key="row"
      />
    </section>
  </div>
</template>
<script lang="ts">
import {
  computed,
  defineComponent,
  nextTick,
  onBeforeUnmount,
  onMounted, PropType,
  ref,
  VNode,
  watchEffect
} from 'vue';
import CxDescriptionRow from './cx-description-row';
import CxDescriptionItem from '../cx-description-item/cx-description-item';

export default defineComponent({
  name: 'CxDescription',
  components: { CxDescriptionRow },
  props: {
    minWidth: { type: Number, default: 180 },
    maxWidth: { type: Number, default: 320 },
    wrapperWidth: { type: Number, default: 840 },
    size: { type: String as PropType<'middle' | 'large'>, default: 'middle' }
  },
  setup(props, { slots }) {
    const getVNodeProp = (node: VNode, prop: string): any => {
      return Reflect.get(node.props ?? {}, prop) ?? (node.type as any)?.props?.[prop]?.default;
    };
    const wrapperRef = ref<HTMLElement | null>(null);
    const tableWidth = computed(() => {
      return (
        (rows.value[0]?.reduce((res, node) => {
          return res + (+getVNodeProp(node, 'span') || 1);
        }, 0) ?? 0) *
        renderWidth.value +
        'px'
      );
    });
    const rows = ref<VNode[][]>([]);
    const flattedChildren = (children: VNode[]) => {
      const temp = Array.isArray(children) ? children : [children];
      const res = [] as VNode[];
      temp.forEach(child => {
        if (Array.isArray(child.children)) {
          res.push(...flattedChildren(child.children as VNode[]));
        } else {
          res.push(child);
        }
      });
      return res;
    };
    const getChildren = () => {
      const defaults = flattedChildren(slots.default?.() ?? ([] as any[]));
      return ((defaults?.filter(node => (node.type as any)?.name === CxDescriptionItem.name) ??
        []) as unknown) as VNode[];
    };
    let cancelEffect: any = null;
    const column = ref(0);
    const renderWidth = ref(0);
    onMounted(async () => {
      await nextTick();
      cancelEffect = watchEffect(() => updateRows());
      window.addEventListener('resize', updateRows);
    });
    onBeforeUnmount(() => {
      window.removeEventListener('resize', updateRows);
      cancelEffect?.();
    });
    const updateRows = () => {
      const wrapper = wrapperRef.value;
      if (!wrapper) return;
      const children = getChildren();
      const length = children.length;
      if (!length) return;
      const width = wrapper.clientWidth - (props.size === 'large' ? 16 : 8);
      const floatCapacity = width / props.minWidth;
      const capacity = +floatCapacity.toFixed(0);
      const rowNum = parseInt(length / capacity + 1 + '');
      column.value = rowNum === 1 ? Math.min(length, capacity) : parseInt(floatCapacity + '');
      renderWidth.value = Math.min(parseInt(width / column.value + ''), props.maxWidth);
      rows.value = children.reduce(
        (res, child) => {
          let current = res[res.length - 1] || (res[res.length - 1] = []);
          const length = current.reduce((res, node) => {
            return res + (+getVNodeProp(node, 'span') || 1);
          }, 0);
          if (
            length >= column.value ||
            length + +(getVNodeProp(child, 'span') || 1) > column.value
          ) {
            current = res[res.length] = [];
          }
          current.push(child);
          return res;
        },
        [[]] as VNode[][]
      );
    };

    return { wrapperRef, rows, column, renderWidth, tableWidth, updateRows };
  }
});
</script>
