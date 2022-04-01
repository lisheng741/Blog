# MySQL安装



## 1 下载

这里下载 `5.7.19` ：[下载地址](https://downloads.mysql.com/archives/community/)

选择 Product Version、Operating System 和 OS Version 下载对应的 ZIP 包。



## 2 解压并安装

这里解压到

```shell
D:\Mysql\mysql-5.7.19-winx64
```

### 2.1 配置环境变量

此电脑（右键） -> 属性 -> 高级系统设置 -> 高级 -> 环境变量 -> 系统变量 -> （找到变量名 Path 的变量）编辑 -> 新建

将解压路径的 bin 文件路径复制进来。

这里配置的值为：

```shell
D:\Mysql\mysql-5.7.19-winx64\bin
```

### 2.2 设置配置文件

在 MySQL 根目录下（这里是 `D:\Mysql\mysql-5.7.19-winx64`）新建一个 `my.ini` 文件，右键编辑：

```shell
[mysql]
default-character-set=utf8 

[mysqld]
port=3306 
basedir=D:\\Mysql\\mysql-5.7.19-winx64
datadir=D:\\Mysql\\mysql-5.7.19-winx64\\data
max_connections=200
character-set-server=utf8
default-storage-engine=INNODB
```

### 2.3 命令行安装并启动

管理员运行 cmd ，进入 MySQL 根目录（如果按2.1设置了环境变量，可以不用进入根目录，直接管理员运行cmd）

```shell
#安装
mysqld install
#初始化
mysqld --initialize-insecure --user=mysql
#启动服务
net start mysql
```

### 2.4 修改 `root` 账号密码

登入并修改密码

```shell
#登录
mysql -u root -p
#提示"Enter password:"，则直接回车，因为没密码

#修改root密码为：123456
alter user 'root'@'localhost' identified by '123456'
```

