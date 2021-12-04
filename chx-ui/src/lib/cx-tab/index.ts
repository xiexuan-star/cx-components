import {
  App,
  computed,
  createCommentVNode,
  createVNode,
  defineComponent,
  nextTick,
  onBeforeUnmount,
  onMounted,
  PropType,
  ref,
  watch,
} from 'vue';
import { PatchFlags } from '../../constant/enum';
import { SFCWithInstall } from '../../types/interface';
import { isObject } from 'chx-utils';
import { CxTabOption } from './type';

const script = defineComponent({
  name: 'CxTab',
  props: {
    /**
     * tab等级,分1,2,3级,默认1级
     */
    level: { type: [String, Number], default: '1' },
    modelValue: { type: [Number, String], default: 0 },
    /**
     * tab项列表,支持只传入数字项与字符创项,它们会自动转化为name+id形式
     */
    options: {
      type: Array as PropType<(CxTabOption | string | number)[]>,
      default: () => [],
    },
    disabled: { type: Boolean, default: false },
    /**
     * badge数据源,对应tab项中的badgeKey
     */
    badgeObj: { type: Object as PropType<AnyObject>, default: () => ({}) },
  },
  emits: ['update:modelValue', 'change'],
  setup(props, { emit, slots }) {
    const clickHandle = (id: number | string) => {
      if (id === props.modelValue) return;
      if (props.disabled) return;
      emit('update:modelValue', id);
      emit('change', id);
    };

    const tabs = computed(() =>
      props.options
        .filter((item) => {
          return isObject(item) ? !item.hide : item;
        })
        .map((item) => {
          return isObject(item) ? item : ({ id: item, name: item } as any);
        })
    );

    const renderItems = () => {
      return tabs.value.map((item) => {
        const classList = ['cx-tab_item', 'clickable', 'cx_flex_center'];
        props.modelValue === item.id && classList.push('cx-tab_item_active');

        let badgeValue = props.badgeObj[item.badgeKey ?? ''] ?? 0;
        const badgeUnit = item.unit ?? '';
        if (badgeValue >= 100) badgeValue = '99+';
        return createVNode(
          'div',
          { onClick: () => clickHandle(item.id), class: classList },
          [
            item.name,
            badgeValue
              ? createVNode(
                'div',
                { class: `cx-tab_badge_${ props.level }` },
                `${ badgeValue }${ badgeUnit }`,
                PatchFlags.CLASS | PatchFlags.TEXT
              )
              : createCommentVNode('v-if_badge', true),
          ],
          PatchFlags.NEED_PATCH | PatchFlags.CLASS
        );
      });
    };

    const wrapRef = ref<HTMLElement | null>(null);

    const renderArrow = (type: 'left' | 'right') => {
      const onClick = () => {
        if (!wrapRef.value) return;

        let base = 300;

        let offset = base / 10;

        const timer = setInterval(() => {
          if (!wrapRef.value) return;

          const targetPosition = wrapRef.value.scrollLeft + (type === 'left' ? -offset : offset);

          wrapRef.value.scrollTo(targetPosition, 0);

          const stop =
            type === 'left'
              ? targetPosition <= 0
              : targetPosition >= wrapRef.value.scrollWidth - wrapRef.value.clientWidth;

          if (base === 0 || stop) {
            clearInterval(timer);
          } else if (base <= 3) {
            base = 0;
          } else {
            base -= base / 10;
            offset = base / 10;
          }
        }, 10);
      };

      const classList = [
        `cx-tab_${ type }_arrow`,
        'iconfont',
        'cx_flex_center',
        type === 'left' ? 'icon-xiangzuo' : 'icon-xiangyou',
      ];

      return createVNode('div', { onClick, class: classList }, null, PatchFlags.NEED_PATCH | PatchFlags.CLASS);
    };

    const isShowArrow = () => {
      if (!wrapRef.value) return;

      const tabs = wrapRef.value.querySelector('.cx-tabs');

      if (!tabs) return;
      const wrapWidth = wrapRef.value.clientWidth;

      const tabsWidth = tabs.clientWidth;

      return tabsWidth > wrapWidth;
    };

    const showArrow = ref(isShowArrow());

    // const MutationObserver = window.MutationObserver;
    // const observer = new MutationObserver(() => {
    // })

    const debounce = (cb: any, delay: number) => {
      let timer: any;
      return () => {
        clearTimeout(timer);
        timer = setTimeout(cb, delay);
      };
    };
    const tabsResize = debounce(() => {
      showArrow.value = isShowArrow();
    }, 100);
    onMounted(() => {
      window.addEventListener('resize', tabsResize);
    });
    onBeforeUnmount(() => {
      window.removeEventListener('resize', tabsResize);
    });

    watch(
      () => tabs.value,
      async () => {
        await nextTick();
        showArrow.value = isShowArrow();
      },
      { deep: true, immediate: true }
    );

    return (_: any, cache: any[]) => {
      const classList = [
        'cx-tab_scroll_wrapper',
        'cx_flex_center',
        'cx_justify_between',
        `level-${ props.level }_wrapper`
      ];

      showArrow.value && classList.push('cx_plr_20');
      props.disabled && classList.push('cx-tab_disabled');

      return createVNode(
        'div',
        { class: classList },
        [
          createVNode(
            'div',
            { class: 'cx-tab_wrapper', ref: wrapRef },
            [createVNode('div', { class: 'cx-tabs' }, renderItems())],
            PatchFlags.NEED_PATCH
          ),
          showArrow.value
            ? cache[0] || (cache[0] = renderArrow('left'))
            : createCommentVNode('v-if_left_arrow', true),
          showArrow.value
            ? cache[1] || (cache[1] = renderArrow('right'))
            : createCommentVNode('v-if_right_arrow', true),
          createVNode('div', { class: 'cx-tab_extension' }, [slots.ext && slots.ext()])
        ],
        PatchFlags.CLASS
      );
    };
  },
});

script.install = (app: App) => {
  app.component(script.name, script);
};

const _CX_TAB = script as SFCWithInstall<typeof script>

export default _CX_TAB
