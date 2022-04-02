# vue-element-admin执行npm install时报错 

[[toc]]



## 问题与分析

安装项目依赖时报错，主要报错信息：

```bash
A git connection error occurred
command git --no-replace-objects ls-remote ssh://git@github.com/adobe-webplatform/eve.git
fatal: Could not read from remote repository.
```

完整报错信息：

```bash
npm ERR! code 128
npm ERR! git dep preparation failed
npm ERR! command D:\nodejs\node.exe D:\nvm\v16.14.0\node_modules\npm\bin\npm-cli.js install --force --cache=C:\Users\AppData\Local\npm-cache --prefer-offline=false --prefer-online=false --offline=false --no-progress --no-save --no-audit --include=dev --include=peer --include=optional --no-package-lock-only --no-dry-run
npm ERR! npm WARN using --force Recommended protections disabled.
npm ERR! npm ERR! code 128
npm ERR! npm ERR! A git connection error occurred
npm ERR! npm ERR! command git --no-replace-objects ls-remote ssh://git@github.com/adobe-webplatform/eve.git
npm ERR! npm ERR! kex_exchange_identification: read: Connection reset by peer
npm ERR! npm ERR! Connection reset by 20.205.243.166 port 22
npm ERR! npm ERR! fatal: Could not read from remote repository.
npm ERR! npm ERR!
npm ERR! npm ERR! Please make sure you have the correct access rights
npm ERR! npm ERR! and the repository exists.
npm ERR!
npm ERR! npm ERR! A complete log of this run can be found in:
npm ERR! npm ERR!     C:\Users\AppData\Local\npm-cache\_logs\2022-03-04T08_29_17_072Z-debug-0.log072Z-debug-0.log

npm ERR! A complete log of this run can be found in:                                      g-0.log
npm ERR!     C:\Users\AppData\Local\npm-cache\_logs\2022-03-04T08_27_27_482Z-debug-0.log
```

**解析**

报错的大概意思是说有个 Git 的连接错误，Git 的地址是：`ssh://git@github.com/adobe-webplatform/eve.git`

可以看出，这是一个 ssh 地址，需要在 github 上面录有公钥（该公钥与本地的私钥是一对，以标识本地身份），且有仓库访问权限才能正常获取该仓库。

mark：报该错误时，本人并没有设置公钥，故而不能确定是否可以通过设置公钥解决。



## 解决思路

将该地址替换为其他可访问的地址

### **解决方案1**

将该地址替换为可访问的镜像网站地址

```bash
git config --global url."https://hub.fastgit.xyz/".insteadOf "ssh://git@github.com/"
```

### **解决方案2**

修改 Git 的协议（ssh 替换为 https）

```bash
git config --global url."https://github.com/".insteadOf "ssh://git@github.com/"
```

如果电脑能正常访问 github 是没有问题的，但是国内环境经常被墙，所以还是会失败。

装个 fastgithub 并运行可以解决

fastgithub 使用说明：https://zhuanlan.zhihu.com/p/428454772

fastgithub 下载地址：https://github.com/dotnetcore/fastgithub/releases

github 下载可能很慢，这里给个百度盘的下载地址：链接：https://pan.baidu.com/s/17PiDQU1jaXftKtSjwjocJg 提取码：6666

这样基本上就不会有什么问题了。



