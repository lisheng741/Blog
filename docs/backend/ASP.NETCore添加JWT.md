# ASP.NET Core 6.0 添加 JWT 认证和授权

[[toc]]



## 1 前言

### 1.1 本文介绍

本文将分别简单介绍 Authentication（认证） 和 Authorization（授权）。

并以简单的例子在 ASP.NET Core 6.0 的 WebAPI 中以 JWT 方案实现认证，并辅以相应的授权例子。

### 1.2 相关名词

Authentication 和 Authorization 长得很像，傻傻分不清楚。

Authentication（认证）：标识用户的身份，一般发生在登录的时候。

Authorization（授权）：授予用户权限，指定用户能访问哪些资源；授权的前提是知道这个用户是谁，所以授权必须在认证之后。

其实，认证和授权其实是不分家的。



## 2 认证（Authentication）

### 2.1 基本步骤

1. 安装相关 Nuget 包：Microsoft.AspNetCore.Authentication.JwtBearer
2. 准备配置信息（密钥等）
3. 注册服务
4. 调用中间件
5. 实现一个 JwtHelper，用于生成 Token
6. 控制器限制访问（添加 Authorize 标签）

### 2.2 安装 Nuget 包

安装 Microsoft.AspNetCore.Authentication.JwtBearer

在控制台中：

```bash
dotnet add package Microsoft.AspNetCore.Authentication.JwtBearer -v 6.0.1
```

### 2.3 准备配置信息

在 appsetting.json 中，添加一个 Jwt 节点

```json
"Jwt": {
    "SecretKey": "lisheng741@qq.com",
    "Issuer": "WebAppIssuer",
    "Audience": "WebAppAudience"
}
```

### 2.4 注册服务和调用中间件

在 Program.cs 文件中注册服务，和调用相关中间件。

```csharp
//引入所需的命名空间
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;

var configuration = builder.Configuration;

//注册服务
builder.Services.AddAuthentication(options =>
{
    options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(options =>
{
    options.TokenValidationParameters = new TokenValidationParameters()
    {
        ValidateIssuer = true, //是否验证Issuer
        ValidIssuer = configuration["Jwt:Issuer"], //发行人Issuer
        ValidateAudience = true, //是否验证Audience
        ValidAudience = configuration["Jwt:Audience"], //订阅人Audience
        ValidateIssuerSigningKey = true, //是否验证SecurityKey
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["Jwt:SecretKey"])), //SecurityKey
        ValidateLifetime = true, //是否验证失效时间
        ClockSkew = TimeSpan.FromSeconds(30), //过期时间容错值，解决服务器端时间不同步问题（秒）
        RequireExpirationTime = true,
    };
});

//调用中间件：UseAuthentication（认证），必须在所有需要身份认证的中间件前调用，比如 UseAuthorization（授权）。
app.UseAuthentication();
app.UseAuthorization();
```

### 2.5 JwtHelper 类实现

主要是用于生成 JWT 的 Token。

```csharp
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace AuthenticationTest;

public class JwtHelper
{
    private readonly IConfiguration _configuration;

    public JwtHelper(IConfiguration configuration)
    {
        _configuration = configuration;
    }

    public string CreateToken()
    {
        // 1. 定义需要使用到的Claims
        var claims = new[]
        {
            new Claim(ClaimTypes.Name, "u_admin"), //HttpContext.User.Identity.Name
            new Claim(ClaimTypes.Role, "r_admin"), //HttpContext.User.IsInRole("r_admin")
            new Claim(JwtRegisteredClaimNames.Jti, "admin"),
            new Claim("Username", "Admin"),
            new Claim("Name", "超级管理员")
        };

        // 2. 从 appsettings.json 中读取SecretKey
        var secretKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:SecretKey"]));

        // 3. 选择加密算法
        var algorithm = SecurityAlgorithms.HmacSha256;

        // 4. 生成Credentials
        var signingCredentials = new SigningCredentials(secretKey, algorithm);

        // 5. 根据以上，生成token
        var jwtSecurityToken = new JwtSecurityToken(
            _configuration["Jwt:Issuer"],     //Issuer
            _configuration["Jwt:Audience"],   //Audience
            claims,                          //Claims,
            DateTime.Now,                    //notBefore
            DateTime.Now.AddSeconds(30),    //expires
            signingCredentials               //Credentials
        );

        // 6. 将token变为string
        var token = new JwtSecurityTokenHandler().WriteToken(jwtSecurityToken);

        return token;
    }
}
```

