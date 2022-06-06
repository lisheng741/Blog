# ASP.NET Core 6.0 使用 AutoMapper



## 1 基本说明

### 1.1 相关 NuGet 包

```bash
AutoMapper -->> 核心包
AutoMapper.Extensions.Microsoft.DependencyInjection -->> 依赖于 AutoMapper，可以使用依赖注入能力
```



## 2 基本使用

### 2.1 安装 NuGet 包

```bash
dotnet add package AutoMapper.Extensions.Microsoft.DependencyInjection
```

### 2.2 前置准备

这里创建两个示例，以用于相互映射。

```c#
public class User
{
    public int ID { get; set; }
    public string Name { get; set; }
}
public class UserDto
{
    public int ID { get; set; }
    public string Name { get; set; }
}
```

### 2.3 配置

创建一个 `MapperProfile` 类，继承 `AutoMapper.Profile`  ，接着在其构造函数中创建映射。

```c#
//创建一个 自定义Profile 类，继承 AutoMapper.Profile
public class MapperProfile : Profile
{
    public MapperProfile()
    {
        //配置映射（创建单向映射：User -> UserDto）
        CreateMap<User, UserDto>();
        //配置映射：这样映射的结果 dto.Name = user.ID + user.Name
        CreateMap<User, UserDto>()
            .ForMember(dest => dest.Name, opt => MapFrom(src => str.ID.ToString() + src.Name));
        
        //其他配置：驼峰命名与Pascal命名的兼容
        DestinationMemberNamingConvention = new PascalCaseNamingConvention();
        SourceMemberNamingConvention = new LowerUnderscoreNamingConvention();
    }
}
```

### 2.4 注入服务

在 `Startup.cs` 中注册服务。

```c#
public void ConfigureServices(IServiceCollection services)
{
    services.AddAutoMapper(typeof(MapperProfile));
    //……其他代码
}
```

__注意__ ：上述写法，实际上是找到 `MapperProfile` 所在程序集，然后扫描程序集所有继承 `Profile` 的 class（若同一个程序集多次出现，会重复配置。重复配置目前未发现对映射有影响）。

### 2.5 使用

在控制器中使用。

```c#
public class HomeController : Controller
{
    private readonly IMapper _mapper;
    
    public HomeController(IMapper mapper)
    {
        _mapper = mapper;
    }
    
    [HttpGet]
    public UserDto GetUser()
    {
        User user = new User(){ ID = 1, Name = "名字" };
        var dto = _mapper.Map<User,UserDto>(user);
        return dto;
    }
}
```



## 3 更多配置

### 3.1 配置可见性

默认情况，AutoMapper 仅映射 `public` 成员，但其实可以映射 `private` 属性。

```c#
var config = new MapperConfiguration(cfg =>
{
    cfg.ShouldMapProperty = p => p.GetMethod.IsPublic || p.SetMethod.IsPrivate;
    cfg.CreateMap<Source, Destination>();
});
```

__注__：这里的属性，必须添加 `private set` ，省略 `set` 是不行的。



## 自定义一个对象映射方法（记录）

以前写的一个方法，记录

```csharp
public class Mapper
{
    /// <summary>
    /// 通过反射，将 T1 映射为 T2
    /// </summary>
    /// <typeparam name="T1"></typeparam>
    /// <typeparam name="T2"></typeparam>
    /// <param name="t1"></param>
    /// <returns></returns>
    public static T2 T1MapToT2<T1, T2>(T1 t1)
        where T1 : class
        where T2 : class //, new()
    {
        T2 t2 = Activator.CreateInstance<T2>();  //T2 t2 = new T2(); //后面这种写法，要在 where 中添加 new()
        if (t1 == null)
        {
            return t2;
        }

        var p1 = t1.GetType().GetProperties();
        var p2 = typeof(T2).GetProperties();
        for (int i = 0; i < p1.Length; i++)
        {
            //条件：1、属性名相同；2、t2属性可写；3、属性可读性一致；4、数据类型相近（相同，或者接近。接近如：int 和 int?）
            var p = p2.Where(t => t.Name == p1[i].Name && t.CanWrite && t.CanRead == p1[i].CanRead).FirstOrDefault();
            if (p == null)
                continue;
            var v = p1[i].GetValue(t1);
            if (v == null)
                continue;
            try { p.SetValue(t2, v); } //难判定数据类型，暂时这样处理
            catch
            {
                try { p.SetValue(t2, Convert.ChangeType(v, p.PropertyType)); } //int? -> object -> int? 会抛错
                catch { }
            }
                
        }

        return t2;
    }

    //这种写法和上面的写法没啥差别
    public static T2 T1MapToT2_2<T1, T2>(T1 t1)
        where T1 : class
        where T2 : class //, new()
    {
        T2 t2 = Activator.CreateInstance<T2>();  //T2 t2 = new T2(); //后面这种写法，要在 where 中添加 new()

        var p1 = t1.GetType().GetProperties();
        var p2 = typeof(T2);
        for (int i = 0; i < p1.Length; i++)
        {
            //条件：1、属性名相同；2、t2属性可写；3、属性可读性一致；4、数据类型相近（相同，或者接近。接近如：int 和 int?）
            var p = p2.GetProperty(p1[i].Name);
            if (p == null || !p.CanWrite || p.CanRead != p1[i].CanRead)
                continue;
            var v = p1[i].GetValue(t1);
            if (v == null)
                continue;
            try { p.SetValue(t2, Convert.ChangeType(v, p.PropertyType)); }
            catch { }
        }

        return t2;
    }
}
```



## 参考来源

[ASP.NET.Core中使用AutoMapper](https://cloud.tencent.com/developer/article/1395155)

[【C#】AutoMapper 使用手册](https://www.cnblogs.com/gl1573/p/13098031.html)