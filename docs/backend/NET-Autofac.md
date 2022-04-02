# .NET-Autofac

[[toc]]



## 序言

本文第一节从基本的概念说起；

第二节以文字的方式，列出 Autofac 的使用步骤；

第三节，结合实际的代码，展示如何对 Autofac 进行配置；

第四节（未完成），将展示如何使用 Autofac 注入的服务；

第五节开始，将常用的注入方式、生命周期等记录下来，以便翻查；

最后将会有一节其他内容，比如：描述 Autofac 如何支持 AOP。



## 1 基本概念

### 1.1 相关名词

依赖倒置（DIP）

控制反转（IoC：Inversion of control）

注入（DI：Dependency injection）

### 1.2 个人理解

DIP 依赖倒置原则：程序要依赖于抽象，不要依赖于细节（具体实现）。其中抽象一般指接口（Interface），细节指类（Class）。

IoC 一般翻译为控制反转，主要是为了降低模块与模块之间代码的耦合度，是一种理念，一种设计原则。

DI 是 IoC 的一种实现方式，为依赖注入的方式。具体做法就是通过一个统一的容器（DI 容器），来管理对象的创建和生命周期。



## 2 使用步骤

### 2.1 基本使用

1. 引入 Autofac
2. 在程序入口处：创建容器（Create a ContainerBuilder），注册服务/组件（Register Components），构建并存储容器（Build and store）
3. 在程序执行过程中：从容器中创建拥有生命周期的实例（lifetime scope）

