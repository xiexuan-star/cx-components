<template>
  <template v-if="side === 'left'">
    <i class="iconfont icon-tuodong1 cx_mr_4" :class="dragTargetClass"/>
    <el-checkbox
      :model-value="modelValue"
      @update:modelValue="$emit('update:modelValue', $event)"
      :disabled="item.irrevocable"
      :label="item.label"
      :value="item.id"
    >
      <div class="cx_flex_center dynamic-drag__inner__item" style="width: 113px">
        <cx-ellipsis :content="item.label"/>
        <i v-if="required" class="red">*</i>
      </div>
    </el-checkbox>
  </template>
  <template v-else>
    <section class="cx_cursor_move cx_flex_center cx_pos_relative cx_w_100p">
        <i class="iconfont icon-tuodong1 cx_mr_4"/>
        <cx-ellipsis :content="item.label"/>
        <i class="red" v-if="required">*</i>
      <i @click="$emit('update:modelValue', false)" class="cx_cursor_pointer cx_pos_absolute cx_right_5" >x</i>
    </section>
  </template>
</template>
<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { CxEllipsis } from '../../../index';

export default defineComponent({
  name: 'DragItem',
  components: { CxEllipsis },
  props: {
    modelValue: { type: [Boolean] },
    side: { type: String, default: 'left' },
    item: { type: Object as PropType<AnyObject>, required: true },
    dragTargetClass: { type: String, required: true },
    required: { type: Boolean, default: false }
  }
});
</script>
