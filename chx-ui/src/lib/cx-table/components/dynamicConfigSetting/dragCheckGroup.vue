<template>
  <div
    v-for="(list, key) in totalItemMap"
    :key="key"
    style="min-height: 92px"
    class="cx_pos_relative"
    :class="`dynamic-dialog__${side}`"
  >
    <h3 class="cx_pl_12 cx_ptb_8" style="font-weight: 500">{{ key }}</h3>
    <div
      @dragover="onDragOver"
      @dragleave="onDragLeave"
      v-if="!list.length"
      class="dynamic-dialog__placeholder"
    >
      暂无字段
    </div>
    <vue-draggable
      @choose="childAreaDragStart"
      @unchoose="childAreaDragEnd"
      v-model="totalItemMap[key]"
      item-key="id"
      :group="`wrapper-${side}`"
      :component-data="{ class: 'dynamic-dialog__area' }"
      ghostClass="cx_opacity_20"
      :move="onMove"
    >
      <template #item="{element:wrapperElement}">
        <section
          v-if="wrapperElement.children&&wrapperElement.children.length && (!isRight || wrapperElement.checked)"
          class="dynamic-dialog__child__wrapper"
        >
          <header>
            <drag-item
              :side="side"
              :item="wrapperElement"
              drag-target-class="dynamic-drag__item"
              v-model:model-value="wrapperElement.checked"
              :required="wrapperElement.required"
            ></drag-item>
          </header>
          <vue-draggable
            v-model="wrapperElement.children"
            item-key="id"
            :group="wrapperElement.id"
            :component-data="{ class: 'dynamic-dialog__child__area' }"
            ghostClass="cx_opacity_20"
          >
            <template #item="{element}">
              <div class="dynamic-dialog__item" v-if="!isRight || element.checked">
                <drag-item
                  :side="side"
                  :item="element"
                  drag-target-class="dynamic-drag__child__item"
                  v-model:model-value="element.checked"
                  :required="element.required"
                ></drag-item>
              </div>
              <div v-else></div>
            </template>
          </vue-draggable>
        </section>
        <div v-else-if="!isRight || wrapperElement.checked" class="dynamic-dialog__item">
          <drag-item
            :item="wrapperElement"
            drag-target-class="dynamic-drag__item"
            v-model:model-value="wrapperElement.checked"
            :required="wrapperElement.required"
            :side="side"
          ></drag-item>
        </div>
        <div v-else></div>
      </template>
    </vue-draggable>
  </div>
</template>
<script lang="ts">
import { Ref, computed, inject, defineComponent } from 'vue';
import VueDraggable from 'vuedraggable';
import DragItem from 'views/test/dragItem.vue';
import { useDynamicDrag } from './useDynamicDialogConfig';

export default defineComponent({
  name: 'DragCheckGroup',
  props: { side: { type: String, default: 'left' } },
  components: { VueDraggable, DragItem },
  setup(props) {
    const isRight = computed(() => props.side === 'right');
    const totalItemMap = inject<Ref<Record<string, AnyObject[]>>>('totalItemMap')!;

    const {
      onMove,
      childAreaDragEnd,
      childAreaDragStart,
      onDragOver,
      onDragLeave
    } = useDynamicDrag(totalItemMap);
    return {
      onMove,
      childAreaDragEnd,
      childAreaDragStart,
      onDragOver,
      onDragLeave,
      isRight,
      totalItemMap
    };
  }
});
</script>
