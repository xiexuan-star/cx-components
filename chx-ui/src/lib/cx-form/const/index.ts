const form = () => ({
  size: 'small',
  labelSuffix: ':',
  // labelWidth: 'auto',
  labelPosition: 'left',
  onSubmit: (e: any) => e.preventDefault(),
})

export const cxFormDefaultConfig = {
  form
}
