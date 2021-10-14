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
});

const date = () => ({
  type: 'date',
  unlinkPanels: true,
  format: 'YYYY-MM-DD',
  placeholder: '请选择日期',
});

const time = () => ({
  type: 'datetimerange',
  endPlaceholder: '结束时间',
  startPlaceholder: '开始时间',
  format: 'YYYY-MM-DD HH-mm-ss',
  rangeSeparator: '--',
});

export const cxFormRendererConfig = {
  form,
  time,
  date,
  dateRange
};
