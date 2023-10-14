(window.webpackJsonp=window.webpackJsonp||[]).push([[12],{403:function(e,t,r){e.exports=r.p+"assets/img/image-20220916003303757.c9e70393.png"},446:function(e,t,r){"use strict";r.r(t);var a=r(56),s=Object(a.a)({},(function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[a("h1",{attrs:{id:"基于-net6的简单三层管理系统"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#基于-net6的简单三层管理系统"}},[e._v("#")]),e._v(" 基于.NET6的简单三层管理系统")]),e._v(" "),a("h2",{attrs:{id:"前言"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#前言"}},[e._v("#")]),e._v(" 前言")]),e._v(" "),a("p",[e._v("笔者前段时间搬砖的时候，有了一个偷懒的想法：如果开发的时候，简单的CURD可以由代码生成器完成，相应的实体、服务都不需要再做额外的注册，这样开发人员可以省了很多事。")]),e._v(" "),a("p",[e._v("于是就开了这个项目，期望实现这样的能力：业务人员只需关注实体的构建，业务服务的编写，以及路由的配置。")]),e._v(" "),a("p",[e._v("让业务的开发，变成简单的三步走：创建实体 >> 业务开发 >> 路由配置。")]),e._v(" "),a("p",[e._v("目前项目构思的绝大部分能力已完成（代码生成器、定时任务还未实现），现将项目发布，希望能对搬砖的大家伙有所帮助。")]),e._v(" "),a("h2",{attrs:{id:"项目概述"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#项目概述"}},[e._v("#")]),e._v(" 项目概述")]),e._v(" "),a("p",[e._v("前后端分离，使用 JWT 认证。")]),e._v(" "),a("p",[e._v("后端：基于 .NET6 和 EF Core，集成常用组件，采用传统三层结构。")]),e._v(" "),a("p",[e._v("前端：基于 "),a("a",{attrs:{href:"https://gitee.com/xiaonuobase/snowy",target:"_blank",rel:"noopener noreferrer"}},[e._v("小诺1.8"),a("OutboundLink")],1),e._v(" 做适配，主技术栈：Vue2.6.x、Ant-Design-Vue")]),e._v(" "),a("h2",{attrs:{id:"体验地址"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#体验地址"}},[e._v("#")]),e._v(" 体验地址")]),e._v(" "),a("p",[e._v("http://175.178.244.200:12060/")]),e._v(" "),a("p",[e._v("管理员：superAdmin  密码：123456")]),e._v(" "),a("p",[e._v("普通用户：user  密码：123456")]),e._v(" "),a("h2",{attrs:{id:"快速开始"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#快速开始"}},[e._v("#")]),e._v(" 快速开始")]),e._v(" "),a("p",[e._v("请参考项目文档："),a("a",{attrs:{href:"https://gitee.com/lisheng741/simpleapp/blob/master/doc/%E4%BD%BF%E7%94%A8%E6%89%8B%E5%86%8C.md",target:"_blank",rel:"noopener noreferrer"}},[e._v("使用手册"),a("OutboundLink")],1)]),e._v(" "),a("h2",{attrs:{id:"参考项目"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#参考项目"}},[e._v("#")]),e._v(" 参考项目")]),e._v(" "),a("p",[e._v("注：排名不分先后。")]),e._v(" "),a("p",[a("a",{attrs:{href:"https://gitee.com/xiaonuobase/snowy",target:"_blank",rel:"noopener noreferrer"}},[e._v("小诺 snowy"),a("OutboundLink")],1)]),e._v(" "),a("p",[a("a",{attrs:{href:"https://gitee.com/zuohuaijun/Admin.NET",target:"_blank",rel:"noopener noreferrer"}},[e._v("Admin.NET"),a("OutboundLink")],1)]),e._v(" "),a("p",[a("a",{attrs:{href:"https://gitee.com/laozhangIsPhi/Blog.Core",target:"_blank",rel:"noopener noreferrer"}},[e._v("Blog.Core"),a("OutboundLink")],1)]),e._v(" "),a("p",[a("a",{attrs:{href:"https://github.com/AlphaYu/Adnc",target:"_blank",rel:"noopener noreferrer"}},[e._v("Adnc"),a("OutboundLink")],1)]),e._v(" "),a("p",[a("a",{attrs:{href:"https://gitee.com/dotnetchina/Furion",target:"_blank",rel:"noopener noreferrer"}},[e._v("Furion"),a("OutboundLink")],1)]),e._v(" "),a("p",[a("a",{attrs:{href:"https://github.com/abpframework/abp",target:"_blank",rel:"noopener noreferrer"}},[e._v("ABP"),a("OutboundLink")],1)]),e._v(" "),a("p",[e._v("感谢这些优秀的开源项目！")]),e._v(" "),a("h2",{attrs:{id:"基本设计思路"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#基本设计思路"}},[e._v("#")]),e._v(" 基本设计思路")]),e._v(" "),a("ul",[a("li",[a("p",[e._v("依赖于抽象")]),e._v(" "),a("p",[e._v("依赖倒置原则，控制反转（IoC）")])]),e._v(" "),a("li",[a("p",[e._v("切面编程（AOP）")]),e._v(" "),a("p",[e._v("权限、日志、异常等通过过滤器（Filter）或中间件（Middleware）等实现，集中编程")])]),e._v(" "),a("li",[a("p",[e._v("可配置")])]),e._v(" "),a("li",[a("p",[e._v("自动注册")]),e._v(" "),a("p",[e._v("自动注册实体（Entity）、自动注册服务类（Service）等")])])]),e._v(" "),a("h2",{attrs:{id:"项目结构"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#项目结构"}},[e._v("#")]),e._v(" 项目结构")]),e._v(" "),a("h3",{attrs:{id:"项目结构构思"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#项目结构构思"}},[e._v("#")]),e._v(" 项目结构构思")]),e._v(" "),a("p",[a("img",{attrs:{src:r(403),alt:"image-20220916003303757"}})]),e._v(" "),a("p",[a("strong",[e._v("主要分为三层：Interface表现层、Services服务层、Repository仓储层")])]),e._v(" "),a("p",[a("strong",[e._v("Interface")]),e._v("：Host依赖所有层，完成程序配置（如：Program.cs 中DI容器注入服务，中间件管道配置等）；Web API 配置路由，提供 API 接口，如果程序以后有迁移、或替换前端的情况，也可以在这里做一层适配器（注：API只是一种表现形式，也可以为MVC）")]),e._v(" "),a("p",[a("strong",[e._v("Services")]),e._v("：所有的业务都在这一层。从仓储中读取数据模型（Models），进行业务操作，返回DTO（Data transfer objects）给表现层。")]),e._v(" "),a("p",[a("strong",[e._v("Repository")]),e._v("：数据库访问。")]),e._v(" "),a("p",[a("strong",[e._v("通用的模块：Model、Common、Framework")])]),e._v(" "),a("p",[a("strong",[e._v("Models")]),e._v("：包含所有数据模型，如 Entity（对象数据库的数据表）、CacheItem缓存对象、EventModel事件模型等。")]),e._v(" "),a("p",[a("strong",[e._v("Common")]),e._v("：集成常用组件，根据项目需要做相应配置；提供基础服务，如CurrentUser访问当前用户信息；提供静态帮助类，所有无状态的函数都归入此类，如"),a("code",[e._v("GuidHelper.Next()")]),e._v(" 产生连续 Guid。")]),e._v(" "),a("p",[a("strong",[e._v("Framework")]),e._v("：框架，比如引用ABP或Furion等框架，甚至是自己项目一些通用的能力，可以到处用的。")]),e._v(" "),a("h3",{attrs:{id:"实际项目结构"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#实际项目结构"}},[e._v("#")]),e._v(" 实际项目结构")]),e._v(" "),a("p",[e._v("实际上，把 IServices 和 IRepository 此类接口层干掉了。")]),e._v(" "),a("p",[e._v("Models 则归入了对应的使用者里面，Framework 也没有。")]),e._v(" "),a("div",{staticClass:"language-bash extra-class"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[e._v("Common        "),a("span",{pre:!0,attrs:{class:"token comment"}},[e._v("# 基础设施：集成常用组件；提供基础服务；提供静态帮助类")]),e._v("\nRepository    "),a("span",{pre:!0,attrs:{class:"token comment"}},[e._v("# 仓储层：数据库访问，数据库迁移")]),e._v("\nServices      "),a("span",{pre:!0,attrs:{class:"token comment"}},[e._v("# 服务层：业务实现")]),e._v("\nWebApi        "),a("span",{pre:!0,attrs:{class:"token comment"}},[e._v("# 表现层：完成程序配置；配置路由，提供API接口")]),e._v("\n")])])]),a("p",[e._v("目录结构如下，更详细的结构，请查看文档。")]),e._v(" "),a("div",{staticClass:"language-bash extra-class"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[e._v("├─config                  "),a("span",{pre:!0,attrs:{class:"token comment"}},[e._v("# 一些配置文件，如：redis 的配置文件")]),e._v("\n├─doc                     "),a("span",{pre:!0,attrs:{class:"token comment"}},[e._v("# 项目文档")]),e._v("\n├─web                     "),a("span",{pre:!0,attrs:{class:"token comment"}},[e._v("# 前端")]),e._v("\n├─webapi                  "),a("span",{pre:!0,attrs:{class:"token comment"}},[e._v("# 后端")]),e._v("\n   ├─Simple.Common        "),a("span",{pre:!0,attrs:{class:"token comment"}},[e._v("# 基础设施")]),e._v("\n   ├─Simple.Repository    "),a("span",{pre:!0,attrs:{class:"token comment"}},[e._v("# 仓储层")]),e._v("\n   ├─Simple.Services      "),a("span",{pre:!0,attrs:{class:"token comment"}},[e._v("# 服务层")]),e._v("\n   └─Simple.WebApi        "),a("span",{pre:!0,attrs:{class:"token comment"}},[e._v("# 表现层")]),e._v("\n")])])]),a("h2",{attrs:{id:"业务能力"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#业务能力"}},[e._v("#")]),e._v(" 业务能力")]),e._v(" "),a("ul",[a("li",[e._v("组织架构\n"),a("ul",[a("li",[e._v("组织机构（organization）")]),e._v(" "),a("li",[e._v("岗位（position）")]),e._v(" "),a("li",[e._v("用户（user）")])])]),e._v(" "),a("li",[e._v("权限管理\n"),a("ul",[a("li",[e._v("应用（application）")]),e._v(" "),a("li",[e._v("菜单（menu）")]),e._v(" "),a("li",[e._v("角色（role）")])])]),e._v(" "),a("li",[e._v("开发管理\n"),a("ul",[a("li",[e._v("数据字典（dictionary、dictionaryItem）")])])]),e._v(" "),a("li",[e._v("日志管理\n"),a("ul",[a("li",[e._v("操作日志（log operating）")]),e._v(" "),a("li",[e._v("异常日志（log exception）")])])])]),e._v(" "),a("h2",{attrs:{id:"系统能力"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#系统能力"}},[e._v("#")]),e._v(" 系统能力")]),e._v(" "),a("ul",[a("li",[e._v("认证：集成Cookies、JWT；默认启用 JWT")]),e._v(" "),a("li",[e._v("授权："),a("a",{attrs:{href:"https://docs.microsoft.com/zh-cn/aspnet/core/security/authorization/policies?view=aspnetcore-6.0",target:"_blank",rel:"noopener noreferrer"}},[e._v("基于策略（Policy）的授权"),a("OutboundLink")],1)]),e._v(" "),a("li",[e._v("ORM："),a("a",{attrs:{href:"https://docs.microsoft.com/zh-cn/ef/core/",target:"_blank",rel:"noopener noreferrer"}},[e._v("EF Core"),a("OutboundLink")],1),e._v(" 的 "),a("a",{attrs:{href:"https://docs.microsoft.com/zh-cn/ef/core/managing-schemas/migrations/?tabs=dotnet-core-cli",target:"_blank",rel:"noopener noreferrer"}},[e._v("Code First 模式"),a("OutboundLink")],1)]),e._v(" "),a("li",[e._v("依赖注入：默认 DI 容器，实现自动注入")]),e._v(" "),a("li",[e._v("缓存："),a("a",{attrs:{href:"https://docs.microsoft.com/zh-cn/dotnet/api/microsoft.extensions.caching.distributed.idistributedcache",target:"_blank",rel:"noopener noreferrer"}},[e._v("IDistributedCache"),a("OutboundLink")],1),e._v("，默认注入 Memory Cache，可替换 Redis")]),e._v(" "),a("li",[e._v("日志："),a("a",{attrs:{href:"https://nlog-project.org/",target:"_blank",rel:"noopener noreferrer"}},[e._v("NLog"),a("OutboundLink")],1)]),e._v(" "),a("li",[e._v("事件总线："),a("a",{attrs:{href:"https://docs.microsoft.com/zh-cn/dotnet/core/extensions/queue-service?source=recommendations",target:"_blank",rel:"noopener noreferrer"}},[e._v("默认启用 BackgroupService"),a("OutboundLink")],1),e._v("，基于"),a("a",{attrs:{href:"https://docs.microsoft.com/zh-cn/dotnet/api/system.threading.channels.channel-1",target:"_blank",rel:"noopener noreferrer"}},[e._v("Channel"),a("OutboundLink")],1),e._v(" 实现的单机版发布订阅；可替换为 Redis 的发布订阅（可用于分布式）；也可替换为 RabbitMQ 的发布订阅（可用于分布式）")]),e._v(" "),a("li",[e._v("定时任务：Quartz")]),e._v(" "),a("li",[e._v("数据验证："),a("a",{attrs:{href:"https://docs.microsoft.com/zh-cn/aspnet/core/mvc/models/validation",target:"_blank",rel:"noopener noreferrer"}},[e._v("模型验证（Model validation）"),a("OutboundLink")],1)]),e._v(" "),a("li",[e._v("对象映射：AutoMapper")])]),e._v(" "),a("h2",{attrs:{id:"项目亮点"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#项目亮点"}},[e._v("#")]),e._v(" 项目亮点")]),e._v(" "),a("ul",[a("li",[a("a",{attrs:{href:"https://gitee.com/lisheng741/simpleapp/blob/master/webapi/migrations.sh",target:"_blank",rel:"noopener noreferrer"}},[e._v("EF Core 自动迁移脚本"),a("OutboundLink")],1)])]),e._v(" "),a("h2",{attrs:{id:"一些q-a"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#一些q-a"}},[e._v("#")]),e._v(" 一些Q&A")]),e._v(" "),a("h4",{attrs:{id:"为什么把-iservices-这些接口层给干掉了-仅留下实现层"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#为什么把-iservices-这些接口层给干掉了-仅留下实现层"}},[e._v("#")]),e._v(" 为什么把 IServices 这些接口层给干掉了，仅留下实现层？")]),e._v(" "),a("p",[e._v("答：一般项目中会如有 IRepository 和 IServices 这些个抽象层，主要是为了控制反转（IoC），实现项目各层之间解耦，最终目的就是为了“高内聚，低耦合”。")]),e._v(" "),a("p",[e._v("笔者认为，对于单体项目来说，做到高内聚即可，再追求完全的低耦合，会增加成本和困扰（举个简单的栗子：项目初期，业务大改是常有的事，改服务类的接口的事并不少见。除非说业务主体明确，需要修改的，并不是业务的接口，而是业务的具体实现）。")]),e._v(" "),a("p",[e._v("最后是这个项目，本就是为了追求最简三层单体。")]),e._v(" "),a("h4",{attrs:{id:"为什么不对仓储额外封装一层"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#为什么不对仓储额外封装一层"}},[e._v("#")]),e._v(" 为什么不对仓储额外封装一层？")]),e._v(" "),a("p",[e._v("答：简单的项目基本上是单数据库的，且 EF Core 已经实现了工作单元和仓储模式，可以不用再封装一层。")]),e._v(" "),a("p",[e._v("当然，笔者还是建议跟ABP框架那样再封装一层仓储，可以避免一些后续的开发运维问题（比如：系统迁移、重构等）。")]),e._v(" "),a("h2",{attrs:{id:"源码"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#源码"}},[e._v("#")]),e._v(" 源码")]),e._v(" "),a("p",[e._v("Gitee：https://gitee.com/lisheng741/simpleapp")]),e._v(" "),a("p",[e._v("Github：https://github.com/lisheng741/SimpleApp")])])}),[],!1,null,null,null);t.default=s.exports}}]);