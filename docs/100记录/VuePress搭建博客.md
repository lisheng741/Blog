# VuePress搭建博客



## 参考来源

[一篇带你用 VuePress + Github Pages 搭建博客](https://github.com/mqyqingfeng/Blog/issues/235)



## 1 初始化

```bash
#创建并进入一个新目录
mkdir vuepress-test && cdd vuepress-test

#使用包管理器进行初始化
yarn init # npm init

#安装 vuepress 依赖为本地依赖
yarn add -D vuepress # npm install -D vuepress

#创建你的第一篇文档，VuePress 会以 docs 为文档根目录，所以这个 README.md 相当于主页
mkdir docs && echo '# Hello VuePress' > docs/README.md
```

在 package.json 中添加一些 scripts

```json
{
    "scripts": {
        "dev" : "vuepress dev docs",
        "build" : "vuepress build docs"
    }
}
```

启动本地服务器

```bash
yarn dev # npm run dev
```



## 2 配置

路径：/docs/.vuepress/config.js

```js
module.exports = {
  title: '标题',
  description: '描述'
}
```

