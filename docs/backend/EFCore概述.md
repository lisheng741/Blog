# EF Core 概述



## 1 EF Core  相关介绍

### 1.1 EF Core 简介

EF Core 全称 Entity Framework Core，是轻量化、可扩展、[开源](https://github.com/dotnet/efcore)和跨平台版的常用 Entity Framework 数据访问技术。

EF Core 可用作对象关系映射程序 (O/RM)，这可以实现以下两点：

- 使 .NET 开发人员能够使用 .NET 对象处理数据库。
- 无需再像通常那样编写大部分数据访问代码（数据访问代码如：SQL）。

### 1.2 EF Core 数据库架构管理方式

EF Core 提供两种主要方法来保持 EF Core 模型与数据库架构同步：

#### 1.2.1 Code First

以 EF Core 模型为准，使用[迁移](https://docs.microsoft.com/zh-cn/ef/core/managing-schemas/migrations/)的方式，将 EF Core 模型的变化以增量的方式更新到数据库（以C#代码定义的数据实体，生成数据库的表结构）。

#### 1.2.2 Db First

以数据库架构为准，通过[反向工程](https://docs.microsoft.com/zh-cn/ef/core/managing-schemas/scaffolding)生成EF Core 模型。



## 2 EF Core 的使用

### 2.1 Code First 相关使用

- [EF Core 的 Code First 模式](./EFCore的CodeFirst模式.md)
- [EF Core 配置模型](./EFCore配置模型.md)

### 2.2 Db First 使用

- [EF Core 的 DbFirst 模式](./EFCore的DbFirst模式.md)



## 参考来源

[EF Core 官方文档](https://docs.microsoft.com/zh-cn/ef/core/)
