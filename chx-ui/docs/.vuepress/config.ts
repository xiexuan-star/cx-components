module.exports = {
  theme: '@vuepress/theme-default',
  title: 'Chx-UI 文档',
  description: 'Chx-UI技术文档与示例',
  base: '/',
  port: '8080',
  bundler: '@vuepress/bundler-vite',
  themeConfig: {
    navbar: [
      {
        text: '首页',
        link: '/'
      },
      {
        text: '组件',
        link: '/components/'
      }
    ],
    sidebar: [
      '/README.md',
      '/components/select.md',
    ],
  },
  head: [],
  plugins: ['demo-container'],
  markdown: {}
};
