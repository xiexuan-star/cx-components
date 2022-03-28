<template>
  <div :class="wrapperClassList" :style="styleParser(style)" ref="headerRef">
    <table :style="{left:style.left}">
      <tr v-for="(headers,index) in layeredHeadItems">
        <cx-table-head-cell v-for="col in headerFilter(headers)" :column="col"
                            :layeredLevel="layeredHeadItems.length-index"/>
      </tr>
    </table>
  </div>
  <div v-if="needStickyHeader && !fixed"
       :style="{height: CxTable.styleStore.CX_TABLE_HEIGHT * layeredHeadItems.length + 'px'}"></div>
</template>
<script lang="ts">
import { computed, CSSProperties, defineComponent, inject, PropType, ref, watch } from 'vue';
import { useTableStyle } from '../../hooks';
import { CxTableBaseObj, CxTableColumnObj } from '../../types';
import { invokeLayeredRow } from '../../utils';
import CxTableHeadCell from './headCell';
import { isString } from 'chx-utils';

export default defineComponent({
  name: 'CxTableHead',
  components: { CxTableHeadCell },
  props: {
    fixed: { type: String, default: '' },
    left: { type: Number, default: 0 },
    classList: { type: [Array, String] as PropType<string[] | string>, default: () => [] },
    styleProperty: { type: Object as PropType<CSSProperties>, default: () => ({}) },
    needStickyHeader: { type: Boolean, default: false },
  },
  setup(props) {
    const CxTable = inject<CxTableBaseObj>('CxTable')!;

    const style = useTableStyle(props, CxTable, 'head');

    function styleParser() {
      const result: CSSProperties = { ...props.styleProperty };
      ['top', 'height', 'width', 'right'].forEach(name => {
        style.value[name] && (result[name] = style.value[name]);
      });
      return result;
    }

    // 分层表头
    const layeredHeadItems = computed(() => {
      return invokeLayeredRow(CxTable.columns);
    });

    const hoisted_2 = 'cx-table__head';
    const headerRef = ref<HTMLElement>();

    if (!props.fixed) {
      watch([() => CxTable.scrollStore.scrollLeft, () => props.needStickyHeader], ([left, need]: any[]) => {
        if (!headerRef.value || !need) return;
        headerRef.value.scrollLeft = left;
      });
    }
    const wrapperClassList = computed(() => {
      const classList = [hoisted_2];
      isString(props.classList) ? classList.push(props.classList) : classList.push(...props.classList);
      if (props.needStickyHeader) {
        classList.push('is-sticky');
      }
      return classList;
    });

    function headerFilter(cols: CxTableColumnObj[]) {
      return cols.filter(col => !(props.fixed && props.fixed !== 'top' && col.fixed !== props.fixed));
    }

    return { style, headerFilter, CxTable, layeredHeadItems, wrapperClassList, headerRef, styleParser };
  }
});
</script>
