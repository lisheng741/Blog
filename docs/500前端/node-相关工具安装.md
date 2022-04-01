# node相关工具



## node 安装

> node 是一个基于 chrome V8 引擎的 JavaScript 运行环境；一个让 JavaSrcipt 运行在服务端的开发平台；简单的说，node 就是运行在服务端的 JavaScript

### 1 下载安装

[官网下载](http://nodejs.cn/download/)

### 2 查看是否安装

```shell
node -v
```

### 3 查看 npm 是否安装

```shell
npm -v
```

### <span id="node-history">4 node 历史版本下载</span>

**注意：**据说双数（2，4，6，8）版本一般为正式版（未验证）

[官网以往版本](https://nodejs.org/zh-cn/download/releases/)



## 安装 nvm

> 用于管理 node 版本

### 1 下载安装

**注意：** 安装路径不能有空格

[下载地址](https://github.com/coreybutler/nvm-windows/releases)

下载最新的 `nvm-setup.zip` 解压安装

###  2 查看是否安装

```shell
nvm version
#nvm   #这个也可以，还会显示所有可用命令
```

### 3 安装其他版本 node

[node 历史版本查看](#node-history)

```shell
nvm install v10.0.0  #安装v10.0.0版本node
```

### 4 切换 node 版本

```shell
nvm use 10.0.0
```

### 5 查看当前所有 node 版本

```shell
nvm list
```

### 6 切换 nvm 镜像

nvm 默认用的是 node.js 官网的下载，比较慢，可以切换成国内淘宝镜像服务器。

在 nvm 的安装路径下，找到 settings.txt，打开文件，在后面添加两行。

```shell
node_mirror: https://npm.taobao.org/mirrors/node/
npm_mirror: https://npm.taobao.org/mirrors/npm/
```



## 切换 npm 镜像，或安装 cnpm

> cnpm 是 npm 的一个插件，cnpm 用法和 npm 用法一致，只是执行命令的时候将 npm 改为 cnpm。这样做的意义是：国内 npm 速度可能不行，cnpm 服务器在国内（淘宝团队）速度可能会好点。

**注意：**切换镜像，或安装 cnpm，二者选1即可

### 0 切换 npm 镜像

切换成淘宝镜像

```shell
npm get registry  #查看当前镜像地址
npm config set registry http://registry.npm.taobao.org/  #切换成淘宝的镜像
```

切换回原 npm 镜像

```shell
npm config set registry https://registry.npmjs.org/  #切回原来的镜像
```

### 0 安装 cnpm

```shell
npm install -g cnpm --registry=https://registry.npm.taobao.org  #安装 淘宝镜像源 cnpm
```

### 0 安装 nrm

如果选择切换 npm 镜像，可以考虑装一个 nrm，用于管理切换

#### 0.1 安装

```shell
nrm install -g nrm
```

#### 0.2 使用

```shell
nrm ls  #查看可选源nrm use taobao  #切换
```

#### 0.3 其他操作

```shell
nrm add [registry] [url]  #添加，reigstry为源名，url为源的路径nrm del [registry]  #删除nrm test npm  #测试响应时间
```



## 其他工具

### yarn

### webpack

```shell
npm install -g webpacknpm install -g webpack-cli
```

