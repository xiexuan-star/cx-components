import { createPopper, Placement } from '@popperjs/core';

export type UniPopperOption = {
  placement?: Placement;
  list?: PopperContentListItem[];
  text?: string;
  visible?: boolean;
  key?: string;
} & PopperOption;

export type PopperInstance = ReturnType<typeof createPopper>;
export type PopperContentListItem = {
  icon: string;
  text: string;
  type?: 'copy' | 'jump';
  callback?: (a: PopperContentListItem, ele: HTMLElement | null) => void;
};
export type PopperOption = {
  classList?: string[];
  controlType?: PopperHandleType;
  key: string;
};
export type PopperHandleType = 'mouse' | 'handle';
