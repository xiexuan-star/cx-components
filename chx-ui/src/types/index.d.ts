
declare interface AnyObject {
  [k: string]: any
}

declare interface NameWithId {
  name: string | number
  id: string | number
}

declare interface Func<T> {
  (...args: any[]): T
}

declare interface SResponse<T = any> {
  state: number;
  message: string;
  data: T;
}