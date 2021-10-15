import { InjectionKey, onUnmounted } from 'vue';

export class Events {
  private readonly events = new Map<InjectionKey<any>, Set<(...args: any[]) => any>>();

  public on<T extends Array<any>>(evt: InjectionKey<T>, handler: (...args: T) => any) {
    if (typeof handler !== 'function') {
      return this;
    }

    const set = this.events.get(evt) || new Set();
    set.add(handler);
    this.events.set(evt, set);

    return this;
  }

  public off<T extends Array<any>>(evt: InjectionKey<T>, handler?: (...args: T) => any) {
    if (!handler) {
      this.events.delete(evt);
    } else {
      const set = this.events.get(evt);
      set && set.delete(handler);
    }

    return this;
  }

  public emit<T extends Array<any>>(evt: InjectionKey<T>, ...args: T) {
    return this.trigger(evt, ...args);
  }

  public once<T extends Array<any>>(evt: InjectionKey<T>, handler: (...args: T) => any) {
    if (typeof handler === 'function') {
      const fn = (...args: T) => {
        handler(...args);
        this.off(evt, fn);
      };

      this.on(evt, fn);
    }

    return this;
  }

  public trigger<T extends Array<any>>(evt: InjectionKey<T>, ...args: T) {
    const set = this.events.get(evt);
    set && set.forEach(fn => fn(...args));

    return this;
  }
}

const $events = new Events();

export default $events;

export const safeRegisterEvents = <T extends [Func<any>]>(
  key: InjectionKey<T>,
  ...payload: Parameters<T[0]>
) => {
  const cb = (cb: T[0]) => cb(...payload);
  $events.on(key, cb);
  onUnmounted(() => {
    $events.off(key, cb);
  });
};

export const getSafeEventsValue = <T extends [Func<any>]>(key: InjectionKey<T>) => {
  let result: Parameters<T[0]>[0] | undefined;
  $events.emit(key, (payload: Parameters<T[0]>[0]) => {
    result = payload;
  });
  if (result == undefined) {
    console.warn(`events: get events value`, key, `before regist`);
  }
  return result;
};
