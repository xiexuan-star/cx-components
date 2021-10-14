import {
  ComponentPublicInstance,
  createVNode,
  defineComponent,
  nextTick,
  PropType,
  reactive,
  render,
  watch
} from 'vue';
import { map, IO, Maybe, queryDom, unsafeDeleteProperty, unsafeSet } from '../../../../../utils/functor';
import { CxTableDynamicColumn } from '../../types';
import { PATCH_FLAG } from '../../constant/enum';
import { cxTableWarn } from '../../utils';
import * as R from 'ramda';
import { useState } from '../../../../../hooks/state';
import { CxBtn } from '../../../..';

const renderInnerBtn = ({ $attrs, $slots }: ComponentPublicInstance) => {
  return createVNode(
    CxBtn,
    {
      ...$attrs,
      level: $attrs.level ?? 2,
      loading: ($attrs as AnyObject).loadingState?.loading,
      disabled: ($attrs as AnyObject).disabledState?.disabled
    },
    $slots,
    PATCH_FLAG.FULL_PROPS
  );
};
const innerBtn = defineComponent({});
innerBtn.render = renderInnerBtn;

export default defineComponent({
  name: 'TeleportBtn',
  props: {
    dynamicColumn: { type: Array as PropType<CxTableDynamicColumn[]>, required: true },
    selector: { type: String, required: true },
    clickHandler: { type: Function },
    disabledState: { type: Object, default: () => ({ disabled: false }) }
  },
  setup(props, { attrs, slots }) {
    const [container, setContainer] = useState<HTMLElement|null>(null);

    const unsafeWarn = () =>
      cxTableWarn(`can't find container element by selector`, props.selector);

    // unsafeClearDom::void->string
    const unsafeClearEle = R.compose(map(unsafeSet(R.__, 'innerHTML', '')), Maybe.of) as (
      a: HTMLElement|null
    ) => Maybe<HTMLElement|null>;

    const onClick = async () => {
      setLoadingStates(true);
      try {
        await props.clickHandler?.();
        setLoadingStates(false);
      } catch {
        setLoadingStates(false);
      }
    };

    const loadingState = reactive({ loading: false });

    const setLoadingStates = unsafeSet(loadingState, 'loading');

    const renderBtn = () =>
      createVNode(
        innerBtn,
        { ...attrs, disabledState: props.disabledState, loadingState, onClick },
        slots,
        PATCH_FLAG.FULL_PROPS
      );

    // renderVNodeToDom::HTMLElement->void
    const renderVNodeToDom = R.compose(
      R.converge(render, [renderBtn, R.identity]),
      R.tap(unsafeClearEle),
      R.tap(unsafeDeleteProperty(R.__, '_vnode'))
    );

    // 组件更新IO
    const updateComponentIO = IO.of<HTMLElement|null, string>(queryDom).map(
      R.ifElse(
        R.isNil,
        R.compose(unsafeWarn, unsafeClearEle, container),
        R.compose(map(renderVNodeToDom), Maybe.of, setContainer)
      )
    );

    watch(
      () => props.dynamicColumn,
      async () => {
        await nextTick();
        updateComponentIO.unsafePerformIO(props.selector);
      }
    );

    return R.always(null);
  }
});
