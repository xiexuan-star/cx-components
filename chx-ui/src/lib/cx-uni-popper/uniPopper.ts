import { createPopper, Instance, Placement } from '@popperjs/core';
import * as R from 'ramda';
import {
  appendChild,
  appendToBody,
  clearClassList,
  clearInnerHTML,
  clearTimer, copyInnerText,
  createTag,
  curryAddListener,
  curryRemoveListener,
  curryTimeout,
  hideEle,
  IO,
  map,
  Maybe,
  setClassByArr,
  setInnerText,
  showEle,
  truthy,
  unsafePerformIO
} from 'chx-utils';
import { WatchStopHandle, watch } from 'vue';
import { PopperContentListItem, PopperHandleType, PopperInstance, PopperOption, UniPopperOption } from './types';

// ------------------------------ timer ------------------------------
let timer: any;
const getTimer = () => timer;
const setTimer = (timeout: any) => (timer = timeout);
const removeTimerIO = IO.of(getTimer).map(clearTimer);
const unsafeDoRemoveTimer = R.compose(unsafePerformIO(void 0), R.always(removeTimerIO));

// ------------------------------ popperInstance ------------------------------
const popperMap: Record<string, PopperInstance> = {};
(window as any).popperMap = popperMap;
const usePopper = (key: string) => {
  return {
    getPopper: () => popperMap[key],
    setPopper: (instance: PopperInstance) => (popperMap[key] = instance)
  };
};
const popperIO = IO.of((key: string) => usePopper(key).getPopper());

// unload::Instance a=>a->number
const unload = R.compose(
  curryTimeout(R.__, 20 as any),
  R.converge(R.bind, [R.prop('destroy'), R.identity])
) as (a: Instance) => any;

const unloadIO = popperIO.map(R.compose(map(setTimer), map(unload), Maybe.of));
const unsafeDoUnload = (key: string) => {
  const popper = usePopper(key).getPopper();
  popper && unload(popper);
};

const alienateInstance = (popper: Instance, key: string) => {
  if (!popper) return popper;
  const { getPopEle } = usePopEle(key);
  const { update, destroy } = popper;
  popper.update = () => {
    showEle(getPopEle());
    return update.call(popper);
  };
  popper.destroy = () => {
    hideEle(getPopEle());
    return destroy.call(popper);
  };
  return popper;
};

// ------------------------------ popElement ------------------------------
const popEleMap: Record<string, HTMLElement> = {};

const usePopEle = (key: string) => {
  return {
    getPopEle: () => popEleMap[key],
    setPopEle: (ele: HTMLElement) => (popEleMap[key] = ele)
  };
};
const bindBaseAttr = R.compose(
  setClassByArr(['cx_b_radius_4', 'cx_uni_popper']) as (
    a: HTMLElement
  ) => HTMLElement
);

const createPopperEle = R.compose(bindBaseAttr, R.converge(createTag, [R.always('div')]));

const getPopOption = R.compose(R.objOf('placement'), R.defaultTo('right-start')) as (
  a?: string
) => { placement: Placement };

const mountPopperEle = (options: PopperOption) => {
  const hasClass = () => R.is(Array, R.prop('classList', options));
  const isMouseType = () => R.equals('mouse', R.prop('controlType', options));
  const { getPopEle, setPopEle } = R.compose(usePopEle, R.prop<string, any>('key'))(options);
  const bindKey = (ele: HTMLElement) => (ele.setAttribute('pop-key', options.key), ele);
  const unloadPopper = () => {
    unsafeDoUnload(options.key);
  };

  const bindMouseEvent = R.compose(
    curryAddListener('mouseenter', unsafeDoRemoveTimer),
    curryAddListener('mouseleave', unloadPopper)
  ) as (a: HTMLElement) => HTMLElement;

  const releaseMouseEvent = R.compose(
    curryRemoveListener('mouseenter', unsafeDoRemoveTimer),
    curryRemoveListener('mouseleave', unloadPopper)
  ) as (a: HTMLElement) => HTMLElement;

  const initPopperEle = R.compose(bindBaseAttr, clearClassList, releaseMouseEvent);

  return R.compose(
    R.when(hasClass, setClassByArr(R.prop('classList', options)!)),
    R.converge(
      R.ifElse(
        truthy,
        R.compose(R.when(isMouseType, bindMouseEvent), initPopperEle),
        R.compose(
          appendToBody,
          setPopEle,
          R.when(isMouseType, bindMouseEvent),
          bindKey,
          createPopperEle
        )
      ),
      [getPopEle]
    )
  )();
};

const getPopInstance = (
  ele: HTMLElement,
  key: string,
  placement?: string,
  classList?: string[],
  controlType?: PopperHandleType
) => {
  const element = createPopper(
    ele,
    mountPopperEle({ classList, controlType, key }),
    getPopOption(placement)
  );

  return alienateInstance(element, key);
};

// ------------------------------ patchEle ------------------------------
let currentEle: HTMLElement | null = null;
const getCurrentEle = () => currentEle;
const setCurrentEle = (ele: HTMLElement) => (currentEle = ele);
const currentEleIsExist = R.compose(truthy, getCurrentEle);

