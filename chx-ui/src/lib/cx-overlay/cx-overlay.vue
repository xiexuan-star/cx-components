<template>
  <div
    @click="$emit('click')"
    :style="{'--zIndex':zIndex}"
    :class="{'cx-overlay':true ,'cx-overlay__disabled':disabled,'cx_of_auto':!lockScroll}"
  >
    <slot/>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';

let zIndex = 2000;

export default defineComponent({
  name: 'CxOverlay',
  props: { disabled: { type: Boolean, default: false }, lockScroll: { type: Boolean, default: false } },
  setup() {
    return { zIndex: zIndex++ };
  }
});
</script>