对应[3.2基本使用](#i-common-use)

### 2.2 在ASP.NET Core 中使用（.NET6）

替换工厂方式：

1. 引入 Autofac.Extensions.DependencyInjection
2. 在程序入口处，替换 ServiceProviderFactory
3. 调用 ConfigureContainer 方法，注册自定义 Autofac 的 Module

对应[3.3.NET6使用](#i-core-use)



## 3 实际配置

本节会提供多种配置方式，如基本配置方式（可应用于一般程序），.NET6配置方式（Web程序），配置文件等方式，选择其中一种配置方式即可。

### 3.1 引入

方式一：界面 NuGet 包添加

方式二：控制台引入 NuGet 包

```shell
Install-Package Autofac -Version 6.3.0
```

方式三：修改工程文件

```xml
<PackageReference Include="Autofac" Version="6.3.0" />
```

### <span id='i-common-use'>3.2 基本使用</span>

```csharp
//1、创建容器 Create a ContainerBuilder
ContainerBuilder containerBuilder = new ContainerBuilder();
//2、注册服务（官方称 Component）
containerBuilder.RegisterType<TestService>().As<ITestService>();
//3、构建容器，创建实例；需要把 container 存储起来以便后续使用
IContainer container = containerBuilder.Build();
//4、使用 container 创建实例
var service = container.Resolve<ITestService>();
```

### <span id='i-core-use'>3.3 .NET6中使用</span>

1）引入 Autofac.Extensions.DependencyInjection

2）代码

```csharp
//在 var app = builder.Build(); 前加入使用 Autofac 相关代码
builder.Host.UseServiceProviderFactory(new AutofacServiceProviderFactory());
builder.Host.ConfigureContainer<ContainerBuilder>(builder =>
{
    builder.RegisterModule<AutofacModule>();
});
```

其中，AutofacModule 为自定义的 Autofac 配置类，实现如下：

```csharp
public class AutofacModule : Module
{
    protected override void Load(ContainerBuilder builder)
    {
        //把服务的注入规则写在这里
        builder.RegisterType<TestService>().As<ITestService>();
    }
}
```

注：

工厂模式下，Autofac 在自己注册服务之前，会先把 ServiceCollection 中注册的服务全部接管过来，所以通过 .NET6 默认的 DI 容器方式注入的服务，也生效。

### 3.4 其他配置方式

#### 3.4.1 配置文件方式

1）引入程序集：Autofac.Configuration

2）配置文件：

```json
{
  "defaultAssembly": "TestMiniAPI",
  "components": [
    {
      "type": "TestMiniAPI.Services.TestService, TestMiniAPI",
      "services": [
        {
          "type": "TestMiniAPI.Services.ITestService, TestMiniAPI"
        }
      ],
      "instanceScope": "single-instance",
      "injectProperties": true
    }
  ]
}
```

3）配置代码

```csharp
ContainerBuilder containerBuilder = new ContainerBuilder();
IConfigurationBuilder config = new ConfigurationBuilder();
IConfigurationSource autofacJsonConfigSource = new JsonConfigurationSource()
{
    Path = "ConfigFile/autofac.json",
    Optional = false, //默认是false
    ReloadOnChange = true, //默认是true
};
config.Add(autofacJsonConfigSource);
ConfigurationModule module = new ConfigurationModule(config.Build());
containerBuilder.RegisterModule(module);
```



## 4 实际使用

本节主要展示如何使用注入的服务。

### 4.1 构造函数注入

这是最常见的方式，也是默认的注入方式。

```csharp
//在 Program.cs 中注入服务
containerBuilder.RegisterType<TestService>().As<ITestService>();

//构造函数注入
public class TestController
{
    private readonly ITestService _testService;
    
    public TestController(ITestService testService)
    {
        _testService = testService;
    }
}
```



## 5 注册组件

官方文档：https://autofac.readthedocs.io/en/latest/register/registration.html

### 5.1 多种注入方式

```csharp
//注册具体的类
containerBuilder.RegisterType<TestService>();
containerBuilder.RegisterType(typeof(TestService));
//注册实例
var testService = new TestService();
containerBuilder.RegisterInstance(testService).As<ITestService>();
//注册创建实例的表达式
containerBuilder.Register(c => new TestService("Parameters")).As<ITestService>();
//注册公开接口
containerBuilder.RegisterType<TestService>().As<ITestService>();
//属性注入
containerBuilder.RegisterType<TestService>().As<ITestService>().PropertiesAutowired();
//方法注入
containerBuilder.RegisterType<TestService>().OnActivated(e => e.Instance.SetService(e.Context.Resolve<ITestChildService>())).As<ITestService>();
```

### 5.2 将所有注册的服务都暴漏

```csharp
//使用 AsSelf();
containerBuilder.RegisterType<TestService>().AsSelf().As<ITestService>();
//这样下面两句都可以运行
container.Resolve<TestService>();
container.Resolve<ITestService>();
```

### 5.3 多例注入

获取指定实例、或获取所有实例

```csharp
//Program.cs 注入
containerBuilder.RegisterSource(new AnyConcreteTypeNotAlreadyRegisteredSource(t => t.IsAssignableTo<ITestService>()));

//构造 TestService
container.Resolve<TestService>();
//构造函数时获取所有注入实例 IEnumerable<ITestService> 
public TestController(IEnumerable<ITestService> testServices){}
```

指定标识注入

```csharp
//Program.cs
containerBuilder.RegisterType<TestService>().Named<ITestService>("TestService");

//获取实例
ITestService testService = container.ResolveNamed<ITestService>("TestService");
//通过 IComponentContext 构建
//private readonly IComponentContext _componentContext;
ITestService testService = _componentContext.ResolveNamed<ITestService>("TestService");
```

### 5.4 程序集批量注入

```csharp
Assembly assembly = Assembly.Load("AssemblyName");
//Assembly assembly = Assembly.GetExecutingAssembly();
containerBuilder.RegisterAssemblyTypes(assembly).AsImplementedInterfaces().InstancePerDependency();
```

### 5.5 MVC控制器支持注入（属性等注入）

控制器的实例是 IConrtollerActivator 来创建的，与一般的类不同，需要特殊处理。



## 6 生命周期

### 6.1 生命周期范围

```csharp
using(var scope = container.BeginLifetimeScope()){}
using(var scope = container.BeginLifetimeScope("ScopeName")){}
```

### 6.2 多种生命周期

```csharp
//瞬态，对应 DI 容器的 Transient
InstancePerDependency();
//单例，对应 DI 容器的 Singleton
SingleInstance();
//每个生命周期范围一个实例
InstancePerLifetimeScope();
//每个匹配生命周期范围一个实例
InstancePerMatchingLifetimeScope("ScopeName");
//Web请求范围一个实例
InstancePerRequest();
//
InstancePerOwned<MessageHandler>();
```



## 8 建议

具体请参考[微软官方文档关于依赖关系注入的建议](https://docs.microsoft.com/zh-cn/aspnet/core/fundamentals/dependency-injection?view=aspnetcore-6.0#recommendations)

- 避免使用服务定位器模式。例如，可以使用 DI 代替时，不要调用 GetService 来获取服务实例。

- 要避免的另一个服务定位器变体是注入需在运行时解析依赖项的工厂。 这两种做法混合了控制反转策略。

- 避免静态访问 HttpContext。DI 是静态/全局对象访问模式的替代方法。



## 9 其他

### 9.1 Autofac 支持 AOP

#### 9.1.1 接口方式

1）引入程序集

Castle.Core（独立在另外一个工程）

Autofac.Extras.DynamicProxy

2）切面类实现

实现 IInterceptor 接口

```csharp
public class AutofacAOP : IInterceptor
{
    public void Intercept(IInvocation invocation)
    {
        Console.WriteLine("执行前");
        invocation.Proceed();
        Console.WriteLine("执行后");
    }
}
```

3）注入

```csharp
containerBuilder.RegisterType<AutofacAOP>();
containerBuilder.RegisterType<Test>().As<ITest>().EnableInterfaceInterceptors();
```

4）标记接口

```csharp
[Intercept(typeof(AutofacAOP))]
public interface ITest {}
```

#### 9.1.2 类方式

1）引入程序集

2）切面类实现

3）注入

```csharp
EnableClassInterceptors();
```

4）标记接口，且要实现 AOP 的方法标记为虚方法

```csharp
[Intercept(typeof(AutofacAOP))]
public class Test : ITest 
{
    public virtual void Show()
    {
        Console.WriteLine("执行中");
    }
}
```



## 参考来源

朝夕教育的视频

[Autofac 官网](https://autofac.org)

[Autofac 官方示例代码](https://github.com/autofac/Examples)

[微软官方文档-依赖关系注入（服务）](https://docs.microsoft.com/zh-cn/aspnet/core/fundamentals/dependency-injection?view=aspnetcore-6.0)

