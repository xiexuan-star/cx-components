import { computed, createVNode, defineComponent } from 'vue';
import { CxBtn } from '../../..';
import { PATCH_FLAG } from '../../constant';

export default defineComponent({
  name: 'DynamicFilterBtn',
  props: { states: { type: Object, required: true } },
  emits: ['click'],
  setup(props, { emit }) {
    const color = computed(() => {
      return props.states?.visible ? '#0084ff' : 'rgba(0,0,0,.85)';
    });

    return (_: any, cache: any[]) => {
      return createVNode(
        CxBtn,
        {
          onClick: cache[0] || (cache[0] = () => emit('click')),
          icon: 'filtershaixuan',
          content: '筛选',
          style: { color: color.value, borderColor: color.value }
        },
        null,
        PATCH_FLAG.STYLE | PATCH_FLAG.FULL_PROPS
      );
    };
  }
});
