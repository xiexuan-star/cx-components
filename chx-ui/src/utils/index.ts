import { AnyObject, Func, FunctionParams } from '../types'
import { isObject } from './is'
import * as R from 'ramda'

export * from './is'

export function omit<T extends AnyObject, K extends keyof T>(target: T, keys: K[]) {
  if (!isObject(target)) return target
  return (Object.keys(target) as K[]).reduce((res, key) => {
    if (!keys.includes(key)) {
      Reflect.set(res, key, target[key])
    }
    return res
  }, {} as Omit<T, K>)
}

export function useEnumOptions<T>(obj: AnyObject, name = 'name', id = 'id'): T[] {
  const result: T[] = []

  Object.entries(obj).forEach(([key, val]) => {
    if (R.is(Number, val)) {
      result.push({ [name]: key, [id]: val } as unknown as T)
    }
  })

  return result
}

export function throttle<T extends Func<any>>(func:T , wait = 100, options?: { leading?: boolean; trailing?: boolean }) {
  let timeout, context, args, result
  let previous = 0
  if (!options) options = {}

  function later() {
    previous = options.leading === false ? 0 : Date.now()
    timeout = null
    result = func.apply(context, args)
    if (!timeout) context = args = null //显示地释放内存，防止内存泄漏
  }

  function throttled(...args:FunctionParams<T>) {
    var now = Date.now()
    if (!previous && options.leading === false) previous = now
    var remaining = wait - (now - previous)
    context = this
    if (remaining <= 0 || remaining > wait) {
      if (timeout) {
        clearTimeout(timeout)
        timeout = null
      }
      previous = now
      result = func.apply(context, args)
      if (!timeout) context = args = null
    } else if (!timeout && options.trailing !== false) {
      timeout = setTimeout(later, remaining)
    }
    return result
  }

  return throttled
}
