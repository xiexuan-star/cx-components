import { Identify, IO, Left, Maybe, Right, Task } from '.';
import * as R from 'ramda';
import { ElMessage } from 'element-plus';

// getDoNothingIO::void->IO<NOOP>
export const getDoNothingIO = () => IO.of(R.identity);

export const functorWarn = (...msg: any[]) => {
  console.warn(`[Functor warn]:`, ...msg);
};

export const trace = R.tap(console.log);

export const withParams = <T extends (...args: any[]) => any>(func: T, params: any[]) => () =>
  func(...params);

export const map = R.curry(
  <T>(cb: (a: any) => any, f: Identify<T> | Maybe<T> | IO<T, any> | Task) => (f.map as any)(cb)
);
export const unsafePerformIO = R.curryN(2, (arg: any, io: IO<any, any>) => io.unsafePerformIO(arg));

export const queryDom = (selector: string) => document.querySelector<HTMLElement>(selector);

export const calledBy = <R>(
  func: (...args: any[]) => any,
  params: ((...args: any[]) => any)[]
) => () => func(...params.map(f => f())) as R;

export const getMaybeValue = <T>(maybe: Maybe<T>) => {
  return maybe.getWithDefault();
};

//  either :: (a -> c) -> (b -> c) -> Either a b -> c
export const either = R.curryN(3, function(f, g, e: Left<any> | Right<any> | any) {
  switch (e.constructor) {
    case Left:
      return f(e.__value);
    case Right:
      return g(e.__value);
  }
});

export const unsafePush = R.curryN(2, <T>(item: T[], arr: T[]) => {
  arr.push(...item);
  return arr;
});
export const unsafeClearPush = R.curryN(
  2,
  <T>(items: T[], arr: T[]) => (arr.splice(0), arr.push(...items), arr)
);
export const unsafeClearArray = <T>(arr: T[]) => (arr.splice(0), arr);
export const unsafeSet = R.curryN(3, Reflect.set);
export const unsafeGet = R.curryN(2, Reflect.get);
export const unsafeDeleteProperty = R.curryN(2, Reflect.deleteProperty);
export const unsafeRemoveItem = R.curryN(2, <T>(index: number, arr: T[]) => {
  arr.splice(index, 1);
  return arr;
});
export const unsafeClearObj = (target: AnyObject) => {
  R.forEach(unsafeDeleteProperty(target), R.keys(target));
  return target;
};
export const unsafeAssign = R.curryN(2, (obj: AnyObject, target: AnyObject) => {
  Object.assign(target, obj);
  return target;
});
export const unsafeClearAssign = R.curryN(2, (obj: AnyObject, target: AnyObject) => {
  Object.assign(unsafeClearObj(target), obj);
  return target;
});

export const unsafeWhenDevCall = (func: Func<any>) => (...args: any[]) =>
  process.env.NODE_ENV === 'development'
    ? Maybe.of(func(...args))
    : Maybe.none<ReturnType<typeof func>>();

export const splat = <T extends Array<any>, R>(fun: (...args: T) => R) => (args: T) => fun(...args);

export const unsplat = <T extends Array<any>, R>(fun: (args: T) => R) => (...args: T) => fun(args);

// truthy::any->boolean
export const truthy = (val: any) => !!val;
// falsy::any->boolean
export const falsy = (val: any) => !val;

export const propCall = <T>(prop: keyof T) =>
  R.tap(
    R.when(
      R.compose(R.is(Function), R.prop<any, any>(prop)),
      R.compose(R.call, R.converge(R.bind, [R.prop<any, any>(prop), R.identity]))
    )
  ) as (a: T) => T;

export const preventDefault = propCall<Event>('preventDefault');

export const stopPropagation = propCall<Event>('stopPropagation');

// stateEq200::object->boolean
export const stateEq200 = R.propEq('state', 200);

export const curryTimeout = R.curryN(2, setTimeout);

export const nextTimeout = <T>(cb: (a: T) => any) => (payload: T) =>
  setTimeout(() => cb(payload), 0);

export const awaitTimeout = () => {
  return new Promise(R.nAry(1, setTimeout));
};

// clearTimer::a->a
export const clearTimer = (timer: any) => (clearTimeout(timer), clearInterval(timer), timer);

// successMessage::string->void->IMessageHandle
export const successMessage = (msg: string) => () => ElMessage.success(msg);
export const errorMessage = (msg: string) => () => ElMessage.error(msg);

export const defaultPromise = <T>(val: T) => () => Promise.resolve(val);

// ------------------------------ dom ------------------------------
export const appendToBody = (ele: HTMLElement) => (document.body.appendChild(ele), ele);
// createTag::string->HTMLElement
export const createTag = (tagName: string) => document.createElement(tagName);
export const clearInnerHTML = (ele: HTMLElement) => ((ele.innerHTML = ''), ele);
export const setInnerText = R.curryN(
  2,
  (text: string, ele: HTMLElement) => ((ele.innerText = text), ele)
);
export const setClassByArr = R.curryN(
  2,
  (classList: string[], ele: HTMLElement) => (ele.classList.add(...classList), ele)
);
// setDisplay::string->(a:HTMLElement->a:HTMLElement)
export const setDisplay = (val: string) =>
  R.when(truthy, (ele: HTMLElement) => (ele.style.display = val));
export const hideEle = setDisplay('none');
export const showEle = setDisplay('block');
export const appendChild = R.curryN(
  2,
  (child: HTMLElement, parent: HTMLElement) => (parent.appendChild(child), parent)
);
export const curryAddListener = R.curryN(
  3,
  <K extends keyof HTMLElementEventMap>(
    eventName: K,
    listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => any,
    ele: HTMLElement
  ) => {
    return ele.addEventListener(eventName, listener), ele;
  }
);
export const curryRemoveListener = R.curryN(
  3,
  <K extends keyof HTMLElementEventMap>(
    eventName: K,
    listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => any,
    ele: HTMLElement
  ) => {
    return ele.removeEventListener(eventName, listener), ele;
  }
);
export const clearClassList = (ele: HTMLElement) => {
  ele.className = '';
  return ele;
};
