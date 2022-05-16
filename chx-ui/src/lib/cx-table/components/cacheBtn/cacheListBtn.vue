<template>
  <TeleportBtn
    content="暂存列表"
    :badge="badge"
    :badge-attrs="{'cache-btn-badge': '',badgeNum: badgeTotal}"
    :click-handler="openDialog"
    :selector="rootProp.cacheListBtn" level="4" dynamicColumn></TeleportBtn>
  <cache-list-dialog ref="dialogRef" @badgeUpdate="$emit('badgeUpdate')"/>
</template>

<script lang="ts">
import { EventBus } from 'chx-utils';
import { computed, defineComponent, inject, onUnmounted, ref } from 'vue';
import { CxDialogActions } from '../../../cx-dialog/types';
import { CxTablePropType } from '../../types';
import CacheListDialog from './cacheListDialog';
import { INJECT_BADGE_KEY } from './constant';
import TeleportBtn from './teleportBtn.vue';

export default defineComponent({
  name: 'CacheListBtn',
  components: { TeleportBtn, CacheListDialog },
  emits: ['badgeUpdate'],
  setup(_, { emit }) {
    const rootProp = inject<CxTablePropType>('rootProp')!;

    const bus = inject<EventBus>('bus');
    const dialogRef = ref<CxDialogActions>();

    bus.on('openCacheListDialog', openDialog);

    onUnmounted(() => {
      bus.off('openCacheListDialog');
    });

    function openDialog() {
      dialogRef.value?.openDialog();
      emit('badgeUpdate');
    }

    const badgeMap = inject(INJECT_BADGE_KEY);
    const badgeTotal = computed(() => {
      return Object.values(badgeMap.value).reduce((res, value) => {
        return res + value;
      }, 0);
    });
    const badge = computed(() => {
      return badgeTotal.value >= 100 ? '99+'
        : badgeTotal.value === 0
          ? undefined
          : badgeTotal.value;
    });
    return {
      rootProp, dialogRef, badgeTotal, openDialog, badge
    };
  }
});
</script>
