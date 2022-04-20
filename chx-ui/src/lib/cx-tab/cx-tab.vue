<template>
  <div :class="['cx-tab', `level-${level}`, +level === 1 ? 'cx_mb_16' : '']">
    <div
      :class="{
        'cx-tab_scroll_wrapper': true,
        cx_flex_center: true,
        cx_justify_between: true,
        [`level-${level}_wrapper`]: true,
        'cx-tab_disabled': disabled,
        cx_pos_relative: true
      }"
      :style="{
        maxWidth: `calc(100% - ${slotWidth}px)`
      }"
    >
      <div
        :class="{
          'cx-tab_wrapper': true,
          cx_plr_20: showArrow,
          cx_border_box: true,
          cx_pos_relative: true
        }"
        ref="wrapRef"
      >
        <div class="cx-tabs">
          <a
            v-for="item in tabs"
            :key="item.id"
            @click.prevent="clickHandle(item.id)"
            :id="item.id"
            :class="{
              clickable: true,
              cx_flex_center: true,
              'cx-tab_item': true,
              'cx-tab_item_active': modelValue === item.id,
              cx_pos_relative: true
            }"
          >
            {{ item.name }}
            <i v-if="item.tip" class="iconfont icon-help cx_fs_16 cx_ml_5" v-uni-popper="{text:item.tip}"/>
            <div
              v-if="item.badgeKey && getBadgeValue(item)"
              :class="`cx-tab_badge_${item.isDot ? 'dot_wrapper' : level}`"
              v-bind="{[item.badgeKey]:''}"
            >
              <span class="cx-tab_badge_dot" v-if="item.isDot"></span>
              <template v-else>{{ `${getBadgeValue(item)}${item.unit || ''}` }}</template>
            </div>
          </a>
        </div>
        <i class="cx-tab_cursor" v-if="level < 2" :style="cursorStyle"/>
      </div>
      <template v-if="showArrow">
        <i
          class="cx-tab_left_arrow cx_flex_center iconfont icon-xiangzuo"
          @click="arrowClick('left')"
        />
        <i
          class="cx-tab_right_arrow cx_flex_center iconfont icon-xiangyou"
          @click="arrowClick('right')"
        />
      </template>
    </div>
    <div>
      <div
        v-if="$slots.operation"
        ref="slotRef"
        class="cx_flex_center cx_pos_relative cx_iflex cx_fr"
        :style="{
          'margin-top': level === 4 ? '-33px' : '-42px',
          'z-index': '200',
          height: level === 4 ? '33px' : '42px'
        }"
      >
        <slot name="operation"/>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import {
  computed,
  defineComponent,
  nextTick,
  onBeforeUnmount,
  onMounted,
  onUpdated,
  PropType,
  reactive,
  ref,
  watch
} from 'vue';
import { isObject } from 'chx-utils';
import { debounce } from 'lodash-es';
import { CxTabOption } from './type';

export default defineComponent({
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
      default: () => []
    },
    disabled: { type: Boolean, default: false },
    /**
     * badge数据源,对应tab项中的badgeKey
     */
    badgeObj: { type: Object as PropType<AnyObject>, default: () => ({}) }
  },
  emits: ['change', 'update:modelValue'],
  setup(props, { emit, expose }) {
    const clickHandle = (id: number | string) => {
      if (id === props.modelValue) return;
      if (props.disabled) return;
      emit('update:modelValue', id);
      emit('change', id);
    };

    const tabs = computed(() =>
      props.options
        .filter(item => {
          return isObject(item) ? !item.hide : item;
        })
        .map(item => {
          return isObject(item) ? item : ({ id: item, name: item } as any);
        })
    );

    const cursorStyle = reactive({ left: 0, width: 0 });

    const updateCursor = async () => {
      await nextTick();
      if (!wrapRef.value) return;
      const id = props.modelValue;
      const currentTab = wrapRef.value.querySelector<HTMLElement>(`.cx-tab_item[id="${ id }"]`);
      if (!currentTab) return;
      const left = currentTab.offsetLeft + 'px';
      const width = currentTab.offsetWidth + 'px';
      Object.assign(cursorStyle, { left, width });
    };

    const wrapRef = ref<HTMLElement | null>(null);
    const slotRef = ref<HTMLElement | null>(null);

    const getBadgeValue = (item: CxTabOption) => {
      if (item.badgeKey == void 0) return 0;
      let badgeValue = +props.badgeObj[item.badgeKey] || 0;
      return badgeValue >= 100 ? '99+' : badgeValue;
    };

    const showArrow = ref(false);
    const slotWidth = ref(0);
    const updateWrapWidth = async () => {
      await nextTick();
      if (!wrapRef.value) return;

      const tabs = wrapRef.value.querySelector('.cx-tabs');

      if (!tabs) return;
      if (slotRef.value) {
        slotWidth.value = slotRef.value.clientWidth ?? 0;
        await nextTick();
      }

      const wrapWidth = wrapRef.value.clientWidth;
      const tabsWidth = tabs.clientWidth;

      showArrow.value = tabsWidth > wrapWidth;
    };

    const forceUpdate = debounce(async () => {
      await updateWrapWidth();
      setTimeout(() => {
        updateCursor();
      }, 200);
    }, 100);

    onMounted(() => {
      window.addEventListener('resize', forceUpdate);
    });
    onBeforeUnmount(() => {
      window.removeEventListener('resize', forceUpdate);
    });

    const arrowClick = (type: 'left' | 'right') => {
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

    watch(tabs, forceUpdate, { deep: true, immediate: true });
    onUpdated(updateCursor);

    expose({
      forceUpdate
    });

    return {
      clickHandle,
      wrapRef,
      tabs,
      getBadgeValue,
      showArrow,
      arrowClick,
      cursorStyle,
      slotRef,
      slotWidth
    };
  }
});
</script>
