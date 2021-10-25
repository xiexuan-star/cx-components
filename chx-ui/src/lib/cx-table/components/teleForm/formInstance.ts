import { createVNode, defineComponent } from 'vue';
import * as R from 'ramda';
import { PATCH_FLAG } from '../../constant';
import { CxForm } from '../../..';

export default defineComponent({
  name: 'TeleFormInstance',
  emits: ['change', 'close'],
  props: {
    form: { type: Object, required: true },
    items: { type: Array, required: true },
    states: { type: Object, required: true }
  },
  setup(props, { emit, slots }) {
    const curryEmit = R.curryN(2, emit);

    return (_: any, cache: any[]) => {
      return createVNode(
        'div',
        { style: { display: props.states?.visible ?? true ? 'block' : 'none' } },
        [
          createVNode(
            CxForm,
            {
              form: props.form,
              items: props.items,
              formAttrs: { labelPosition: 'top', labelSuffix: '' },
              onChange: cache[0] || (cache[0] = curryEmit('change')),
              onClose: cache[1] || (cache[1] = curryEmit('close'))
            },
            { add: () => [slots.add?.() ?? ''] },
            PATCH_FLAG.PROPS,
            ['form', 'items']
          )
        ],
        PATCH_FLAG.STYLE
      );
    };
  }
});
