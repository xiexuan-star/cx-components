<template>
  <span class="cx-tag" :class="['cx-tag__' + type, 'cx-tag__' + size]">
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
      default: 'primary'
    },
    text: { type: String },
    size: { type: String as PropType<'middle'|'small'>, default: 'small' }
  }
});
</script>