该 JwtHelper 依赖于 IConfiguration（为了读取配置文件），将 JwtHelper 的创建交由 DI 容器，在 Program.cs 中添加服务：

```csharp
builder.Services.AddSingleton(new JwtHelper(configuration));
```

将 JwtHelper 注册为单例模式。

### 2.6 控制器配置

新建一个 AccountController，以构造函数方式注入 JwtHelper，添加两个 Action：GetToken 用于获取 Token，GetTest 打上 [Authorize] 标签用于验证认证。

```csharp
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace AuthenticationTest.Controllers;

[Route("api/[controller]/[action]")]
[ApiController]
public class AccountController : ControllerBase
{
    private readonly JwtHelper _jwtHelper;

    public AccountController(JwtHelper jwtHelper)
    {
        _jwtHelper = jwtHelper;
    }

    [HttpGet]
    public ActionResult<string> GetToken()
    {
        return _jwtHelper.CreateToken();
    }

    [Authorize]
    [HttpGet]
    public ActionResult<string> GetTest()
    {
        return "Test Authorize";
    }
}
```

### 2.7 测试调用

**方式一：通过 Postman、Apifox 等接口调试软件调试**

使用 Postman 调用 /api/Account/GetToken 生成 Token

在调用 /api/Account/GetTest 时传入 Token，得到返回结果

**方式二：在浏览器控制台调试**

调试 /api/Account/GetToken

```js
var xhr = new XMLHttpRequest();
xhr.addEventListener("readystatechange", function() {
   if(this.readyState === 4) {
      console.log(token = this.responseText); //这里用了一个全局变量 token，为下一个接口服务
   }
});
xhr.open("GET", "/api/Account/GetToken");
xhr.send();
```

调试 /api/Account/GetTest

```js
var xhr = new XMLHttpRequest();
xhr.addEventListener("readystatechange", function() {
   if(this.readyState === 4) {
      console.log(this.status, this.responseText); //this.status为响应状态码，401为无认证状态
   }
});
xhr.open("GET", "/api/Account/GetTest");
xhr.setRequestHeader("Authorization",`Bearer ${token}`); //附带上 token
xhr.send();
```



## 3 授权（Authorization）

**注意**：授权必须基于认证，即：若没有完成上文关于认证的配置，则下面的授权是不会成功的。

### 3.1 基本介绍

其实 JWT 是认证的一种方案，其他的方案如 Cookies。本节介绍的授权，实际上与 JWT 没有什么关系，是基于 ASP.NET Core 的基本能力。

这一部分，将先介绍相关标签、授权方式，再介绍基于策略的授权。这三部分大致的内容如下描述：

相关标签：Authorize 和 AllowAnonymous

授权方式：介绍三种授权方式（Policy、Role、Scheme）

基于策略（Policy）的授权：深入 Policy 授权方式

### 3.2 相关标签（Attribute）

