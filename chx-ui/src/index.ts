// import '@babel/polyfill'
import * as components from './lib';
import { Plugin } from 'vue';

import './style/index.scss';

const CxUI: Plugin = {
  install: app => {
    Object.values(components).forEach(component => {
      app.use(component);
    });
  }
};

// 全局引入
export default CxUI;

// 局部引入
export * from './lib';

// 导出各组件hooks
export * from './lib/cx-form/hooks';
export * from './lib/cx-table/src/hooks';
export * from './lib/cx-dialog/useCxDialog';

// 导出各组件types
export * from './lib/cx-form/types';
export * from './lib/cx-table/src/types';
export * from './lib/cx-dialog/types';

// 导出各组件renderer
export * from './lib/cx-form/render';

// 导出各组件utils
export * from './lib/cx-table/src/utils';

// 导出各组件constant
export * from './lib/cx-table/src/constant';
