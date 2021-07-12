import { defineComponent } from 'vue';
import { createVNode, VNode } from 'vue';
import { CxFormControl } from './constructor';
import { CxForm } from './constructor';
import { CxFormItem } from './constructor';
import { CxFormProps } from './props';
import { CxFormItemConfig } from './types';

export default defineComponent({
  props: CxFormProps,
  name: 'CxForm',
  emits: ['change', 'register'],
  setup(props, { slots, emit, expose }) {
    function renderControl(itemConfig: CxFormItemConfig) {
      return new CxFormControl(props.form, itemConfig).addSlots(slots).render();
    }

    function renderFormItem(itemConfig: CxFormItemConfig) {
      const slot = { ...slots, default: () => [renderControl(itemConfig)] };
      return new CxFormItem(itemConfig).addSlots(slot).render();
    }

    function renderForm() {
      const slot = () =>
        props.items?.reduce((res, itemConfig) => {
          !itemConfig.hide && res.push(renderFormItem(itemConfig));
          return res;
        }, [] as VNode[]);

      const instance = new CxForm(props).addSlots(slot);
      emit('register', { props, ref: instance.getFormRef() });
      return instance.render();
    }

    expose({
      trigger: (prop: string) => {
        emit('change', { prop, val: props.form[prop] });
      }
    });

    return () => {
      return createVNode('div', { name: 'cx-form' }, [renderForm()]);
    };
  }
});
