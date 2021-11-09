import { amount, isDeepObjectEqual, isHTMLInputElement } from 'chx-utils';
import { App, DirectiveBinding, VNode } from 'vue';

// 正数
function integer(value: string) {
  return Number(value.replace(/[^\d]/g, ''));
}

export function inputHandle(value: string, option: AnyObject | number) {
  let val = value.trim();
  if (val !== '' && typeof option === 'object') {
    const { close } = option;

    if (close) return;

    val = amount({ val, ...option }) + '';
  } else if (val !== '' && typeof option === 'undefined') {
    val = integer(val) + '';
  }
  return val;
}

export function onInput(
  el: HTMLElement,
  ele: HTMLInputElement,
  binding: DirectiveBinding,
  vnode: VNode
) {
  function handle() {
    const oldValue = ele.value;
    let val = ele.value.trim();
    if (val !== '' && typeof binding.value === 'object') {
      const { close } = binding.value;

      if (close) return;

      val = amount({ val, ...binding.value }) + '';
    } else if (val !== '' && typeof binding.value === 'undefined') {
      val = integer(val) + '';
    }

    ele.value = val;
    if (val !== oldValue) {
      const el: any = vnode.el;
      if (isHTMLInputElement(el)) {
        el.value = val;
      }

      vnode.component?.emit('input', ele.value);
    }
  }

  return handle;
}

export default {
  name: 'numberInput',
  beforeMount(el, binding, vnode) {
    const ele = isHTMLInputElement(el) ? el : el.querySelector('input');

    ele && (ele.numberInput = onInput(el, ele, binding, vnode));
    ele?.addEventListener('input', ele.numberInput, true);
  },
  updated(el, binding, vnode) {
    const { oldValue, value } = binding;
    const ele = isHTMLInputElement(el) ? el : el.querySelector('input');
    if (!isDeepObjectEqual(oldValue, value)) {
      ele?.removeEventListener('input', ele.numberInput, true);
      ele && (ele.numberInput = onInput(el, ele, binding, vnode));
      ele?.addEventListener('input', ele.numberInput, true);
    }
  }
};
