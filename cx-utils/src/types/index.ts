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

export type FunctionParams<T> = T extends (...payload: infer P) => any ? P : any

export type DateType = 'fullYear' | 'month' | 'date' | 'hours' | 'minutes' | 'seconds';
