<template>
  <div :style="{ position: 'absolute', right, top: 0, zIndex: 1500 }">
    <div class="setting_btn cx_flex_center cx_justify_center">
      <ElTooltip effect="dark" placement="left-start" content="设置表头字段">
        <CxBtn class="cx_p_0" icon="shezhi1" @click="open" :loading="openLoading" />
      </ElTooltip>
    </div>
  </div>
  <ColumnSettingDialog
    ref="dialogRef"
    @submit="submit"
    :dynamicList="[dynamicConfig]"
  ></ColumnSettingDialog>
</template>

<script lang="ts">
import { useLoading } from '@/hooks';
import { computed, defineComponent, inject, ref } from 'vue';
import { CxTableBaseObj } from '../../types';
import ColumnSettingDialog from './dialog.vue';

export default defineComponent({
  name: 'DynamicConfigSettings',
  components: { ColumnSettingDialog },
  props: { dynamicConfig: { type: Object, requred: true } },
  emits: ['submit'],
  setup(_, { emit }) {
    const dialogRef = ref<null | AnyObject>(null);
    const [open, openLoading] = useLoading(async () => {
      await dialogRef.value?.open?.();
    });
    const CxTable = inject<CxTableBaseObj>('CxTable');

    const right = computed(() => {
      if (!CxTable) return 0;
      return CxTable.scrollStore.rightScrollBar ? CxTable.styleStore.CX_TABLE_SCROLL_BAR + 'px' : 0;
    });

    return {
      open,
      openLoading,
      submit: () => {
        emit('submit');
      },
      dialogRef,
      right
    };
  }
});
</script>

<style lang="scss" scoped>
.setting_btn {
  background-color: $table-head-bg-color;
  height: 40px;
  width: 30px;
  font-style: normal;
  font-weight: bold !important;
  font-size: 14px;
  border: 1px solid #d9d9d9 !important;
  box-sizing: border-box;
  button {
    border: 0 !important;
  }
  :deep(.iconfont) {
    margin: 0 !important;
    font-size: 20px !important;
  }
}
</style>
