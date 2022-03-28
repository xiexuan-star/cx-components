<template>
  <tr
    :rowid="rowid"
    :class="{'is-active':isActive,'cx-table__row__hover':isHover}"
  >
    <slot/>
  </tr>
</template>
<script lang="ts">
import { defineComponent, inject, PropType, ref, Ref, watchEffect } from 'vue';
import { CxTableBaseObj } from '../../types';

export default defineComponent({
  name: 'CxTableRow',
  props: {
    rowData: { type: Object as PropType<AnyObject>, default: () => ({}) },
    rowIndex: { type: Number, default: -1 },
    activedRow: { type: Array as PropType<number[]>, default: () => [] },
    sum: { type: Boolean, default: false },
    rowid: { type: [String, Number], default: '' }
  },
  setup(props) {
    const selectConfig = inject<AnyObject>('selectConfig', { selectItem: [] });
    const radioValue = inject<Ref<number>>('radioValue', ref(-1));
    const CxTable = inject<CxTableBaseObj>('CxTable')!;

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
    return { isActive, isHover };
  }
});
</script>
