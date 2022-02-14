import { nextTimeout } from 'chx-utils';
import { defineComponent, nextTick, onBeforeUnmount, onMounted, ref, watch, watchEffect } from 'vue';
import { createVNode, VNode } from 'vue';
import { CxFormControl } from './constructor';
import { CxForm } from './constructor';
import { CxFormItem } from './constructor';
import { CxFormProps } from './props';
import { CxFormItemConfig } from './types';

export default defineComponent({
  props: CxFormProps,
  name: 'CxForm',
  emits: ['change', 'register', 'close'],
  setup(props, { slots, emit, expose }) {
    function renderControl(itemConfig: CxFormItemConfig) {
      return new CxFormControl(props.form, itemConfig, props, emit).addSlots(slots).render();
    }

    function renderFormItem(itemConfig: CxFormItemConfig) {
      const slot = { ...slots, default: () => [renderControl(itemConfig)] };
      return new CxFormItem(itemConfig).addSlots(slot).render();
    }

    let instance: CxForm = null;

    function renderForm() {
      const slot = () =>
        props.items?.reduce((res, itemConfig) => {
          !itemConfig.hide && res.push(renderFormItem(itemConfig));
          return res;
        }, [] as VNode[]);

      instance = new CxForm(props).addSlots(slot);
      emit('register', { props, ref: instance.getFormRef() });
      return instance.render();
    }

    expose({
      trigger: (prop: string) => {
        emit('change', { prop, val: props.form[prop], form: props.form });
      },
    });

    const wrapperRef = ref<HTMLElement | null>(null);
    let cancelEffect: any = null;
    const column = ref(0);
    const renderWidth = ref(props.maxWidth);
    onMounted(async () => {
      await nextTick();
      cancelEffect = watch(() => props.items, updateRows, { immediate: true, deep: true });
      setTimeout(()=>{
        instance.getFormRef().value?.clearValidate();
      })
      window.addEventListener('resize', updateRows);
    });
    onBeforeUnmount(() => {
      window.removeEventListener('resize', updateRows);
      cancelEffect?.();
    });

    async function updateRows() {
      await nextTick();
      const wrapper = wrapperRef.value;
      if (!wrapper) return;
      const children = props.items;
      const length = children.reduce((res, item) => {
        if (item.hide) return res;
        return res + (item.dateRange ? 2 : (+item.span || 1));
      }, 0);
      if (!length) return;
      // 先按有滚动条处理
      const width = wrapper.clientWidth - 8;
      const floatCapacity = width / props.minWidth;
      const capacity = +floatCapacity.toFixed(0);
      const rowNum = parseInt(length / capacity + 1 + '');
      column.value = rowNum === 1 ? Math.min(length, capacity) : parseInt(floatCapacity + '');
      renderWidth.value = Math.min(parseInt(width / column.value + ''), props.maxWidth) - props.marginRigth;
    }

    return () => {
      return createVNode('div', {
        class: 'cx-form',
        ref: wrapperRef,
        style: `--render-width:${ renderWidth.value };--margin-right:${ props.marginRigth }`
      }, [renderForm()]);
    };
  },
});
