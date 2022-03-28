<template>
  <cx-table-head
    v-if="fixed!=='bottom'"
    :class-list="classList"
    :style-property="style"
    :fixed="fixed"
    :need-sticky-header="needStickyHeader"/>
  <cx-table-body
    v-if="fixed!=='top'"
    :table-data="tableData"
    :class="classList"
    :fixed="fixed"
    :style="style"/>
</template>
<script lang="ts">
import { defineComponent, inject, PropType } from 'vue';
import { useTableClass, useTableStyle } from '../../hooks';
import { CxTableBaseObj } from '../../types';
import CxTableBody from './tableBody';

import CxTableHead from './tableHead.vue';

export default defineComponent({
  name: 'CxTableContent',
  components: { CxTableBody, CxTableHead },
  props: {
    fixed: { type: String, default: '' },
    tableData: { type: Array as PropType<AnyObject[]>, default: () => [] },
    needStickyHeader: { type: Boolean, default: false },
  },
  setup(props) {
    const CxTable = inject<CxTableBaseObj>('CxTable')!;

    const style = useTableStyle(props, CxTable, 'table');

    const classList = useTableClass(props, CxTable);
    return { classList, style };
  }
})
;
</script>
