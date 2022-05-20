import { getPath } from './utils';

const sidebar = {
  [getPath('/api/')]: 'auto',
  [getPath('/guide/')]: getGuideSidebar()
};

function getGuideSidebar() {
  return [
    {
      text: '组件文档',
      children: [
        {
          text: '按钮',
          link: '/guide/cx-btn'
        },
        {
          text: '表格前置',
          link: '/guide/cx-table--pre'
        },
        {
          text: '表格列配置',
          link: '/guide/cx-table--config'
        },
        {
          text:'表格组件级属性',
          link:'/guide/cx-table--props'
        }
      ]
    }
  ];
}

export default sidebar;