授权相关标签具体请查考官方文档[简单授权](https://docs.microsoft.com/zh-cn/aspnet/core/security/authorization/simple?view=aspnetcore-6.0)

#### 3.2.1 [Authorize]

打上该标签的 Controller 或 Action 必须经过认证，且可以标识需要满足哪些授权规则。

授权规则可以是 Policy（策略）、Roles（角色） 或 AuthenticationSchemes（方案）。

```csharp
[Authorize(Policy = "", Roles ="", AuthenticationSchemes ="")]
```

#### 3.2.2 [AllowAnonymous]

允许匿名访问，级别高于 [Authorize] ，若两者同时作用，将生效 [AllowAnonymous]

### 3.3 授权方式

基本上授权只有：Policy、Role、Scheme 这3种方式，对应 Authorize 标签的3个属性。

#### 3.3.1 Policy（策略）

推荐的授权方式，在 ASP.NET Core 的官方文档提及最多的。一个 Policy 可以包含多个要求（要求可能是 Role 匹配，也可能是 Claims 匹配，也可能是其他方式。）

下面举个基础例子（说是基础例子，主要是基于 Policy 的授权方式可以不断深入追加一些配置）：

在 Program.cs 中，添加两条 Policy：

policy1 要求用户拥有一个 Claim，其 ClaimType 值为 EmployeeNumber。

policy2 要求用户拥有一个 Claim，其 ClaimType 值为 EmployeeNumber，且其 ClaimValue 值为1、2、3、4 或 5。

```csharp
builder.Services.AddAuthorization(options => {
    options.AddPolicy("policy1", policy => policy.RequireClaim("EmployeeNumber"));
    options.AddPolicy("policy2", policy => policy.RequireClaim("EmployeeNumber", "1", "2", "3", "4", "5"));
})
```

在控制器中添加 [Authorize] 标签即可生效：

```csharp
[Authorize(Policy = "policy1")]
public class TestController : ControllerBase
```

或在控制器的 Action 上：

```csharp
public class TestController : ControllerBase
{
    [Authorize(Policy = "policy1")]
    public ActionResult<string> GetTest => "GetTest";
}
```

#### 3.3.2 Role（角色）

基于角色授权，只要用户拥有角色，即可通过授权验证。

在认证时，给用户添加角色相关的 Claim ，即可标识用户拥有的角色（注：一个用户可以拥有多个角色的 Claim），如：

```csharp
new Claim(ClaimTypes.Role, "admin"),
new Claim(ClaimTypes.Role, "user")
```

在 Controller 或 Action 中：

```csharp
[Authorize(Roles = "user")]
public class TestController : ControllerBase
{
    public ActionResult<string> GetUser => "GetUser";
    
    [Authorize(Roles = "admin")] //与控制器的Authorize叠加作用，除了拥有user，还需拥有admin
    public ActionResult<string> GetAdmin => "GetAdmin";
    
    [Authorize(Roles = "user,admin")] //user 或 admin 其一满足即可
    public ActionResult<string> GetUserOrAdmin => "GetUserOrAdmin";
}
```

#### 3.3.3 Scheme（方案）

方案如：Cookies 和 Bearer，当然也可以是自定义的方案。

由于这种方式不常用，这里不做展开，请参考官方文档[按方案限制标识](https://docs.microsoft.com/zh-cn/aspnet/core/security/authorization/limitingidentitybyscheme?view=aspnetcore-6.0)。

### 3.4 基于策略（Policy）的授权

上面已经提及了一个基于策略授权的基础例子，下面将继续深入这种授权方式。

授权主要的方式，是通过 Handler 程序判断授权，需要实现的接口是 IAuthorizationHandler。

基于策略的授权，需要继承 AuthorizationHandler\<TRequirement> 并重写 HandleRequirementAsync 方法，该方法需要 Requirement 作为入参，相关的接口是 IAuthorizationRequirement。

具体步骤为：

1. 准备自定义的 Requirement 实现 IAuthorizationRequirement
2.  自定义 Handler 程序继承 AuthorizationHandler\<TRequirement> 并重写 HandleRequirementAsync 方法

#### 3.4.1 定义权限项

在实现 Requirement 之前，我们需要先定义一些权限项，主要用于后续作为 Policy 的名称，并传入 我们实现的 Requirement 之中。

```csharp
public static class Permissions
{
    public const string User = "User";
    public const string UserCreate = User + ".Create";
    public const string UserDelete = User + ".Delete";
    public const string UserUpdate = User + ".Update";
}
```

如上，定义了“增”、“删”、“改”等权限，其中 User 将拥有完整权限。

#### 3.4.2 实现 Requirement

```csharp
public class PermissionAuthorizationRequirement : IAuthorizationRequirement
{
    public PermissionAuthorizationRequirement(string name)
    {
        Name = name;
    }
    public string Name { get; set; }
}
```

使用 Name 属性表示权限的名称，与 Permissions 中的常量对应。

#### 3.4.3 实现授权处理程序 Handler

这里**假定**用户的 Claim 中 ClaimType 为 Permission 的项，如：

```csharp
new Claim("Permission", Permissions.UserCreate),
new Claim("Permission", Permissions.UserUpdate)
```

如上，标识该用户用户 UserCreate 和 UserUpdate 的权限。

**注意**：当然，实际程序我们肯定不是这样实现的，这里只是简易示例。

接着，实现一个授权 Handler：

```csharp
public class PermissionAuthorizationHandler : AuthorizationHandler<PermissionAuthorizationRequirement>
{
    protected override Task HandleRequirementAsync(AuthorizationHandlerContext context, PermissionAuthorizationRequirement requirement)
    {
        var permissions = context.User.Claims.Where(_ => _.Type == "Permission").Select(_ => _.Value).ToList();
        if (permissions.Any(_ => _.StartsWith(requirement.Name)))
        {
            context.Succeed(requirement);
        }
        return Task.CompletedTask;
    }
}
```

运行 `HandleRequirementAsync` 时，会将用户的 Claim 中 ClaimType 为 Permission 的项取出，并获取其 Value 组成一个 `List<string>`。

接着验证 Requirement 是否满足授权，满足则运行 `context.Succeed` 。

#### 3.4.4 注册授权处理程序服务

在 Program.cs 中，将 `PermissionAuthorizationHandler` 添加到 DI 中：

```csharp
builder.Services.AddSingleton<IAuthorizationHandler, PermissionAuthorizationHandler>();
```

#### 3.4.5 添加授权策略

```csharp
builder.Services.AddAuthorization(options =>
{
    options.AddPolicy(Permissions.UserCreate, policy => policy.AddRequirements(new PermissionAuthorizationRequirement(Permissions.UserCreate)));
    options.AddPolicy(Permissions.UserUpdate, policy => policy.AddRequirements(new PermissionAuthorizationRequirement(Permissions.UserUpdate)));
    options.AddPolicy(Permissions.UserDelete, policy => policy.AddRequirements(new PermissionAuthorizationRequirement(Permissions.UserDelete)));
});
```

#### 3.4.6 控制器配置

控制器如下：

```csharp
[Route("api/[controller]/[action]")]
[ApiController]
public class UserController : ControllerBase
{
    [HttpGet]
    [Authorize(Permissions.UserCreate)]
    public ActionResult<string> UserCreate() => "UserCreate";

    [HttpGet]
    [Authorize(Permissions.UserUpdate)]
    public ActionResult<string> UserUpdate() => "UserUpdate";

    [HttpGet]
    [Authorize(Permissions.UserDelete)]
    public ActionResult<string> UserDelete() => "UserDelete";
}
```

基于上面的**假定**，用户访问接口的情况如下：

```bash
/api/User/UserCreate #成功
/api/User/UserUpdate #成功
/api/User/UserDelete #403无权限
```

至此，基于策略（Policy）的授权其实已经**基本完成**。

接下去的内容，将是对上面一些内容的完善或补充。

#### 3.4.7 完善：实现策略提供程序 PolicyProvider

一般添加授权策略如下是在 Program.cs 中，方式如下：

```csharp
builder.Services.AddAuthorization(options =>
{
    options.AddPolicy("policy", policy => policy.RequireClaim("EmployeeNumber"));
});
```

通过 AuthorizationOptions.AddPolicy 添加授权策略这种方式不灵活，无法动态添加。

通过实现 IAuthorizationPolicyProvider 并添加到 DI 中，可以实现动态添加 Policy。

IAuthorizationPolicyProvider 的默认实现为 DefaultAuthorizationPolicyProvider 。

实现一个 PolicyProvider 如下：

```csharp
public class TestAuthorizationPolicyProvider : DefaultAuthorizationPolicyProvider, IAuthorizationPolicyProvider
{
    public TestAuthorizationPolicyProvider(IOptions<AuthorizationOptions> options) : base(options) { }

    public new Task<AuthorizationPolicy> GetDefaultPolicyAsync()
        =>  base.GetDefaultPolicyAsync();

    public new Task<AuthorizationPolicy?> GetFallbackPolicyAsync()
        => base.GetFallbackPolicyAsync();

    public new Task<AuthorizationPolicy?> GetPolicyAsync(string policyName)
    {
        if (policyName.StartsWith(Permissions.User))
        {
            var policy = new AuthorizationPolicyBuilder(JwtBearerDefaults.AuthenticationScheme);
            policy.AddRequirements(new PermissionAuthorizationRequirement(policyName));
            return Task.FromResult<AuthorizationPolicy?>(policy.Build());
        }
        return base.GetPolicyAsync(policyName);
    }
}
```

**注意**：自定义的 `TestAuthorizationPolicyProvider` 必须实现 `IAuthorizationPolicyProvider`，否则添加到 DI 时会不生效。

在 Program.cs 中，将自定义的 PolicyProvider 添加到 DI 中：

```csharp
builder.Services.AddSingleton<IAuthorizationPolicyProvider, TestAuthorizationPolicyProvider>();
```

**注意**：只会生效最后一个添加的 PolicyProvider。

#### 3.4.8 补充：自定义 AuthorizationMiddleware

自定义 AuthorizationMiddleware 可以：

- 返回自定义的响应
- 增强（或者说改变）默认的 challenge 或 forbid 响应

具体请查看官方文档[自定义 AuthorizationMiddleware 的行为](https://docs.microsoft.com/zh-cn/aspnet/core/security/authorization/customizingauthorizationmiddlewareresponse?view=aspnetcore-6.0)

#### 3.4.9 补充：基于资源的授权

具体请查看官方文档[基于资源的授权](https://docs.microsoft.com/zh-cn/aspnet/core/security/authorization/resourcebased?view=aspnetcore-6.0)

#### 3.4.10 补充：MiniApi 的授权

在 MiniApi 中几乎都是形如 MapGet() 的分支节点，这类终结点无法使用 [Authorize] 标签，可以用使用 RequireAuthorization("Something") 进行授权，如：

```csharp
app.MapGet("/helloworld", () => "Hello World!")
    .RequireAuthorization("AtLeast21");
```

### 3.5 授权过程

建议看一下[ASP.NET Core 认证与授权6:授权策略是怎么执行的？](https://www.cnblogs.com/RainingNight/p/authorize-how-to-work-in-asp-net-core.html#iauthorizationservice)这篇文章，文章将授权相关的源码整理出来了，并说明了其中的关系。

与授权相关的 interface 和 class 如下：

```bash
IAuthorizationService #验证授权的服务，主要方法AuthorizeAsync
DefaultAuthorizationService #IAuthorizationService的默认实现
IAuthorizationHandler #负责检查是否满足要求，主要方法HandleAsync
IAuthorizationRequirement #只有属性，没有方法；用于标记服务，以及用于追踪授权是否成功的机制。
AuthorizationHandler<TRequirement> #主要方法HandleRequirementAsync
```

这里简述一下其关系：

`[Authorize]` 标签生效时，调用的是 `IAuthorizationService` 的 `AuthorizeAsync`（由 `DefaultAuthorizationService` 实现）。

 `AuthorizeAsync` 会去调用所有 `IAuthorizationHandler` 的 `HandleAsync` （由 `AuthorizationHandler<TRequirement>` 实现）。

`HandleAsync` 会去调用 `AuthorizationHandler<TRequirement>`  的`HandleRequirementAsync` 的方法。

**注意**：这里只是列出了主要的接口和类，部分没有列出，如：`IAuthorizationHandlerProvider`（这个接口的默认实现 `DefaultAuthorizationHandlerProvider`，主要是用于收集 `IAuthorizationHandler` 并返回 `IEnumerable<IAuthorizationHandler>`）



## 4 源码

Gitee：https://gitee.com/lisheng741/testnetcore/tree/master/Security/AuthenticationTest

Github：https://github.com/lisheng741/testnetcore/tree/master/Security/AuthenticationTest



## 参考来源

ASP.NET Core 6.0 官方文档：[授权策略提供程序](https://docs.microsoft.com/zh-cn/aspnet/core/security/authorization/iauthorizationpolicyprovider?view=aspnetcore-6.0)

[.NET 6 使用JWT Bearer认证和授权的步骤](https://www.dongchuanmin.com/archives/738.html)

[ASP.NET Core 认证与授权6:授权策略是怎么执行的？](https://www.cnblogs.com/RainingNight/p/authorize-how-to-work-in-asp-net-core.html#iauthorizationservice)（mark：这篇很强！）

[ASP.NET Core 认证与授权7:动态授权](https://www.cnblogs.com/RainingNight/p/dynamic-authorization-in-asp-net-core.html)

