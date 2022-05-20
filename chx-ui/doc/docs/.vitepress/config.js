import nav from './configs/nav';
import sidebar from './configs/sidebar';
import Demo from 'vitepress-theme-demoblock';

/**
 * @type {import('vitepress').UserConfig}
 */
const config = {
  title: 'chx-ui文档',
  vite: {
    server: {
      port: 9001
    }
  },
  themeConfig: {
    nav,
    sidebar,
    editLinks: true,
    editLinkText: '在 GitHub 上编辑此页',
    lastUpdated: '上次更新',
  },
  markdown: {
    // options for markdown-it-anchor
    anchor: { permalink: false },

    // options for markdown-it-toc
    toc: { includeLevel: [1, 2] },

    config: (md) => {
      md.use(Demo.demoBlockPlugin, {
        cssPreprocessor: 'less'
      });
    }
  }
};

export default config;
