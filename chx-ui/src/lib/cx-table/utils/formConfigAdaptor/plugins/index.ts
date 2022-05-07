import { CxTableFormAdaptorPlugin } from '../../..';

//格式化条码
export function formatBarcode(str: string) {
  let code: number | string = str;
  if (code.length >= 12) {
    code = Number(code.substr(0, code.length - 1));
    if (!isNaN(code)) {
      return code.toString();
    }
  }
  return str;
}

export const dataInitPlugin: CxTableFormAdaptorPlugin = {
  onOutput: config => {
    // ⭐️⭐️⭐️⭐️⭐️ 业务相关
    if (config.label === '生产单号') {
      config.onChange = ({ prop, form }) => {
        form[prop] = formatBarcode(form[prop]);
      };
    }
    return config;
  }
};
