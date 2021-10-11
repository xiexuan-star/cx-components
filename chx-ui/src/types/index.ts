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

export interface SResponse<T = any> {
  state: number
  message: string
  data: T
}

export type FunctionParams<T> = T extends (...payload: infer P) => any ? P : any
