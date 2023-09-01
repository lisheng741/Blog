# Git-生成SSH公私钥，并配置到Git仓库

[[toc]]



## 前言

我们在 Git 下载提交时，一般使用的是 Https 的方式，细心的小伙伴会注意到另一种方式 SSH。

另外，一般使用 Https 方式向 Github/Gitee 提交代码时，需要验证账号密码，而 SSH 方式只要配置好公私钥则可以不验证账号密码（Github 目前似乎已经不支持使用账号密码，必须使用 SSH）。

本文将介绍如何使用 Git 的 SSH 方式。



## 主要流程

1. 在 Shell 中，使用 RSA 算法，生成一对公私钥
2. 在 Git 本地中配置私钥
3. 在 Git 远端仓库配置公钥



## 名词介绍

**SSH**

SSH 是 Secure Shell 的缩写，主要是网络安全的范畴。

是一种通用的、功能强大的、基于软件的网络安全解决方案。计算机每次向网络发送数据时，SSH 都会自动对其进行加密。数据到达目的地时，SSH 自动对加密数据进行解密。

加解密的过程中，需要一对密钥对，对数据进行加解密。

**RSA**

这里涉及到的加密算法是 RSA 算法，密钥是一对公私钥，公钥给别人用于加密，私钥自己存留用于解密。



## 具体操作流程

注：本人的操作环境是 windows 系统

**1 进入Git Bash**

鼠标右键【Git Bash Here】（或者文件路径里敲 Git Bash.lnk）

**2 输入生成 RSA 秘钥对的命令**

```bash
ssh-keygen -t rsa -C "your_email@example.com"
```

**3 输入秘钥名称**

```bash
Enter file in which to save the key (/c/Users/CL/.ssh/id_rsa): <输入秘钥名称/直接回车>
```

注：本例中，输入秘钥名称为：test123

**4 输入密码和确认密码**

```bash
Enter passphrase (empty for no passphrase):
Enter same passphrase again:
```

都可空，直接回车，等待生成秘钥对。

会在文件夹下，生成两个文件：

```bash
test123　　　　#私钥
test123.pub 　#公钥
```

一般会把密钥对放在 `C:\Users\个人用户名\.ssh`

**5 本地添加私钥**

```bash
ssh-add <私钥路径>
```

**6 读取公钥**

方式1：cat <公钥路径>

方式2：以文本方式打开公钥文件

将公钥文本复制，用于下一步

**7 在 Github / Gitee 添加公钥**

Github：点自己头像 >> Settings >> SSH and GPG keys >>New SSH key 

Gitee：点自己头像 >> 设置 >> SS公钥 

**8 验证 SSH 连接**

```bash
ssh -T git@github.com

# 提示如下则成功
# Hi [YourGithubUsername]! You've successfully authenticated, but GitHub does not provide shell access.
```



## 常见问题

### Error connecting to agent: No such file or directory

**报错信息**

使用 `ssh-add <私钥路径>` 时，报错

```bash
Error connecting to agent: No such file or directory
```

**解决方案**

参考：[Windows下使用ssh-add报错 Error connecting to agent: No such file or directory](https://www.cnblogs.com/attackingmilo/p/Windows-ssh-add-error.html)

打开 Windows PowerShell 检查 ssh-agent 服务是否启动成功

```bash
get-service ssh*
```

状态是 Stopped 状态，则启动服务

```bash
Set-Service -Name ssh-agent -StartupType Manual
Start-Service ssh-agent
```

如果启动成功，则可以继续添加秘钥




### TortoiseGit 提交报错

**报错信息**

```bash
No supported authentication methods available(server sent: publickey)
```

**解决方案**

在 TortoiseGit 设置里面 >> Network >> SSH >> SSH client

改成 Git 的 SSH lient

这里本人的本机的路径为：

```bash
C:\Program Files\Git\usr\bin\ssh.exe
```



## 参考来源

[july_young 的 git添加私钥](https://blog.csdn.net/july_young/article/details/82712574)

[wangju003 的 git配置密钥（私钥、ssh、公钥）](https://www.cnblogs.com/kaerxifa/p/11164206.html)

[Disconnected: No supported authentication methods available(server sent: publickey) 的解决办法](https://blog.csdn.net/Hello_World_QWP/article/details/82216345)