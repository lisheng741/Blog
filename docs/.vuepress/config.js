const utils = require('./utils')

module.exports = {
  title: '芦荟柚子茶的博客',
  description: 'cl_lis blog',
  base: '/blog',
  themeConfig: {
    nav: [
      { text: '首页', link: '/' },
      { text: '1记录', link: '/100记录/' },
      { text: '2计基', link: '/200计基' },
      { text: '5前端', link: '/500前端' },
      { text: '6后端', link: '/600后端' },
      { text: '8数据库', link: '/800数据库' },
      // { text: '9安全', link: '/900安全' },
    ],
    sidebar: utils.inferSiderbars()
  }
}
