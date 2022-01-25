import { defineComponent } from 'vue';

export default defineComponent({
  name: 'CxDescriptionItem',
  props: {
    label: String,
    type: { type: String, default: 'ellipsis' },
    ratio: { type: Number, default: 0.6 },
    span: { type: Number, default: 1 }
  }
});
