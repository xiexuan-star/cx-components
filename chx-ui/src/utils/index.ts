import { AnyObject } from '../types'
import { isObject } from './is'

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
