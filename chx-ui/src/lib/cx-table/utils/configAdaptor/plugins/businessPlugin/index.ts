import { CxTableAdaptorPlugin } from '../../../../types';

export const businessPlugin: CxTableAdaptorPlugin = {
  onOutput: column => {
    // TODO 处理特殊业务组件

    return column;
  }
};
