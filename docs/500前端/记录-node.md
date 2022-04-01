# Node





```js
//运行 js 脚本
node file.js
```



### http 模块

```js
var http = require("http");
```



## 包

### plop 

脚手架工具

简化重复的创建文件、编写基本内容过程





## npm

### 基本命令

#### 1 安装单个软件包

```shell
npm install <package-name> [--save/--save-dev]
```

- `--save` 安装并添加条目到 `package.json` 文件的 dependencies。
- `--save-dev` 安装并添加条目到 `package.json` 文件的 devDependencies。

区别主要是，`devDependencies` 通常是开发的工具（例如测试的库），而 `dependencies` 则是与生产环境中的应用程序相关。

#### 2 更新软件包

```shell
npm update
npm update <package-name>
```

#### 3 运行任务

```shell
npm run <task-name>
```

例如：

```json
{
  "scripts": {
    "start-dev": "node lib/server-development",
    "start": "node lib/server-production"
  },
}
```

使用此特性运行 Webpack 是很常见的：

```json
{
  "scripts": {
    "watch": "webpack --watch --progress --colors --config webpack.conf.js",
    "dev": "webpack --progress --colors --config webpack.conf.js",
    "prod": "NODE_ENV=production webpack -p --config webpack.conf.js",
  },
}
```

因此可以运行如下，而不是输入那些容易忘记或输入错误的长命令：

```shell
$ npm run watch
$ npm run dev
$ npm run prod
```

#### 查看包版本

```shell
//查看包版本
npm view [xxx] versions
如：npm view webpack versions
```

