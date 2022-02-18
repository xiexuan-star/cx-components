<template>
  <div class="cx_ellipsis" :title="content">{{ content }}</div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({ name: 'CxEllipsis', props: { content: { type: [String, Number], default: '' } } });
</script>
