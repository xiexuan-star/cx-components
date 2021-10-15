declare interface NameWithId {
  id: number;
  name: string;
}
declare interface NameIdWidthChild {
  id: number;
  name: string;
  goldTypeId: number;
  childList: NameWithId[];
}

declare interface FullNameAndId {
  id: number;
  fullname: string;
}

declare type Nullable<T> = T | null;

// declare type FormRules<K extends string> = Partial<Record<K, FormRuleItem[]>>;

declare type AnyObject = Record<string | symbol, any>;

declare type Func<T = void> = (...args: any[]) => T;

declare type NumWidthEmpty = number | '';

declare type ReplaceNumber<T = AnyObject> = {
  [P in keyof T]: T[P] extends number ? number | '' : T[P];
};

declare interface SResponse<T = any> {
  state: number;
  message: string;
  data: T;
}

declare type FunctionParams<T> = T extends (...payload: infer P) => any ? P : any
