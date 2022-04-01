# Git 问题记录



## Git 基本操作

参考来源：[Git基本操作命令合集](https://www.cnblogs.com/hong-fithing/p/12938287.htm)

### 代码仓库

```bash
git init  # 将当前目录初始化为 Git 代码库
git init [project-name]  # 新建一个目录，并初始化为 Git 代码库
git clone [url]  # 下载一个项目和它的完整代码历史
```

### 分支

```bash
git branch #列出所有本地分支
git branch -a #列出所有本地和远程分支
git checkout [branch_name] #切换到指定分支，并更新工作区
```

### 配置

```bash
#基本格式 --list 简写 -l
git config --[local|global|system] --list
git config --local -l #查看仓库级的config
git config --global -l #查看全局级的config
```





## 生成SSH公钥、私钥，并配置到Github

### 1 进入Git Bash

鼠标右键【Git Bash Here】（或者文件路径里敲 Git Bash.lnk）

### 2 输入生成 Rsa 秘钥对的命令

```bash
ssh-keygen -t rsa -C "your_email@example.com"
```

### 3 输入秘钥名称

```bash
Enter file in which to save the key (/c/Users/CL/.ssh/id_rsa): <输入秘钥名称/直接回车>
```

注：本例中，输入秘钥名称为：lisheng741

### 4 输入密码和确认密码

```bash
Enter passphrase (empty for no passphrase):
Enter same passphrase again:
```

都可空，直接回车，等待生成秘钥对。

**本地会生成两个文件：**

```bash
lisheng741　　　　#私钥
lisheng741.pub 　#公钥
```

### 5 本地添加私钥

```bash
ssh-add <私钥路径>
```

### 6 读取公钥

方式1：cat <公钥路径>

方式2：以文本方式打开公钥文件

将公钥文本复制，用于下一步

### 7 在 Github / Gitee 添加公钥

Github：点自己头像 >> Settings >> SSH and GPG keys >>New SSH key 

Gitee：点自己头像 >> 设置 >> SS公钥 

### 参考来源

https://blog.csdn.net/july_young/article/details/82712574 （july_young 的 git添加私钥）

https://www.cnblogs.com/kaerxifa/p/11164206.html （wangju003 的 git配置密钥（私钥、ssh、公钥））



## TortoiseGit 提交报错

提示：

No supported authentication methods available(server sent: publickey)

### 解决方案

设置里面 >> Network >> SSH >> SSH client

改成 Git 的 SSH lient

这里本机的路径为：

```bash
C:\Program Files\Git\usr\bin\ssh.exe
```

### 参考来源

https://blog.csdn.net/Hello_World_QWP/article/details/82216345





## Git同时提交到多个仓库

### 建立多个仓库

1. 创建 Gitee 仓库，并根据提示初始化
2. 创建 Github 仓库，导入上一步中创建的 Gitee 仓库

### 设置多个提交地址

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

### 参考文献

如何使用Git将项目同时托管到GitHub和Gitee仓库：https://blog.csdn.net/qq_42730750/article/details/109226367

Git提交到多个远程仓库：https://blog.csdn.net/zongzhankui/article/details/78888651

