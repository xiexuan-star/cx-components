<template>
  <div class="cx_h_150">
    <table class="cx-table__empty">
      <tbody>
      <tr>
        <td :rowspan="rowspan">
          <empty/>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent, inject } from 'vue';
import { CxTableBaseObj } from '../../types';
import Empty from '../empty.vue';

export default defineComponent({
  name: 'CxTableEmpty',
  components: { Empty },
  setup() {
    const CxTable = inject<CxTableBaseObj>('CxTable')!;
    const rowspan = computed(() => {
      return CxTable.flatColumns.length;
    });
    return { rowspan };
  }
});
</script>
