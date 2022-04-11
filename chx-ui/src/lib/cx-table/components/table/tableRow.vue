<template>
  <tr
    :rowid="rowid"
    :class="{'is-active':isActive,'cx-table__row__hover':isHover}"
  >
    <cx-table-cell :empty="empty" :sum="sum" v-for="col in renderCellList" :row-data="rowData"
                   :row-index="rowIndex+indexPrepend" :column="col"
                   :key="col._colid" />
  </tr>
</template>
<script lang="ts">
import { isFunction } from 'chx-utils';
import { computed, defineComponent, inject, onMounted, PropType, ref, Ref, watchEffect } from 'vue';
import { CxBroadcast } from '../../hooks';
import { CxTableBaseObj } from '../../types';
import { getFunctionAttrs } from '../../utils';
import CxTableCell from './cell';

export default defineComponent({
  name: 'CxTableRow',
  components: { CxTableCell },
  props: {
    rowData: { type: Object as PropType<AnyObject>, default: () => ({}) },
    rowIndex: { type: Number, default: -1 },
    activedRow: { type: Array as PropType<number[]>, default: () => [] },
    indexPrepend: { type: Number },
    sum: { type: Boolean, default: false },
    empty: { type: Boolean, default: false },
    fixed: { type: String, default: '' },
    rowid: { type: [String, Number], default: '' }
  },
  setup(props) {
    const selectConfig = inject<AnyObject>('selectConfig', { selectItem: [] });
    const radioValue = inject<Ref<number>>('radioValue', ref(-1));
    const CxTable = inject<CxTableBaseObj>('CxTable')!;
    const broadcast = inject<CxBroadcast>('broadcast')!;

    const isHover = ref(false);
    watchEffect(() => {
      isHover.value = props.rowid === CxTable.hoveringRowid;
    });

    const isActive = ref(false);
    watchEffect(() => {
      isActive.value =
        selectConfig.selectItem?.[props.rowIndex] ||
        radioValue.value === props.rowIndex ||
        props.activedRow?.includes(props.rowIndex);
    });
    onMounted(() => {
      CxTable.flatColumns.forEach(col => {
        const attrs = getFunctionAttrs(props.rowData, props.rowIndex, col.control?.attrs);
        const broadcastRegister = attrs?.broadcastRegister;
        if (broadcastRegister && isFunction(broadcastRegister)) {
          broadcastRegister((prop, cb) => broadcast.registListener(prop, props.rowData, cb));
        }
      });
    });
    const renderCellList = computed(() => {
      return CxTable.flatColumns.filter(col => {
        return !(props.fixed && props.fixed !== 'bottom' && col.fixed !== props.fixed);
      });
    });
    return { isActive, isHover, CxTable, renderCellList };
  }
});
</script>
