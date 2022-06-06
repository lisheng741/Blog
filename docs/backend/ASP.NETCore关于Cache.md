# ASP.NET Core 6.0 关于 Cache



## 缓存

官方文档：[缓存 Caching](https://docs.microsoft.com/zh-cn/aspnet/core/performance/caching/overview?view=aspnetcore-6.0)

分两种：Memory Cache 和 Distributed Caching

### Memory Cache

内存缓存相关 NuGet 包：

MemoryCache：[Microsoft.Extensions.Caching.Memory](https://www.nuget.org/packages/Microsoft.Extensions.Caching.Memory/)

### Distributed Caching

分布式缓存相关 NuGet 包：

SQL Server：[Microsoft.Extensions.Caching.SqlServer](https://www.nuget.org/packages/Microsoft.Extensions.Caching.SqlServer)

Redis：[Microsoft.Extensions.Caching.StackExchangeRedis](https://www.nuget.org/packages/Microsoft.Extensions.Caching.StackExchangeRedis)

NCache：[NCache.Microsoft.Extensions.Caching.OpenSource](https://www.nuget.org/packages/NCache.Microsoft.Extensions.Caching.OpenSource)



## Memory Cache

[IMemoryCache ](https://docs.microsoft.com/zh-cn/dotnet/api/microsoft.extensions.caching.memory.imemorycache)接口

注入服务：

```csharp
builder.Services.AddMemoryCache();
```

测试语句：

```csharp
app.Map("/test", (IMemoryCache cache) =>
{
    cache.Set("test", "test123");
    var test = cache.Get("test");
    return test;
});
```



## 分布式缓存 - 默认

MemoryCache 

```csharp
builder.Services.AddDistributedMemoryCache();
```



## 分布式缓存 - Redis

### 相关 Nuget 包

[StackExchange.Redis](https://www.nuget.org/packages/StackExchange.Redis/)：开源项目，应用广泛

[Microsoft.Extensions.Caching.Redis](https://www.nuget.org/packages/Microsoft.Extensions.Caching.Redis/)：微软官方包，这个版本只到 2.2.0，在 2018 年停止更新了，是前期的包。

[Microsoft.Extensions.Caching.StackExchangeRedis](https://www.nuget.org/packages/Microsoft.Extensions.Caching.StackExchangeRedis/7.0.0-preview.3.22178.4)：这个应该是接上 Microsoft.Extensions.Caching.Redis 更新的包，目前还在持续更新。该依赖于 StackExchange.Redis 这个包。

### IDistributedCache 接口

[IDistributedCache](https://docs.microsoft.com/zh-cn/dotnet/api/microsoft.extensions.caching.distributed.idistributedcache) 接口

- [Get](https://docs.microsoft.com/zh-cn/dotnet/api/microsoft.extensions.caching.distributed.idistributedcache.get)、[GetAsync](https://docs.microsoft.com/zh-cn/dotnet/api/microsoft.extensions.caching.distributed.idistributedcache.getasync)：如果在缓存中找到，则接受字符串键并以 `byte[]` 数组的形式检索缓存项。
- [Set](https://docs.microsoft.com/zh-cn/dotnet/api/microsoft.extensions.caching.distributed.idistributedcache.set)、[SetAsync](https://docs.microsoft.com/zh-cn/dotnet/api/microsoft.extensions.caching.distributed.idistributedcache.setasync)：使用字符串键将项（作为 `byte[]` 数组）添加到缓存。
- [Refresh](https://docs.microsoft.com/zh-cn/dotnet/api/microsoft.extensions.caching.distributed.idistributedcache.refresh)、[RefreshAsync](https://docs.microsoft.com/zh-cn/dotnet/api/microsoft.extensions.caching.distributed.idistributedcache.refreshasync)：根据键刷新缓存中的项，重置其可调到期超时（如果有）。
- [Remove](https://docs.microsoft.com/zh-cn/dotnet/api/microsoft.extensions.caching.distributed.idistributedcache.remove)、[RemoveAsync](https://docs.microsoft.com/zh-cn/dotnet/api/microsoft.extensions.caching.distributed.idistributedcache.removeasync)：根据字符串键删除缓存项。

### 使用步骤

#### 1 准备配置信息

```json
"Cache": {
  "Redis": "127.0.0.1:6379,password=123456,DefaultDatabase=6"
}
```

#### 2 注册服务

```csharp
builder.Services.AddStackExchangeRedisCache(options =>
{
    options.Configuration = builder.Configuration["Cache:Redis"];
    options.InstanceName = "SampleInstance";
});
```

#### 3 测试控制器

```csharp
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Caching.Distributed;
using System.Text;

namespace RedisTest.Controllers;

[Route("api/[controller]/[action]")]
[ApiController]
public class TestController : ControllerBase
{
    private readonly IDistributedCache _cache;

    public TestController(IDistributedCache cache)
    {
        _cache = cache;
    }

    [HttpGet]
    public async Task Set(string key, string value, double expiration)
    {
        var encodedValue = Encoding.UTF8.GetBytes(value);
        await _cache.SetAsync(key, encodedValue, new DistributedCacheEntryOptions() { AbsoluteExpiration = DateTime.Now.AddSeconds(expiration) });
    }

    [HttpGet]
    public async Task<string?> Get(string key)
    {
        var encodedValue = await _cache.GetAsync(key);
        if (encodedValue == null) return null;
        return Encoding.UTF8.GetString(encodedValue);
    }
}
```



## 参考来源

[.net 6 简单使用redis](https://blog.csdn.net/weixin_44442366/article/details/124206112)

[ASP.NET Core 中的分布式缓存](https://docs.microsoft.com/zh-cn/aspnet/core/performance/caching/distributed?view=aspnetcore-6.0)