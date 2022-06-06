# ASP.NET Core 6.0 定时任务 Quartz



## 1 基本说明

本文只是笔记记录 Quartz 的使用流程，并不会添加说明。

### 1.1 相关 Nuget 包

```bash
Quartz -->> 核心包
Quartz.Extensions.DependencyInjection -->> 依赖于 Quartz 包，提供依赖注入能力
Quartz.Extensions.Hosting -->> 依赖于 Quartz.Extensions.DependencyInjection 包，提供 HostedService
```

### 1.2 重要概念

Scheduler：定时任务列表

Job：定时任务

Trigger：触发器

其他：Listener、Store



## 2 使用方式一：.NET 控制台

控制台程序中使用定时任务步骤

### 2.1 添加 Nuget 包

```bash
dotnet add package Quartz
```

### 2.2 添加 Job 程序

```csharp
public class TestJob : IJob
{
    public Task Execute(IJobExecutionContext context)
    {
        System.Console.WriteLine("Job 执行：" + DateTime.Now);
        return Task.CompletedTask;
    }
}
```

### 2.3 设置并运行

在 Program.cs 中贴入一下代码：

创建一个 Scheduler ，实例化一个 Job 和一个 Trigger，并添加到 Scheduler 中，定时任务会开始执行。

程序在执行 60 秒以后，会停止 Scheduler。

```csharp
using Quartz;
using Quartz.Impl;

// Grab the Scheduler instance from the Factory
StdSchedulerFactory factory = new StdSchedulerFactory();
IScheduler scheduler = await factory.GetScheduler();

// and start it off
await scheduler.Start();

IJobDetail job = JobBuilder.Create<TestJob>()
                .WithIdentity("job1", "group1")
                .Build();

ITrigger trigger = TriggerBuilder.Create()
                .WithIdentity("trigger1", "group1")
                .StartNow()
                .WithSimpleSchedule(x => x
                    .WithIntervalInSeconds(10)
                    .RepeatForever())
                .Build();

await scheduler.ScheduleJob(job, trigger);

// some sleep to show what's happening
await Task.Delay(TimeSpan.FromSeconds(60));

// and last shut down the scheduler when you are ready to close your program
await scheduler.Shutdown();
```



## 3 使用方式二：.NET Core HostedService 使用

### 3.1 引入 NuGet 包

```bash
dotnet add package Quartz.Extensions.Hosting
```

### 3.2 添加 Job 程序

```csharp
using Quartz;

namespace QuartzTest.Jobs;

[DisallowConcurrentExecution]
public class TestJob : IJob
{
    public Task Execute(IJobExecutionContext context)
    {
        Console.WriteLine("测试 Job --- " + DateTime.Now);
        return Task.CompletedTask;
    }
}
```

### 3.3 设置并运行

Program.cs 中，注册两个服务：

AddQuartz：添加 Quartz 能力，并配置注入工厂 `config.UseMicrosoftDependencyInjectionJobFactory()`；

AddQuartzHostedService：注册 HostedService 服务，使得定时任务随程序启动而启动。

```csharp
builder.Services.AddQuartz(config =>
{
    config.UseMicrosoftDependencyInjectionJobFactory();

    config.AddJob<TestJob>(options => options.WithIdentity("Test"));
    config.AddTrigger(options =>
        options.ForJob("Test")
        .WithIdentity("Test-Trigger")
        .WithCronSchedule("0/5 * * * * ?")
    ); 
});

// Quartz.Extensions.Hosting allows you to fire background service that handles scheduler lifecycle
builder.Services.AddQuartzHostedService(options =>
{
    // when shutting down we want jobs to complete gracefully
    options.WaitForJobsToComplete = true;
});
```



## 4 使用方式三：DependencyInjection 方式使用

### 4.1 引入 NuGet 包

```bash
dotnet add package Quartz.Extensions.DependencyInjection
```

### 4.2 添加 Job 程序

```csharp
using Quartz;

namespace QuartzFactoryTest;

public class TestJob : IJob
{
    private readonly ILogger<TestJob> _logger;

    public TestJob(ILogger<TestJob> logger)
    {
        _logger = logger;
    }

    public Task Execute(IJobExecutionContext context)
    {
        var map = context.JobDetail.JobDataMap;
        var jobName = map.GetString("name");

        _logger.LogInformation($"{jobName} in {Thread.CurrentThread.ManagedThreadId} run at {DateTime.Now}");

        return Task.CompletedTask;
    }
}
```

