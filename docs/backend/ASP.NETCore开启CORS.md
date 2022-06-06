# ASP.NET Core 6.0 开启 CORS 跨域请求



## 配置步骤

### 1 配置信息

appsettings.json 添加节点：

```json
"AllowCors": [ "https://www.baidu.com", "https://gitee.com" ]
```

Program.cs 中读取配置信息：

```csharp
var configuration = builder.Configuration;
var urls = configuration.GetSection("AllowCors").Get<string []>();
```

### 2 注册服务

```csharp
builder.Services.AddCors(options =>
{
    options.AddPolicy("default", policy =>
    {
        policy.WithOrigins(urls);
    });
});
```

### 3 配置管道

```csharp
app.UseHttpsRedirection();
app.UseCors("default");
app.UseAuthorization();
```