const renderListItem = (item: PopperContentListItem) => {
  const hasIcon = () => truthy(item.icon);
  const hasText = () => truthy(item.text);
  const createWrapper = () =>
    setClassByArr(
      [
        'cx_fs_white',
        'hover_bg_black_75',
        'cx_b_radius_4',
        'cx_plr_8',
        'cx_fs_12',
        'cx_h_30',
        'cx_flex_center',
        'cx_cursor_pointer'
      ],
      createTag('div')
    );
  const appendIcon = (wrapper: HTMLElement) =>
    appendChild(
      setClassByArr(['iconfont', `icon-${ item.icon }`, 'cx_mr_9', 'cx_fs_12'], createTag('i'))
    )(wrapper);
  const appendText = (wrapper: HTMLElement) =>
    appendChild(setInnerText(item.text, createTag('span')))(wrapper);
  return R.compose(R.when(hasText, appendText), R.when(hasIcon, appendIcon), createWrapper)();
};
const bindClickEvent = R.curryN(2, (ele: HTMLElement, item: PopperContentListItem) => {
  const { type, callback } = item;
  const isCopyType = () => R.equals(type, 'copy');
  const isJumpType = () => R.equals(type, 'jump');
  const cbIsFunction = () => R.is(Function, callback);
  const copyHandle = R.compose(
    copyInnerText as any,
    getCurrentEle
  );
  const jumpHandle = R.when(cbIsFunction, () => (callback!(item, currentEle), currentEle));

  return curryAddListener(
    'click',
    R.when(
      currentEleIsExist,
      R.compose(R.tap(R.when(isCopyType, copyHandle)), R.tap(R.when(isJumpType, jumpHandle)))
    ),
    ele
  );
});
const patchListEle = (list: PopperContentListItem[], container: HTMLElement) => {
  list.forEach(
    R.compose(
      appendChild(R.__, container),
      R.converge(bindClickEvent, [renderListItem, R.identity])
    )
  );
};

const renderTextItem = R.compose(
  setClassByArr(['cx_p_12', 'cx_fs_white', 'cx_fs_12']),
  R.converge(setInnerText, [R.identity, R.converge(createTag, [R.always('div')])])
) as (a: string) => HTMLElement;

const patchTextEle = (text: string, container: HTMLElement) => {
  return R.compose(appendChild(R.__, container), renderTextItem)(text);
};

// ------------------------------ direction ------------------------------
let cancelWatcherFun: null | WatchStopHandle;
const setCancelWatcher = (cancel: WatchStopHandle) => (cancelWatcherFun = cancel);
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const cancelWatcher = () => cancelWatcherFun?.();
// updatePopInstance::Instance->Func
const updatePopInstance = R.converge(R.bind, [R.prop('update'), R.identity]);

const EleKeyMap = new WeakMap<HTMLElement, string>();

export default {
  name:'uniPopper',
  mounted(el: HTMLElement, { value }: { value: Required<UniPopperOption> }) {
    const bindEle = () => setCurrentEle(el);

    const getKey = () => R.compose(R.defaultTo('default'), R.prop<string, any>('key'))(value);
    EleKeyMap.set(el, getKey());
    const { getPopEle } = usePopEle(getKey());
    const { setPopper } = usePopper(getKey());

    const getList = () => R.prop('list')(value);
    const getText = () => R.prop('text')(value);
    const getPlacement = () => R.prop('placement')(value);
    const getClassList = () => R.prop('classList')(value);
    const getVisible = () => R.prop('visible')(value);
    const visibleIsExist = () => getVisible() != undefined;
    const getControlType = () => R.defaultTo('mouse', R.prop('controlType', value));

    const listIsExist = R.compose(truthy, getList);
    const patchListToPop = R.converge(patchListEle, [getList, getPopEle]);

    const textIsExist = R.compose(truthy, getText);
    const patchTextToPop = R.converge(patchTextEle, [getText, getPopEle]);

    const show = R.compose(
      R.converge(
        R.compose(
          map(R.when(textIsExist, patchTextToPop)),
          map(R.when(listIsExist, patchListToPop)),
          map(setPopper),
          map(R.tap(R.compose(R.call, updatePopInstance))),
          map(R.tap(R.compose(clearInnerHTML, getPopEle))),
          Maybe.of
        ),
        [
          R.converge(getPopInstance, [
            R.always(el),
            getKey,
            getPlacement,
            getClassList,
            getControlType
          ])
        ]
      ),
      unsafeDoRemoveTimer,
      bindEle
    );
    const hide = R.compose(unsafePerformIO(getKey()), R.always(unloadIO));

    const isHandleType = R.equals('handle');

    const bindHandle = R.compose(
      setCancelWatcher,
      R.converge(watch, [R.always(getVisible), R.always(R.compose(R.ifElse(truthy, show, hide)))])
    );

    const isMouseType = R.equals('mouse');
    const bindMouse = R.compose(
      curryAddListener('mouseleave', hide),
      curryAddListener(
        'mouseenter',
        R.ifElse(visibleIsExist, R.when(getVisible, show), show)
      ) as (a: HTMLElement) => HTMLElement
    );

    R.compose(
      R.tap(R.when(isHandleType, bindHandle)),
      R.tap(R.when(isMouseType, R.converge(bindMouse, [R.always(el)]))),
      getControlType
    )();
  },
  unmounted(el) {
    const key = EleKeyMap.get(el);
    key && unsafeDoUnload(key);
  }
}
