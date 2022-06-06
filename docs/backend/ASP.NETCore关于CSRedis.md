# ASP.NET Core 关于 CSRedis



## 安装

### 安装 Redis 服务器

[Windows 安装 Redis5.0](https://www.cnblogs.com/clis/p/14396338.html)

### 项目引入 CSRedis

NuGet 包引入 CSRedisCore，这里引入的是 v3.6.6 版本

[csredis源码链接](https://github.com/2881099/csredis)



## 使用

### 1、创建连接

```c#
//创建连接
//var csredis = new CSRedis.CSRedisClient(_configuration.GetSection("Cache:ConnectionString").Value);
var csredis = new CSRedis.CSRedisClient("127.0.0.1:6379,password=123,defaultDatabase=1,poolsize=50,ssl=false,writeBuffer=10240");

//初始化
RedisHelper.Initialization(csredis);
```

### 2、通过静态类访问

```c#
//设置 string 类型的值
RedisHelper.Set("test", "test string");
//获取 string 类型的值
string str = RedisHelper.Get("test");
```



## 参考来源

[.Net Core使用Redis-从安装到使用](https://www.cnblogs.com/Tassdar/p/10305723.html)

