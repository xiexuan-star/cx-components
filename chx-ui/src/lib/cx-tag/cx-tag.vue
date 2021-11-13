<template>
  <span class="cx-tag" :class="['cx-tag--' + type, 'cx-tag--' + size]">
    <slot>{{ text }}</slot>
  </span>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

export default defineComponent({
  name: 'CxTag',
  props: {
    type: {
      type: String as PropType<'primary' | 'success' | 'danger' | 'info' | 'red' | 'green' | 'blue' | 'cyan' | 'geekblue'>,
      default: 'parimary'
    },
    text: { type: String },
    size: { type: String as PropType<'mini' | 'small'>, default: 'mini' }
  }
});
</script>
