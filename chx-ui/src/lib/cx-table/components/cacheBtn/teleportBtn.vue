<template>
  <Teleport v-if="rendered" :to="selector">
    <cx-btn v-bind="$attrs" :badge-attrs="badgeAttrs" :badge="badge" :loading="loading" @click="onClick" />
  </Teleport>
</template>

<script lang="ts">
import { defineComponent, onMounted, PropType, ref } from 'vue';
import { CxBtn } from '../../../index';

export default defineComponent({
  name: 'TeleportBtn',
  components: { CxBtn },
  props: {
    badge: { type: Number },
    badgeAttrs: { type: Object as PropType<AnyObject> },
    selector: { type: String, required: true },
    clickHandler: { type: Function },
  },
  setup(props) {
    const onClick = async () => {
      loading.value = true;
      try {
        await props.clickHandler?.();
        loading.value = false;
      } catch {
        loading.value = false;
      }
    };

    const loading = ref(false);
    const rendered = ref(false);
    // 延迟加载, 因为一般情况teleport的目标元素是在html文件中写死的
    // 但此处的目标元素大概率是由vue组件渲染的
    onMounted(() => {
      rendered.value = true;
    });
    return { onClick, loading, rendered };
  }
});
</script>
