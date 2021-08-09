import { App } from 'vue'

export type SFCWithInstall<T> = T & {
  install(app: App): void
}

export interface AnyObject {
  [k: string]: any
}

export interface NameWithId {
  name: string | number
  id: string | number
}

export interface Func<T> {
  (...args: any[]): T
}