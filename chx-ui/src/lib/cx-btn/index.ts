import {
  App, computed, createCommentVNode, createVNode, defineComponent, PropType, resolveDirective, withDirectives
} from 'vue';
import { PatchFlags } from '../../constant/enum';
import { SFCWithInstall } from '../../types/interface';
import { CxUniPopper } from '../index';

const script = defineComponent({
  name: 'CxBtn',
  props: {
    size: {
      type: String as PropType<'large' | 'medium' | 'mini'>,
      default: 'medium',
    },
    level: { type: [String, Number], default: '2' },
    type: {
      type: String as PropType<'primary' | 'success' | 'danger'>,
      default: 'primary',
    },
    content: { type: String, default: '' },
    icon: { type: String, default: '' },
    loading: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
    tipOption: { type: Object }
  },
  setup(props, { slots }) {
    const renderLoadingEle = () => {
      return createVNode('i', { class: 'el-icon-loading cx_mr_5' });
    };

    const renderIconEle = (className: string) => {
      return createVNode('i', { class: `iconfont icon-` + className }, null, PatchFlags.CLASS);
    };

    const renderDisabled = () => {
      return createVNode('i', { onClick: (e: any) => e.stopPropagation(), class: 'cx_mask' });
    };

    const classList = computed(() => {
      const result: string[] = ['cx-btn_wrapper'];
      if (props.disabled) result.push('cx-btn_disabled');
      result.push(`cx-btn_${ props.size }`);
      result.push(`cx-btn_level_${ props.level }`);
      result.push(`cx-btn_${ props.type }`);
      if (props.loading) result.push(`cx-btn_loading`);
      return result;
    });

    return (_: any, cache: any[]) => {
      return withDirectives(createVNode(
        'button',
        {
          type: 'button',
          class: classList.value,
          onClick: cache[0]
            ? cache[0]
            : (cache[0] = (e: any) => {
              e.preventDefault();
              if (props.disabled) return false;
            }),
        },
        [
          props.loading ? (cache[1] ? cache[1] : (cache[1] = renderLoadingEle())) : createCommentVNode('v-if', true),
          props.icon ? renderIconEle(props.icon) : createCommentVNode('v-if', true),
          (slots.default ? slots.default({}) : props.content)
            ? createVNode('span', { class: { cx_ml_5: !!props.icon } }, [
              slots.default ? slots.default({}) : props.content,
            ])
            : createCommentVNode('v-if_content', true),
          props.disabled ? (cache[2] ? cache[2] : (cache[2] = renderDisabled())) : createCommentVNode('v-if', true),
        ],
        PatchFlags.CLASS | PatchFlags.NEED_PATCH
      ), [[props.tipOption ? CxUniPopper : {}, Object.assign({
        placement: 'top',
      }, props.tipOption)]]);
    };
  },
});

script.install = (app: App) => {
  app.component(script.name, script);
};

const _CX_BTN = script as SFCWithInstall<typeof script>;

export default _CX_BTN;
