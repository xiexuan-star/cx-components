import theme from 'vitepress/dist/client/theme-default';
import '../../../../src/style/index.scss';
import './index.scss';
import 'vitepress-theme-demoblock/theme/styles/index.css';
import CxUI from '../../../../dist/chx-ui.esm';
import Demo from 'vitepress-theme-demoblock/components/Demo.vue';
import DemoBlock from 'vitepress-theme-demoblock/components/DemoBlock.vue';
import { renderDefaultNode, renderInputNode, renderIndexNode } from './renderer';
import { useCxTable } from '../../../../dist/chx-ui.esm';
import TableDemo from '../components/tableDemo.vue';

export default {
  ...theme,
  enhanceApp({ app }) {
    app.use(CxUI);
    registerComponents(app);
    const { registCxRenderer } = useCxTable();
    registCxRenderer({
      type: 'input',
      payload: {
        render(params) {
          return params.isActived ? renderInputNode(params) : renderDefaultNode(params);
        },
        // 用来决定一个单元格是否受单元格聚焦的影响
        active: true
      }
    });
    registCxRenderer({
      type: 'default',
      payload(params) {
        return renderDefaultNode(params);
      }
    });
    registCxRenderer({
      type: 'index',
      payload(params) {
        return renderIndexNode(params);
      }
    });
  }
};

function registerComponents(app) {
  app.component('Demo', Demo);
  app.component('DemoBlock', DemoBlock);
  app.component('TableDemo', TableDemo);
}
