import { usePickerOptions } from '@/hooks/pickerOptions';

const form = () => ({
  size: 'small',
  labelSuffix: ':',
  // labelWidth: 'auto',
  labelPosition: 'left',
  onSubmit: (e: any) => e.preventDefault()
});

const dateRange = () => ({
  type: 'daterange',
  unlinkPanels: true,
  format: 'YYYY-MM-DD',
  rangeSeparator: '--',
  endPlaceholder: '结束日期',
  startPlaceholder: '开始日期',
  shortcuts: usePickerOptions().shortcuts,
  disabledDate: usePickerOptions().disabledDate
});

const date = () => ({
  type: 'date',
  unlinkPanels: true,
  format: 'YYYY-MM-DD',
  placeholder: '请选择日期',
  shortcuts: usePickerOptions().dateShortcuts,
  disabledDate: usePickerOptions().disabledDate
});

const time = () => ({
  type: 'datetimerange',
  endPlaceholder: '结束时间',
  startPlaceholder: '开始时间',
  format: 'YYYY-MM-DD HH-mm-ss',
  rangeSeparator: '--',
  shortcuts: usePickerOptions().shortcuts,
  disabledDate: usePickerOptions().disabledDate
});

export const cxFormRendererConfig = {
  form,
  time,
  date,
  dateRange
};
