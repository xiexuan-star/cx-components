<template>
  <el-dialog
    :customClass="fullscreenRef ? 'basic-dialog basic-dialog_fullscreen' : 'basic-dialog'"
    :modelValue="dialogVisible"
    @close="openDialog(false)"
    :fullscreen="fullscreenRef"
    v-bind="{ ...dialogProps, ...$attrs }"
  >
    <template #title>
      <div class="basic-dialog_header">
        <p class="basic-dialog_title">
          <slot name="title">{{ title }}</slot>
        </p>
        <el-button v-if="fullscreenRef" type="text" @click="handleFullScreen(false)">
          <i class="iconfont icon-quanpingsuoxiao"></i>
        </el-button>
        <el-button v-else type="text" @click="handleFullScreen(true)">
          <i class="el-icon-full-screen"></i>
        </el-button>
      </div>
    </template>
    <template #footer>
      <slot name="footer">
        <div class="basic-dialog_footer">
          <div class="baisc-dialog_prefix">
            <slot name="footerPrefix"></slot>
          </div>
          <div class="baisc-dialog_btns">
            <cx-btn v-if="cancelText" @click="handleCancel" class="cx_mr_16">
              {{ cancelText }}
            </cx-btn>
            <cx-btn
              level="1"
              v-if="okText"
              :disabled="disabledOk"
              :loading="okLoading"
              @click="emit('ok', handleCancel)"
            >
              {{ okText }}
            </cx-btn>
          </div>
        </div>
      </slot>
    </template>
    <template #default>
      <div class="basic-dialog_content">
        <slot name="default"></slot>
      </div>
    </template>
  </el-dialog>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, PropType, ref } from 'vue'
import { CxDialogActions } from './types'
import { omit } from '../../utils'

export default defineComponent({
  name: 'CxDialog',
  props: {
    title: String as PropType<string>,
    isFullScreen: {
      type: Boolean as PropType<boolean>,
      default: false,
    },
    cancelText: {
      type: String as PropType<string>,
      default: '取消',
    },
    okText: {
      type: String as PropType<string>,
      default: '确认',
    },
    disabledOk: { type: Boolean, default: false },
    okLoading: { type: Boolean, default: false },
  },
  emits: ['register', 'cancel', 'ok', 'fullscreen', 'open'],
  setup(props, { emit, expose }) {
    const dialogVisible = ref(false)
    const fullscreenRef = ref(false)

    // 取消按钮回调
    function handleCancel() {
      dialogVisible.value = false
      emit('cancel')
    }

    // 进入全屏
    function handleFullScreen(val: boolean) {
      fullscreenRef.value = val
      emit('fullscreen', val)
    }

    function openDialog(visible = true) {
      dialogVisible.value = !!visible
      visible && emit('open')
    }

    expose({
      openDialog,
    })

    const dialogActions: CxDialogActions = {
      openDialog,
    }

    onMounted(() => {
      emit('register', dialogActions)
    })

    const dialogProps = computed(() => {
      return omit(props, ['cancelText', 'isFullScreen', 'okText', 'okLoading', 'disabledOk'])
    })

    return {
      openDialog,
      fullscreenRef,
      dialogVisible,
      handleCancel,
      dialogProps,
      handleFullScreen,
    }
  },
})
</script>

<style lang="scss" scoped>
.basic-dialog {
  position: relative;
  border-radius: 4px !important;

  .el-dialog__header,
  .el-dialog__footer,
  .el-dialog__body {
    padding: 0;
  }

  .el-dialog__body {
    height: calc(100% - 45px);
  }

  .el-dialog__headerbtn {
    top: 14px;
    right: 16px;
  }

  &_header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 44px;
    padding-left: 16px;
    padding-right: 48px;
    border-bottom: 1px solid #f0f0f0;
    .el-button--text {
      color: #000;
      &:hover {
        color: blue;
      }
    }
  }
  &_title {
    font-size: 18px;
    font-weight: 500;
    color: #303133;
  }

  &_content {
    height: 100%;
    overflow-y: auto;
  }

  &_footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 8px 16px 16px;
    border-top: 1px solid #f0f0f0;
    .basic-dialog_btns {
      display: flex;
    }
  }

  &.basic-dialog_fullscreen {
    padding-bottom: 57px;
    .basic-dialog_footer {
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
    }
  }
}
</style>
