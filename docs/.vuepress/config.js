const utils = require('./utils')

module.exports = {
  title: '芦荟柚子茶的博客',
  description: 'cl_lis blog',
  base: '/blog',
  themeConfig: {
    nav: [
      { text: '首页', link: '/' },
      { text: '记录', link: '/record/' },
      // { text: '前端', link: '/fronted/' },
      // { text: '6后端', link: '/backend/' },
    ],
    sidebar: utils.inferSiderbars()
  }
}
