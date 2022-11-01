const utils = require('./utils')

module.exports = {
  title: '芦荟柚子茶的博客',
  description: 'cl_lis blog',
  base: '/blog/',
  locales: {
    '/': {
      lang: 'zh-CN'
    }
  },
  themeConfig: {
    nav: [
      { text: '首页', link: '/' },
      { text: '项目', link: '/projects/' },
      { text: '记录', link: '/record/' },
      { text: '前端', link: '/fronted/' },
      { text: '后端', link: '/backend/' },
      { text: '感谢', link: '/thanks/' },
    ],
    sidebar: utils.inferSiderbars(),
    lastUpdated: '上次更新',
    repo: 'lisheng741/blog',
    editLinks: true,
    docsDir: 'docs',
    editLinkText: '在 GitHub 上编辑此页',
    sidebarDepth: 1,
    markdown: {
      config: md => {
        // use more markdown-it plugins!
        md.use(require('markdown-it-include'))
      }
    }
  }
}
