<template>
  <teleport to="#cx-dialog-teleport-container" :disabled="!appendToBody">
    <transition
      name="dialog-fade"
      @after-enter="afterEnter"
      @after-leave="afterLeave"
      @before-leave="beforeLeave"
    >
      <cx-overlay
        v-show="visible"
        :disabled="!modal"
        :lockScroll='lockScroll'
        @click="closeOnClickModal && openDialog(false)"
      >
        <div class="cx-overlay-dialog">
          <div
            class="cx-dialog"
            :class="{'is-fullscreen':isFullscreen,'cx-dialog__border':!modal}"
            :style="{'--width':renderWidth}"
            v-bind="$attrs"
            @click.stop
          >
            <header class="cx-dialog__header">
              <h2 class="cx-dialog__title cx_fs_18">
                <slot name="title">{{ title }}</slot>
              </h2>
              <div>
                <i
                  v-if="renderFullScreenBtn"
                  :class="`iconfont icon-${isFullscreen?'fullscreen-shrink':'fullscreen-expand'}`"
                  @click="isFullscreen=!isFullscreen"
                  :title="isFullscreen?'退出全屏':'全屏'"
                />
                <i v-if="showClose" class="iconfont icon-close" @click="openDialog(false)" title="关闭弹窗"/>
              </div>
            </header>
            <div class="cx_line cx_mlr_0 cx_w_100p"/>
            <section class="cx-dialog__body" :style="renderBodyStyle" v-if="bodyExist">
              <slot :isFullscreen="isFullscreen"/>
            </section>
            <div class="cx_line cx_mlr_0 cx_w_100p"/>
            <footer class="cx-dialog__footer">
              <slot name="footer">
                <div class="cx_flex_center cx_justify_end">
                  <cx-btn v-if="cancelText" @click="openDialog(false),$emit('cancel')">{{ cancelText }}</cx-btn>
                  <cx-btn
                    level="1"
                    v-if="okText"
                    class="cx_ml_16"
                    :loading="okLoading"
                    :disabled="disabledOk"
                    @click="$emit('ok')"
                  >
                    {{ okText }}
                  </cx-btn>
                </div>
              </slot>
            </footer>
          </div>
        </div>
      </cx-overlay>
    </transition>
  </teleport>
</template>
<script lang="ts">
import CxOverlay from '../cx-overlay/cx-overlay.vue';
import { computed, defineComponent, onMounted, onUnmounted, PropType, ref } from 'vue';

export default defineComponent({
  name: 'CxDialog',
  components: { CxOverlay },
  emits: ['register', 'close', 'closed', 'open', 'opened', 'ok', 'cancel'],
  props: {
    cancelText: { type: String, default: '取消', },
    okText: { type: String, default: '确认', },
    disabledOk: { type: Boolean, default: false },
    okLoading: { type: Boolean, default: false },
    title: { type: String },
    width: { type: [String, Number], default: '50%' },
    size: { type: String as PropType<'large' | 'middle' | 'small' | 'fullscreen'> },
    openDelay: { type: Number, default: 0 },
    closeDelay: { type: Number, default: 0 },
    closeOnClickModal: { type: Boolean, default: false },
    showFullScreen: { type: Boolean, default: false, },
    closeOnPressEscape: { type: Boolean, default: true },
    showClose: { type: Boolean, default: true },
    beforeClose: { type: Function },
    destroyOnClose: { type: Boolean, default: false },
    appendToBody: { type: Boolean, default: false },
    modal: { type: Boolean, default: true },
    lockScroll: { type: Boolean, default: false },
    bodyStyle: { type: Object, default: () => ({}) }
  },
  setup(props, { expose, emit }) {
    const visible = ref(false);
    const bodyExist = ref(false);
    const isFullscreen = ref(false);

    const renderBodyStyle = computed(() => {
      return Object.assign({}, props.bodyStyle, {
        height: (isFullscreen.value || props.size === 'fullscreen') ? 'calc(100vh - 283px)' : ''
      });
    });

    const renderWidth = computed(() => {
      if (isFullscreen.value) {
        return 'calc(100vw - 180px)';
      }
      switch (props.size) {
        case 'large':
          return '960px';
        case 'middle':
          return '760px';
        case 'small':
          return '512px';
        case 'fullscreen':
          return 'calc(100vw - 180px)';
      }
      return props.width;
    });

    const renderFullScreenBtn = computed(() => {
      return props.size === 'large' || props.showFullScreen;
    });

    const setVisible = (v = true) => {
      if (v) {
        visible.value = v;
        bodyExist.value = true;
        emit('open');
      } else {
        visible.value = v;
      }
    };

    const openDialog = (v = true) => {
      props[v ? 'openDelay' : 'closeDelay'] > 0 ? setTimeout(() => setVisible(v), props.openDelay) : setVisible(v);
    };

    function afterEnter() {
      emit('opened');
    }

    function afterLeave() {
      emit('closed');
      bodyExist.value = !props.destroyOnClose;
    }

    function beforeLeave() {
      emit('close');
    }

    const actions = {
      openDialog: (v = true) => {
        if (!v) {
          props.beforeClose ? props.beforeClose(() => {
            openDialog(v);
          }) : openDialog(v);
        }
        openDialog(v);
      }
    };

    const keydownEvent = (e: KeyboardEvent) => {
      (e.key === 'Escape' && visible.value && props.closeOnPressEscape) && openDialog(false);
    };

    onMounted(() => {
      emit('register', actions);
      document.body.addEventListener('keydown', keydownEvent, true);
    });

    onUnmounted(() => {
      document.body.removeEventListener('keydown', keydownEvent, true);
    });

    expose(actions);

    return {
      visible,
      isFullscreen,
      renderBodyStyle,
      openDialog,
      afterEnter,
      afterLeave,
      beforeLeave,
      bodyExist,
      renderWidth,
      renderFullScreenBtn
    };
  }
});
</script>
