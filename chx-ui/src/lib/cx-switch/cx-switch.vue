<template>
  <div
    :class="{
      'cx-switch': true,
      'cx-switch__disabled': disabled
    }"
  >
    <span
      class="cx_mr_4 animate"
      :style="{ color: isActive ? `` : `${inactiveColor}` }"
      v-if="inactiveText"
    >{{ inactiveText }}
    </span>
    <div class="cx-switch__wrapper" :style="style" @click.stop.prevent="clickHandler">
      <div
        :class="{
          'cx-switch__slider': true,
          'is-active': isActive,
          animate: true
        }"
      >
        <i v-if="loading" class="el-icon-loading"/>
        <i v-else :class="`iconfont icon-${isActive ? activeIcon : inactiveIcon}`"/>
      </div>
    </div>
    <span
      class="cx_ml_4 animate"
      :style="{ color: isActive ? `${activeColor}` : `` }"
      v-if="activeText"
    >{{ activeText }}
    </span>
  </div>
</template>
<script lang="ts">
import { isFunction } from 'chx-utils';
import { computed, defineComponent, PropType } from 'vue';

export default defineComponent({
  name: 'CxSwitch',
  props: {
    modelValue: { type: [String, Boolean, Number] },
    size: { type: String as PropType<'large' | 'small'>, default: 'small' },
    activeColor: { type: String, default: '#6BCFA4' },
    inactiveColor: { type: String, default: '#FF7875' },
    width: { type: Number },
    borderColor: { type: String, default: 'white' },
    activeIcon: { type: String, default: 'check-line' },
    inactiveIcon: { type: String, default: 'jianshao' },
    activeText: { type: String },
    inactiveText: { type: String },
    activeValue: { type: [String, Boolean, Number], default: true },
    inactiveValue: { type: [String, Boolean, Number], default: false },
    loading: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
    beforeChange: { type: Function },
  },
  emits: ['update:modelValue', 'change'],
  setup(props, { emit }) {
    const style = computed(() => {
      return {
        '--height': props.size === 'large' ? '22px' : '16px',
        '--width': props.width ? `${ props.width }px` : (props.size === 'large' ? '44px' : '28px'),
        '--active-color': props.activeColor,
        '--inactive-color': props.inactiveColor,
        '--border-color': props.borderColor
      };
    });
    const isActive = computed(() => {
      return props.modelValue === props.activeValue;
    });
    const clickHandler = async () => {
      if (props.loading || props.disabled) return;
      const updateValue = isActive.value ? props.inactiveValue : props.activeValue;
      isFunction(props.beforeChange) && await props.beforeChange(updateValue);
      emit('update:modelValue', updateValue);
      emit('change');
    };
    return {
      style,
      isActive,
      clickHandler
    };
  }
});
</script>
