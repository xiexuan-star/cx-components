<template>
  <cx-dialog
    :okLoading="submitLoading"
    size="fullscreen"
    @register="register"
    :title="header"
    @ok="submitData"
    append-to-body
  >
    <template #default="{isFullscreen}">
      <cx-tab
        class="cx_plr_16"
        level="2"
        v-if="tabOptionList && tabOptionList.length > 1"
        :options="tabOptionList"
        v-model="activeTab"
      />
      <div>
        <div class="cx_flex_center cx_justify_between">
          <div class="cx_ptb_12 cx_pl_16 cx_flex_1">可选属性</div>
          <div class="cx_ptb_12 cx_w_250">已选属性</div>
        </div>
        <div class="cx_line cx_w_100p cx_m_0"></div>
      </div>
      <div class="cx_dp_flex cx_justify_between" v-loading="openLoading">
        <section class="cx_flex_1 cx_br cx_p_16"
                 :style="{overflow: 'auto', position: 'relative',height:isFullscreen?'calc(100vh - 181px)':'500px'}">
          <div v-for="(item, key) in departmentMap" :key="key" class="cx_mtb_5">
            <h3 class="cx_fs_16 cx_pl_12 cx_ptb_8" style="font-weight: 500">{{ key }}</h3>
            <div v-for="option in item" :key="option.id" class="cx_dp_ib cx_mtb_16 cx_w_130 cx_pl_12">
              <el-checkbox
                class="cx_w_100p"
                :model-value="checkedList.includes(option.id)"
                @update:modelValue="val => updateCheckedList(val, option.id)"
                :disabled="option.irrevocable"
                :label="option.label"
                :value="option.id"
              >
                <cx-ellipsis style="width: 108px" :content="option.label"/>
              </el-checkbox>
            </div>
            <div class="cx_line cx_m_0 cx_w_100p cx_mtb_6"></div>
          </div>
        </section>
        <section class="cx_w_230 cx_p_16" :style="{overflow: 'auto',height:isFullscreen?'calc(100vh - 181px)':'500px'}">
          <div v-for="(_, key, index) in listMap" :key="key">
            <div class="cx_line cx_mb_10 cx_mt_14" v-if="index !== 0"></div>
            <h3 class="cx_mb_8 cx_fs_14">{{ key }}</h3>
            <Draggable
              v-model="listMap[key]"
              item-key="id"
              group="list"
              tag="transition-group"
              :component-data="{ tag: 'ul', name: 'flip-list', type: 'transition' }"
              ghostClass="cx_opacity_20"
              :move="onMove"
            >
              <template #item="{ element }">
                <li class="cx_fs_14 cx_ptb_9 hover_active cx_cursor_move">
                  <i class="iconfont icon-tuodong1 cx_mr_8"></i>{{ element.label }}
                </li>
              </template>
            </Draggable>
          </div>
        </section>
      </div>
    </template>
  </cx-dialog>
</template>

<script lang="ts">
import CxEllipsis from '../../../cx-ellipsis/cx-ellipsis.vue';
import { useDynamicConfigDialog } from './useDynamicConfigDialog';
import { App, computed, defineComponent, PropType, ref, watch } from 'vue';
import Draggable from 'vuedraggable';
import CxDialog from '../../../cx-dialog/index';
import { loadingDecorator } from 'chx-utils';
import { useCxDialog } from '../../../cx-dialog/useCxDialog';
import { useCxTable } from '../../hooks';
import { AnyObject } from 'cx-store/dist/statistic/types';

export default defineComponent({
  name: 'ColumnSettingDialog',
  components: { CxEllipsis, Draggable, CxDialog },
  props: { dynamicList: { type: Array as PropType<AnyObject[]>, required: true } },
  emits: ['submit'],
  install(app: App) {
    app.component('columnSettingDialog', this);
  },
  setup(props, { emit, expose }) {
    const [register, { openDialog }] = useCxDialog();
    const { DYNAMIC_BUSINESS_TYPE } = useCxTable().getContext().dynamicType;

    const {
      totalList,
      departmentMap,
      listMap,
      checkedList,
      updateCheckedList,
      getData,
      submit,
      getDisabledKey
    } = useDynamicConfigDialog();

    const activeTab = ref(0);
    const activeDynamicConfig = computed(() => {
      return props.dynamicList[activeTab.value];
    });
    const tabOptionList = computed(() => {
      return props.dynamicList?.map((config: AnyObject, index: number) => {
        return {
          id: index,
          name: DYNAMIC_BUSINESS_TYPE[config?.businessType ?? '']
        };
      });
    });

    const [open, openLoading] = loadingDecorator(async () => {
      activeTab.value = 0;
      await fetchList();
    });

    const fetchList = async () => {
      if (!activeDynamicConfig.value) return;
      await getData(activeDynamicConfig.value);
      openDialog();
    };

    watch(activeTab, fetchList);

    expose({ open });

    const [submitData, submitLoading] = loadingDecorator(async () => {
      if (!activeDynamicConfig.value) return;
      await submit(activeDynamicConfig.value);
      if (props.dynamicList?.length < 2) {
        openDialog(false);
      }
      emit('submit', activeDynamicConfig.value);
    });

    const header = computed(() => {
      return `设置${ DYNAMIC_BUSINESS_TYPE[activeDynamicConfig.value?.dataType] ?? '' }显示字段`;
    });

    const onMove = (e: AnyObject) => {
      const { relatedContext, draggedContext } = e;
      const targetItem = relatedContext?.element;
      const currentItem = draggedContext?.element;

      const targetItemKey = getDisabledKey(targetItem);
      const currentItemKey = getDisabledKey(currentItem);

      return (
        !targetItemKey || targetItemKey === currentItemKey || listMap[targetItemKey]?.length < 3
      );
    };

    return {
      totalList,
      checkedList,
      updateCheckedList,
      listMap,
      tabOptionList,
      departmentMap,
      register,
      submitData,
      activeTab,
      submitLoading,
      open,
      openLoading,
      header,
      onMove
    };
  }
});
</script>

<style lang="scss" scoped>
.hover_active:hover {
  background-color: #f0f5ff;
}
</style>
