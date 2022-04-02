# Git-同时提交到多个仓库

[[toc]]



## 基本流程

1. 创建多个远端 Git 仓库
2. 本地配置多个远端 Git 地址
3. 提交时，自动提交到多个 Git 仓库



## 操作流程

### 1 建立多个仓库

1. 创建 Gitee 仓库，并根据提示初始化
2. 创建 Github 仓库，导入上一步中创建的 Gitee 仓库

### 2 设置多个提交地址

设置第一个仓库：

```bash
git remote add origin https://gitee.com/lisheng741/blogs.git
```

设置第二个仓库：

```bash
git remote set-url --add origin git@github.com:lisheng741/blogs.git
```

打开 `/.git/config` 配置文件，可以看到

```bash
[remote "origin"]
	url = https://gitee.com/lisheng741/blogs.git
	fetch = +refs/heads/*:refs/remotes/origin/*
	url = git@github.com:lisheng741/blogs.git
```



## 参考来源

[如何使用Git将项目同时托管到GitHub和Gitee仓库](https://blog.csdn.net/qq_42730750/article/details/109226367)

[Git提交到多个远程仓库](https://blog.csdn.net/zongzhankui/article/details/78888651)