### 4.3 添加 QuartzService

准备一个 QuartzService，提供基本的服务。

```csharp
using Quartz;

namespace QuartzFactoryTest;

public class QuartzService
{
    private readonly ISchedulerFactory _schedulerFactory;

    public QuartzService(ISchedulerFactory schedulerFactory)
    {
        _schedulerFactory = schedulerFactory;
    }

    public async Task Start()
    {
        var scheduler = await _schedulerFactory.GetScheduler();
        if (scheduler == null) throw new ArgumentNullException(nameof(scheduler));
        await scheduler.Start();
    }

    public async Task Shutdown()
    {
        var scheduler = await _schedulerFactory.GetScheduler();
        if (scheduler == null) throw new ArgumentNullException(nameof(scheduler));
        await scheduler.Shutdown();
    }

    public async Task AddJob(string jobName, string cron)
    {
        var scheduler = await _schedulerFactory.GetScheduler();
        if (scheduler == null) throw new ArgumentNullException(nameof(scheduler));

        var jobKey = new JobKey(jobName);
        var job = JobBuilder.Create<TestJob>()
                    .WithIdentity(jobKey)
                    .UsingJobData("name", jobName)
                    .Build();
        var trigger = TriggerBuilder.Create()
                    .ForJob(jobKey)
                    .WithIdentity(jobName)
                    .WithCronSchedule(cron)
                    .Build();
        await scheduler.ScheduleJob(job, trigger);
        Console.WriteLine($"Add job {jobName}");
    }

    public async Task RemoveJob(string jobName)
    {
        var scheduler = await _schedulerFactory.GetScheduler();
        if (scheduler == null) throw new ArgumentNullException(nameof(scheduler));

        var jobKey = new JobKey(jobName);
        await scheduler.DeleteJob(jobKey);
        Console.WriteLine($"Delete job {jobName}");
    }

    public async Task PauseJob(string jobName)
    {
        var scheduler = await _schedulerFactory.GetScheduler();

        if (scheduler == null) throw new ArgumentNullException(nameof(scheduler));
        var jobKey = new JobKey(jobName);

        await scheduler.PauseJob(jobKey);
        Console.WriteLine($"Pause job {jobName}");
    }

    public async Task ResumeJob(string jobName)
    {
        var scheduler = await _schedulerFactory.GetScheduler();

        if (scheduler == null) throw new ArgumentNullException(nameof(scheduler));
        var jobKey = new JobKey(jobName);
        
        await scheduler.ResumeJob(jobKey);
        Console.WriteLine($"Resume job {jobName}");
    }
}
```

### 4.4 注入服务

在 Program.cs 中注入服务：

```csharp
builder.Services.AddQuartz(config =>
{
    config.UseMicrosoftDependencyInjectionJobFactory();
});
builder.Services.AddTransient<QuartzService>();
```

### 4.5 测试控制器

```csharp
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace QuartzFactoryTest.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class TestController : ControllerBase
    {
        public QuartzService QuartzService { get; }

        public TestController(QuartzService quartzService)
        {
            QuartzService = quartzService;
        }

        [HttpGet]
        public async Task Start() => await QuartzService.Start();

        [HttpGet]
        public async Task AddJob(string jobName, string cron)
        {
            await QuartzService.AddJob(jobName, cron);
        }

        [HttpGet]
        public async Task RemoveJob(string jobName)
        {
            await QuartzService.RemoveJob(jobName);
        }

        [HttpGet]
        public async Task PauseJob(string jobName)
        {
            await QuartzService.PauseJob(jobName);
        }

        [HttpGet]
        public async Task ResumeJob(string jobName)
        {
            await QuartzService.ResumeJob(jobName);
        }
    }
}
```

### 4.6 测试

启动 Scheduler

```bash
# 调用 /api/Test/Start 控制台提示如下：
Scheduler QuartzScheduler_$_NON_CLUSTERED started.
```

添加定时任务

```bash
# 调用 /api/Test/AddJob
# 参数 jobName : test
# 参数 cron : 0/2 * * * * ?
# 添加定时任务，控制台打印日志：
Add job test
info: QuartzFactoryTest.TestJob[0]
      test in 12 run at 2022/6/6 21:18:52
```



## 参考来源

[在.NET Core 中使用Quartz.NET](https://www.cnblogs.com/myshowtime/p/14319212.html)

[Quartz.NET 官方文档](https://www.quartz-scheduler.net/documentation/)
