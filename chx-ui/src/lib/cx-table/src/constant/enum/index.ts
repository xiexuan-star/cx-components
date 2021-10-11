export enum ARROW_KEY {
  L = 'ArrowLeft',
  R = 'ArrowRight',
  U = 'ArrowUp',
  D = 'ArrowDown'
}

export enum COLUMN_FLAG {
  TEXT_COLUMN = 1 << 0,
  CONTROL_COLUMN = 1 << 1,
  SLOT_COLUMN = 1 << 2,
  FIX_COLUMN = 1 << 3,
  CALC_COLUMN = 1 << 4,
  ADD_SUM_COLUMN = 1 << 5,
  CUSTOM_SUM_COLUMN = 1 << 6,
  TEXT_SUM_COLUMN = 1 << 7,
  VALIDATE_COLUMN = 1 << 8,
  ARRAY_CHILDREN = 1 << 9
}

export enum CX_STYLE_SETTING {
  width = 'CX_TABLE_MIN_WIDTH',
  height = 'CX_TABLE_HEIGHT',
  cache = 'CX_VISUAL_CACHE',
  padding = 'CX_TABLE_PADDING'
}

export enum CX_SPAN_METHOD_TYPE {
  MISSING = 1 << 0,
  EXTEND = 1 << 1
}

export enum CX_SORT_STATUS {
  REVERSE,
  POSITIVE,
  NONE
}

export enum PATCH_FLAG {
  TEXT = 1,
  CLASS = 2,
  STYLE = 4,
  PROPS = 8,
  FULL_PROPS = 16,
  HYDRATE_EVENTS = 32,
  STABLE_FRAGMENT = 64,
  KEYED_FRAGMENT = 128,
  UNKEYED_FRAGMENT = 256,
  NEED_PATCH = 512,
  DYNAMIC_SLOTS = 1024,
  HOISTED = -1,
  BAIL = -2
}

export enum CX_ADAPTOR_PRECISION_TYPE {
  GOLD = 1,
  STONE,
  PRICE,
  INT,
  LOSS
}

export enum TypeOption {
  未提交,
  已驳回,
  已反审
}
