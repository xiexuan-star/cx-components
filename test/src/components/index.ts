import CxBtn from './cx-btn';
import CxTab from './cx-tab';
import CxForm from './cx-form';
import CxDialog from './cx-dialog';
import CxTable from './cx-table';

const components = { CxBtn, CxTab, CxForm, CxDialog, CxTable };

export { CxBtn, CxTab, CxForm, CxDialog, CxTable };

// import '@babel/polyfill'
import { Plugin } from 'vue';

const CxUI: Plugin = {
  install: app => {
    Object.values(components).forEach(component => {
      app.use(component);
    });
  }
};

// 全局引入
export default CxUI;
