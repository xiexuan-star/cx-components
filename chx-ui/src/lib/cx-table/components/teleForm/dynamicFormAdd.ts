import {
  ComponentInternalInstance,
  createBlock,
  createVNode,
  defineComponent,
  Fragment,
  openBlock,
  PropType,
  resolveComponent, withCtx
} from 'vue';
import { PATCH_FLAG } from '../../constant';
import PinyinMatch from 'pinyin-match';
import * as R from 'ramda';
import { useComputed, useState } from '../../../../hooks/state';

export default defineComponent({
  name: 'DynamicFormAdd',
  props: {
    options: { type: Array as PropType<AnyObject[]>, default: () => [] },
    modelValue: { type: Array as PropType<string[]>, required: true },
    currentInstance: { type: Object as PropType<ComponentInternalInstance> }
  },
  emits: ['update:modelValue', 'change'],
  setup(props, { emit }) {


    const [modelProxy, setModelProxy] = useComputed<string[]>({
      get() {
        return props.modelValue ?? [];
      },
      set(val) {
        emit('update:modelValue', val);
        setVisible(false);
      }
    });

    const [visible, setVisible] = useState(false);
    const toggleVisible = R.compose(setVisible, R.not, visible);

    const addItem = (id: string) => {
      R.compose(setModelProxy, R.uniq as (a: string[]) => string[], R.append(id), modelProxy)();
    };

    const matchPinyinSearch = (str: string) => {
      return R.ifElse(R.isEmpty, R.T, R.curryN(2, PinyinMatch.match)(str))(searchContent());
    };
    const currentOptions = useComputed(() => {
      return R.filter(
        R.allPass([
          R.compose(R.not, R.includes(R.__, modelProxy()), R.prop<string, string>('id')),
          R.compose(matchPinyinSearch, R.prop<string, string>('name'))
        ])
      )(props.options);
    });

    const [searchContent, setSearchContent] = useState('');



    const _hoisted_class_1 = 'cx_mb_5';
    const _hoisted_class_2 = 'hover-highlight cx_ptb_8 cx_plr_12';
    const _hoisted_class_3 = 'cx_plr_7';
    const _hoisted_class_4 = 'cx_flex_center cx_justify_center cx_mt_8';

    const _hoisted_attrs_1 = {
      style: {
        maxHeight: '245px',
        overflowY: 'auto',
        margin: '0 -12px -10px'
      }
    };

    return withCtx((_: any, cache: any[]) => {
      const _hoisted_component_1 = resolveComponent('ElPopover');
      const _hoisted_component_2 = resolveComponent('CxBtn');
      const _hoisted_component_3 = resolveComponent('ElInput');
      return [
        (
          openBlock(),
            createBlock(Fragment, null, [
              createVNode(
                _hoisted_component_1,
                {
                  visible: visible(),
                  'onUpdate:visible': setVisible,
                  placement: 'right-start',
                  width: 240,
                  showArrow: false
                },
                {
                  reference: () => {
                    return createVNode(
                      _hoisted_component_2,
                      {
                        onClick: toggleVisible,
                        icon: 'tianjia',
                        class: _hoisted_class_3,
                        style: {
                          marginTop: props.modelValue.length ? '32px' : 0,
                          backgroundColor: '#f0f5ff'
                        }
                      },
                      null,
                      PATCH_FLAG.STYLE
                    );
                  },
                  default: () => {
                    return (
                      openBlock(),
                        createBlock(Fragment, null, [
                          createVNode(
                            _hoisted_component_3,
                            {
                              size: 'mini',
                              class: _hoisted_class_1,
                              suffixIcon: 'iconfont icon-sousuo',
                              modelValue: searchContent(),
                              'onUpdate:modelValue': setSearchContent,
                              placeholder: '搜索过滤条件'
                            },
                            null,
                            PATCH_FLAG.PROPS,
                            ['modelValue']
                          ),
                          [
                            (openBlock(),
                              createBlock(Fragment, null, [
                                currentOptions().length
                                  ? createVNode('div', _hoisted_attrs_1, [
                                    (openBlock(),
                                      createBlock(
                                        Fragment,
                                        null,
                                        currentOptions().map(option => {
                                          return createVNode(
                                            'div',
                                            {
                                              key: option.id,
                                              class: _hoisted_class_2,
                                              onClick: R.useWith(addItem, [R.always(option.id)])
                                            },
                                            option.name,
                                            PATCH_FLAG.PROPS,
                                            ['key']
                                          );
                                        }),
                                        PATCH_FLAG.KEYED_FRAGMENT
                                      ))
                                  ])
                                  : cache[0] ||
                                    (cache[0] = createVNode('div', { class: _hoisted_class_4 }, '暂无数据'))
                              ]))
                          ]
                        ])
                    );
                  }
                },
                PATCH_FLAG.PROPS,
                ['visible']
              )
            ])
        )
      ];
    }, props.currentInstance);
  }
});
