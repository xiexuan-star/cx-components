<template>
  <cx-dialog
    @register="register"
    :title="header"
    append-to-body
    size="large"
  >
    <template #default>
      <section
        style="height:calc(100vh - 283px);max-height:calc(100vh - 283px)"
        class="cx_dp_flex cx_flex_d_column"
      >
        <div>
          <div class="cx_flex_center cx_justify_between">
            <div class="cx_ptb_10 cx_pl_16 cx_flex_1">全部属性({{ rawList.length }})</div>
            <div class="cx_ptb_10 cx_w_250 cx_pr_16">已选属性({{ checkedList.length }})</div>
          </div>
          <div class="cx_line cx_w_100p cx_m_0"/>
        </div>
        <div class="cx_dp_flex cx_justify_between cx_flex_1" v-loading="openLoading">
          <section
            class="cx_flex_1 cx_br cx_p_16 cx_of_auto cx_pos_relative cx_border_box"
            style="max-height: calc(100vh - 320px)"
          >
            <drag-check-group/>
          </section>
          <section
            style="max-height: calc(100vh - 320px)"
            class="cx_of_auto cx_w_200 cx_p_16 cx_h_100p cx_border_box"
          >
            <drag-check-group side="right"/>
          </section>
        </div>
      </section>
    </template>
   <template #footer>
     <div class="cx_flex_center cx_justify_between">
       <cx-btn @click="preview">预览</cx-btn>
       <section>
         <cx-btn @click="openDialog(false)">取消</cx-btn>
         <cx-btn
           level="1"
           class="cx_ml_16"
           :loading="submitLoading"
           @click="submitData"
         >
           确认
         </cx-btn>
       </section>
     </div>
   </template>
  </cx-dialog>
  <cx-dialog @register="registerPreview" title="预览" append-to-body size="large" okText="">
    <cx-table class="cx_m_16" close-on-click-modal :empty-limit="5" :table-config="previewConfig"/>
  </cx-dialog>
</template>

<script lang="ts">
import DragCheckGroup from './dragCheckGroup.vue';
import { PropType, defineComponent, computed, ref, watch, provide, nextTick } from 'vue';
import { loadingDecorator } from 'chx-utils';
import { useCxDialog } from '../../../cx-dialog/useCxDialog';
import { useCxTable } from '../../hooks';
import { useDynamicConfigDialog } from './useDynamicDialogConfig';
import { CxBtn, CxDialog, CxTable } from '../../../index';

export default defineComponent({
  props: {
    dynamicList: { type: Array as PropType<AnyObject[]>, required: true }
  },
  components: {
    DragCheckGroup, CxDialog, CxBtn, CxTable
  },
  emits: ['submit'],
  setup(props, { emit, expose }) {
    const [register, { openDialog }] = useCxDialog();
    const { DYNAMIC_BUSINESS_TYPE } = useCxTable().getContext().dynamicType;

    const { rawList, totalItemMap, getData, submit, checkedList, getCheckedTree } = useDynamicConfigDialog();
    provide('totalItemMap', totalItemMap);
    const activeTab = ref(0);
    const activeDynamicConfig = computed(() => {
      return props.dynamicList[activeTab.value];
    });
    const tabOptionList = computed(() => {
      return props.dynamicList.map((config: AnyObject, index: number) => {
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
      if (props.dynamicList.length < 2) {
        openDialog(false);
      }
      emit('submit', activeDynamicConfig.value);
    });

    const header = computed(() => {
      return `设置${ DYNAMIC_BUSINESS_TYPE[activeDynamicConfig.value?.dataType] ?? '' }显示字段`;
    });
    const [registerPreview, { openDialog: openPreviewDialog }] = useCxDialog();
    const previewConfig = ref({
      items: []
    });
    const preview = async () => {
      previewConfig.value = { items: getCheckedTree() };
      await nextTick();
      openPreviewDialog();
    };
    return {
      header,
      preview,
      previewConfig,
      registerPreview,
      submitData,
      submitLoading,
      activeTab,
      fetchList,
      open,
      openLoading,
      tabOptionList,
      activeDynamicConfig,
      openDialog,
      rawList,
      totalItemMap,
      getData,
      submit,
      checkedList,
      register
    };
  }
});
</script>
