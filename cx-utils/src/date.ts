import { SetupContext } from 'vue';
import dayjs from 'dayjs';
import { headUppercase } from './index';
import { DateType,Func } from './types';

/**
 * 获取默认时间范围
 * @returns [当月1号， 今天]
 */
export function getDefaultDateRange(): [Date, Date] {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth();

  return [new Date(year, month, 1), new Date(year, month, date.getDate())];
}

export function parseTimeParams(dateRange: Date | [Date, Date] | null, fmt = 'YYYY-MM-DD') {
  if (!dateRange) return [];
  if (Array.isArray(dateRange)) {
    return dateRange.map(v => dayjs(v).format(fmt));
  }
  return [dayjs(dateRange).format(fmt)];
}

export function initDate(badge: 'date' | 'month', time?: number | Date | string): Date;
export function initDate(badge: 'today' | 'yesterday', time?: number | Date | string): [Date, Date];
export function initDate(badge?: string, time?: number | Date | string): [Date, Date];
export function initDate(badge?: string, time?: number | Date | string) {
  // 初始化日期搜索
  if (typeof time === 'number' && time.toString().length === 10) {
    time = time * 1000;
  }
  if (badge === 'yesterday') {
    time = Number(new Date()) - 3600 * 1000 * 24;
  }
  const end = time ? new Date(time) : new Date();
  const start = new Date(end.getFullYear(), end.getMonth());
  const zero = new Date(end.getTime());
  zero.setHours(0, 0, 0, 0);

  switch (badge) {
    case 'date':
      return end;
    case 'month':
      return start;
    case 'today':
    case 'yesterday':
      return [zero, end];
    default:
      return [start, end];
  }
}

const dateTypeOrder = ['fullYear', 'month', 'date', 'hours', 'minutes', 'seconds'];

export function getDateRange(num = 1, type: DateType = 'date', isFullRange = false) {
  const currentDate = new Date();
  let start = new Date();
  const parsedType = headUppercase(type);
  start = new Date(start[`set${ parsedType }`]?.(currentDate[`get${ parsedType }`]() - num));
  let end = new Date();
  if (isFullRange) {
    const order = dateTypeOrder.findIndex(t => t === type);
    const parsedType = headUppercase(dateTypeOrder[order + 1]);
    if (start[`set${ parsedType }`]) {
      start = new Date(start[`set${ parsedType }`](1));
      if (num) end = new Date(end[`set${ parsedType }`](0));
    }
  }
  return [start, end];
}

export function usePickerOptions(fn?: Func<boolean>) {
  // 快捷时间选项
  const shortcuts = [
    { text: '最近一天', value: getDateRange(1) },
    { text: '最近一周', value: getDateRange(7) },
    { text: '最近一个月', value: getDateRange(1, 'month') },
    { text: '最近三个月', value: getDateRange(3, 'month') },
    { text: '上一个月', value: getDateRange(1, 'month', true) },
    { text: '本月', value: getDateRange(0, 'month', true) },
    {
      text: '全部',
      onClick: (ctx: SetupContext<Array<'pick'>>) => ctx.emit('pick', null)
    }
  ];

  const dateShortcuts = [
    { text: '今天', value: getDateRange(0)[0] },
    { text: '昨天', value: getDateRange(1)[0] },
    { text: '一周前', value: getDateRange(7)[0] }
  ];

  const disabledDate = (time: Date) => {
    if (fn) return fn(time);
    const date = new Date();
    const year = date.getFullYear(); // 获取当前年份
    const month = date.getMonth(); // 获取当前月份
    const day = date.getDate() + 1; // 获取当前日期

    return time.getTime() > Number(new Date(year, month, day)) - 1000;
  };

  return { shortcuts, disabledDate, dateShortcuts };
}
