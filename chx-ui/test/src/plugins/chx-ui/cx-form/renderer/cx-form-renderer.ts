import { parseTime } from '@/utils';
import { isFunction } from '@/utils/is';
import { cxFormRendererConfig } from './config';
import {
  ElCheckbox,
  ElDatePicker,
  ElForm,
  ElFormItem,
  ElInput,
  ElRadio,
  ElSwitch
} from 'element-plus';
import {
  createBlock,
  createCommentVNode,
  createVNode,
  Fragment,
  openBlock,
  resolveComponent
} from 'vue';
import { PATCH_FLAG } from '@/constant/patchFlag';
import { CxFormAdaptor } from '../../../../../../src';

class CxFormRender {
  renderOptions(options: AnyObject) {
    const comp = resolveComponent('ElOption');
    if (!comp) return createCommentVNode('v-if_option', true);
    return (
      openBlock(true),
      createBlock(
        Fragment,
        null,
        options?.map((option: any) =>
          createVNode(comp, { label: option.name, value: option.id }, null, PATCH_FLAG.PROPS, [
            'label',
            'value'
          ])
        ) ?? [],
        PATCH_FLAG.UNKEYED_FRAGMENT
      )
    );
  }
  renderSearchIcon(getParam?: Func<any>) {
    return createVNode('i', {
      class: 'iconfont icon-sousuo cx_clickable',
      onClick: () => {
        // isFunction(emit) && emit('change', getParam?.());
      }
    });
  }
}

export const cxFormRender = (function() {
  let _instance: null | CxFormRender = null;
  return function() {
    if (!_instance) {
      _instance = new CxFormRender();
    }
    return _instance as CxFormRender;
  };
})();

export const cxFormRendererMap: Record<string, [any, CxFormAdaptor]> = {
  form: [
    ElForm,
    function() {
      //
    }
  ],
  formItem: [
    ElFormItem,
    function() {
      //
    }
  ],
  textarea: [
    ElInput,
    function() {
      const { textarea, label } = this.config ?? {};
      Reflect.set(this.attrs, 'placeholder', `请输入${label ?? ''}`);
      Object.assign(this.attrs, textarea);
      Reflect.set(this.attrs, 'type', 'textarea');
    }
  ],
  // select: [
  //   // ElSelect,
  //   // function() {
  //   //   const { select, label } = this.config ?? {};
  //   //   Reflect.set(this.attrs, 'placeholder', `请选择${label ?? ''}`);
  //   //   Reflect.set(this.slots, 'default', () => {
  //   //     return cxFormRender().renderOptions(select?.options ?? []);
  //   //   });
  //   //   Object.assign(this.attrs, select);
  //   //   isFunction(select?.options) &&
  //   //     Reflect.set(this.attrs, 'options', select?.options({ form: this.form }));
  //   // }
  //   // SelectSearch,
  //   // function() {
  //   //   const { select, label } = this.config ?? {};
  //   //   Reflect.set(this.attrs, 'placeholder', `请选择${label ?? ''}`);
  //   //   Object.assign(this.attrs, select);
  //   //   Reflect.set(this.attrs, 'noClearValue', true);
  //   //   isFunction(select?.options) &&
  //   //     Reflect.set(this.attrs, 'options', select?.options({ form: this.form }));
  //   // }
  // ],
  // search: [
  //   SelectSearch,
  //   function() {
  //     const { search, label } = this.config ?? {};
  //     Reflect.set(this.attrs, 'placeholder', `请选择${label ?? ''}`);
  //     Object.assign(this.attrs, search);
  //     Reflect.set(this.attrs, 'noClearValue', true);
  //     isFunction(search?.options) &&
  //       Reflect.set(this.attrs, 'options', search?.options({ form: this.form }));
  //   }
  // ],
  // selectMultiply: [
  //   SelectMultiply,
  //   function() {
  //     const { selectMultiply, label } = this.config ?? {};
  //     Reflect.set(this.attrs, 'placeholder', `请选择${label ?? ''}`);
  //     Object.assign(this.attrs, selectMultiply);
  //     isFunction(selectMultiply?.options) &&
  //       Reflect.set(this.attrs, 'options', selectMultiply?.options({ form: this.form }));
  //   }
  // ],
  dateRange: [
    ElDatePicker,
    function() {
      this.parse = (val: any) => parseTime(val, 'YYYY-MM-DD');
      Object.assign(this.attrs, cxFormRendererConfig.dateRange(), this.config?.dateRange ?? {});
      // Reflect.deleteProperty(this.attrs, 'prop');
    }
  ],
  date: [
    ElDatePicker,
    function() {
      this.parse = (val: any) => parseTime(val, 'YYYY-MM-DD');
      Object.assign(this.attrs, cxFormRendererConfig.date(), this.config?.date ?? {});
      // Reflect.deleteProperty(this.attrs, 'prop');
    }
  ],
  time: [
    ElDatePicker,
    function() {
      this.parse = (val: any) => parseTime(val, 'YYYY-MM-DD HH-mm-ss');
      Object.assign(this.attrs, cxFormRendererConfig.time(), this.config?.time ?? {});
      // Reflect.deleteProperty(this.attrs, 'prop');
    }
  ],
  // input: [
  //   ElInput,
  //   function() {
  //     const { input, label } = this.config ?? {};
  //     Reflect.set(this.attrs, 'placeholder', `请输入${label ?? ''}`);
  //     Reflect.set(this.attrs, 'onInput', (val: any) => {
  //       input?.trim && Reflect.set(this.form, this.prop ?? '', val ? val.trim() : '');
  //       isFunction(input?.onInput) && input?.onInput();
  //     });
  //     (input?.searchIcon ?? true) &&
  //       Reflect.set(this.slots, 'append', () =>
  //         cxFormRender().renderSearchIcon(() => ({
  //           prop: this.prop,
  //           val: Reflect.get(this.form, this.prop)
  //         }))
  //       );
  //     Object.assign(this.attrs, omit(input, ['onInput']));
  //   }
  // ],
  // inscription: [
  //   InscriptionSelect,
  //   function() {
  //     const { inscription, label } = this.config ?? {};
  //     Reflect.set(this.attrs, 'placeholder', `请选择${label ?? ''}`);
  //     Object.assign(this.attrs, inscription);
  //   }
  // ],
  radio: [
    ElRadio,
    function() {
      const { radio } = this.config ?? {};
      Object.assign(this.attrs, radio);
    }
  ],
  checkbox: [
    ElCheckbox,
    function() {
      const { checkbox } = this.config ?? {};
      Object.assign(this.attrs, checkbox);
    }
  ],
  switchAttr: [
    ElSwitch,
    function() {
      const { switchAttr } = this.config ?? {};
      Object.assign(this.attrs, switchAttr);
    }
  ],
  // custom: [
  //   null,
  //   function() {
  //     const { custom } = this.config ?? {};
  //     Object.assign(this.attrs, omit(custom, ['slot']));
  //   }
  // ]
};
