<template>
  <div :style="{ position: 'absolute', right, top: 0, zIndex: 1500 }">
    <div class="setting_btn cx_flex_center cx_justify_center">
      <cx-btn
        v-uni-popper="{ placement: 'left-start', text: '设置表头字段' }"
        class="cx_p_0"
        icon="shezhi1"
        @click="open"
        :loading="openLoading"
      />
    </div>
    <ColumnSettingDialog
      ref="dialogRef"
      @submit="submit"
      :dynamicList="[dynamicConfig]"
    ></ColumnSettingDialog>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, inject, ref } from 'vue';
import { loadingDecorator } from 'chx-utils';
import { CxTableBaseObj } from '../../types';
import ColumnSettingDialog from './dialog.vue';

export default defineComponent({
  name: 'DynamicConfigSettings',
  components: { ColumnSettingDialog },
  props: {
    dynamicConfig: {
      type: Object,
      default: () => ({
        moduleType: 41,
        businessType: 89,
        priceType: 1,
        modelType: 5
      })
    }
  },
  emits: ['submit'],
  setup(_, { emit }) {
    const dialogRef = ref<null | AnyObject>(null);
    const [open, openLoading] = loadingDecorator(async () => {
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
