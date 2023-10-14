(window.webpackJsonp=window.webpackJsonp||[]).push([[19],{428:function(t,s,a){"use strict";a.r(s);var n=a(56),e=Object(n.a)({},(function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[a("h1",{attrs:{id:"asp-net-core-6-0-关于-cache"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#asp-net-core-6-0-关于-cache"}},[t._v("#")]),t._v(" ASP.NET Core 6.0 关于 Cache")]),t._v(" "),a("h2",{attrs:{id:"缓存"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#缓存"}},[t._v("#")]),t._v(" 缓存")]),t._v(" "),a("p",[t._v("官方文档："),a("a",{attrs:{href:"https://docs.microsoft.com/zh-cn/aspnet/core/performance/caching/overview?view=aspnetcore-6.0",target:"_blank",rel:"noopener noreferrer"}},[t._v("缓存 Caching"),a("OutboundLink")],1)]),t._v(" "),a("p",[t._v("分两种：Memory Cache 和 Distributed Caching")]),t._v(" "),a("h3",{attrs:{id:"memory-cache"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#memory-cache"}},[t._v("#")]),t._v(" Memory Cache")]),t._v(" "),a("p",[t._v("内存缓存相关 NuGet 包：")]),t._v(" "),a("p",[t._v("MemoryCache："),a("a",{attrs:{href:"https://www.nuget.org/packages/Microsoft.Extensions.Caching.Memory/",target:"_blank",rel:"noopener noreferrer"}},[t._v("Microsoft.Extensions.Caching.Memory"),a("OutboundLink")],1)]),t._v(" "),a("h3",{attrs:{id:"distributed-caching"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#distributed-caching"}},[t._v("#")]),t._v(" Distributed Caching")]),t._v(" "),a("p",[t._v("分布式缓存相关 NuGet 包：")]),t._v(" "),a("p",[t._v("SQL Server："),a("a",{attrs:{href:"https://www.nuget.org/packages/Microsoft.Extensions.Caching.SqlServer",target:"_blank",rel:"noopener noreferrer"}},[t._v("Microsoft.Extensions.Caching.SqlServer"),a("OutboundLink")],1)]),t._v(" "),a("p",[t._v("Redis："),a("a",{attrs:{href:"https://www.nuget.org/packages/Microsoft.Extensions.Caching.StackExchangeRedis",target:"_blank",rel:"noopener noreferrer"}},[t._v("Microsoft.Extensions.Caching.StackExchangeRedis"),a("OutboundLink")],1)]),t._v(" "),a("p",[t._v("NCache："),a("a",{attrs:{href:"https://www.nuget.org/packages/NCache.Microsoft.Extensions.Caching.OpenSource",target:"_blank",rel:"noopener noreferrer"}},[t._v("NCache.Microsoft.Extensions.Caching.OpenSource"),a("OutboundLink")],1)]),t._v(" "),a("h2",{attrs:{id:"memory-cache-2"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#memory-cache-2"}},[t._v("#")]),t._v(" Memory Cache")]),t._v(" "),a("p",[a("a",{attrs:{href:"https://docs.microsoft.com/zh-cn/dotnet/api/microsoft.extensions.caching.memory.imemorycache",target:"_blank",rel:"noopener noreferrer"}},[t._v("IMemoryCache "),a("OutboundLink")],1),t._v("接口")]),t._v(" "),a("p",[t._v("注入服务：")]),t._v(" "),a("div",{staticClass:"language-csharp extra-class"},[a("pre",{pre:!0,attrs:{class:"language-csharp"}},[a("code",[t._v("builder"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("Services"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("AddMemoryCache")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])])]),a("p",[t._v("测试语句：")]),t._v(" "),a("div",{staticClass:"language-csharp extra-class"},[a("pre",{pre:!0,attrs:{class:"language-csharp"}},[a("code",[t._v("app"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("Map")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"/test"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("IMemoryCache")]),t._v(" cache"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=>")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    cache"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("Set")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"test"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"test123"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token class-name"}},[a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("var")])]),t._v(" test "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" cache"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("Get")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"test"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),t._v(" test"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])])]),a("h2",{attrs:{id:"分布式缓存-默认"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#分布式缓存-默认"}},[t._v("#")]),t._v(" 分布式缓存 - 默认")]),t._v(" "),a("p",[t._v("MemoryCache")]),t._v(" "),a("div",{staticClass:"language-csharp extra-class"},[a("pre",{pre:!0,attrs:{class:"language-csharp"}},[a("code",[t._v("builder"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("Services"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("AddDistributedMemoryCache")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])])]),a("h2",{attrs:{id:"分布式缓存-redis"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#分布式缓存-redis"}},[t._v("#")]),t._v(" 分布式缓存 - Redis")]),t._v(" "),a("h3",{attrs:{id:"相关-nuget-包"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#相关-nuget-包"}},[t._v("#")]),t._v(" 相关 Nuget 包")]),t._v(" "),a("p",[a("a",{attrs:{href:"https://www.nuget.org/packages/StackExchange.Redis/",target:"_blank",rel:"noopener noreferrer"}},[t._v("StackExchange.Redis"),a("OutboundLink")],1),t._v("：开源项目，应用广泛")]),t._v(" "),a("p",[a("a",{attrs:{href:"https://www.nuget.org/packages/Microsoft.Extensions.Caching.Redis/",target:"_blank",rel:"noopener noreferrer"}},[t._v("Microsoft.Extensions.Caching.Redis"),a("OutboundLink")],1),t._v("：微软官方包，这个版本只到 2.2.0，在 2018 年停止更新了，是前期的包。")]),t._v(" "),a("p",[a("a",{attrs:{href:"https://www.nuget.org/packages/Microsoft.Extensions.Caching.StackExchangeRedis/7.0.0-preview.3.22178.4",target:"_blank",rel:"noopener noreferrer"}},[t._v("Microsoft.Extensions.Caching.StackExchangeRedis"),a("OutboundLink")],1),t._v("：这个应该是接上 Microsoft.Extensions.Caching.Redis 更新的包，目前还在持续更新。该依赖于 StackExchange.Redis 这个包。")]),t._v(" "),a("h3",{attrs:{id:"idistributedcache-接口"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#idistributedcache-接口"}},[t._v("#")]),t._v(" IDistributedCache 接口")]),t._v(" "),a("p",[a("a",{attrs:{href:"https://docs.microsoft.com/zh-cn/dotnet/api/microsoft.extensions.caching.distributed.idistributedcache",target:"_blank",rel:"noopener noreferrer"}},[t._v("IDistributedCache"),a("OutboundLink")],1),t._v(" 接口")]),t._v(" "),a("ul",[a("li",[a("a",{attrs:{href:"https://docs.microsoft.com/zh-cn/dotnet/api/microsoft.extensions.caching.distributed.idistributedcache.get",target:"_blank",rel:"noopener noreferrer"}},[t._v("Get"),a("OutboundLink")],1),t._v("、"),a("a",{attrs:{href:"https://docs.microsoft.com/zh-cn/dotnet/api/microsoft.extensions.caching.distributed.idistributedcache.getasync",target:"_blank",rel:"noopener noreferrer"}},[t._v("GetAsync"),a("OutboundLink")],1),t._v("：如果在缓存中找到，则接受字符串键并以 "),a("code",[t._v("byte[]")]),t._v(" 数组的形式检索缓存项。")]),t._v(" "),a("li",[a("a",{attrs:{href:"https://docs.microsoft.com/zh-cn/dotnet/api/microsoft.extensions.caching.distributed.idistributedcache.set",target:"_blank",rel:"noopener noreferrer"}},[t._v("Set"),a("OutboundLink")],1),t._v("、"),a("a",{attrs:{href:"https://docs.microsoft.com/zh-cn/dotnet/api/microsoft.extensions.caching.distributed.idistributedcache.setasync",target:"_blank",rel:"noopener noreferrer"}},[t._v("SetAsync"),a("OutboundLink")],1),t._v("：使用字符串键将项（作为 "),a("code",[t._v("byte[]")]),t._v(" 数组）添加到缓存。")]),t._v(" "),a("li",[a("a",{attrs:{href:"https://docs.microsoft.com/zh-cn/dotnet/api/microsoft.extensions.caching.distributed.idistributedcache.refresh",target:"_blank",rel:"noopener noreferrer"}},[t._v("Refresh"),a("OutboundLink")],1),t._v("、"),a("a",{attrs:{href:"https://docs.microsoft.com/zh-cn/dotnet/api/microsoft.extensions.caching.distributed.idistributedcache.refreshasync",target:"_blank",rel:"noopener noreferrer"}},[t._v("RefreshAsync"),a("OutboundLink")],1),t._v("：根据键刷新缓存中的项，重置其可调到期超时（如果有）。")]),t._v(" "),a("li",[a("a",{attrs:{href:"https://docs.microsoft.com/zh-cn/dotnet/api/microsoft.extensions.caching.distributed.idistributedcache.remove",target:"_blank",rel:"noopener noreferrer"}},[t._v("Remove"),a("OutboundLink")],1),t._v("、"),a("a",{attrs:{href:"https://docs.microsoft.com/zh-cn/dotnet/api/microsoft.extensions.caching.distributed.idistributedcache.removeasync",target:"_blank",rel:"noopener noreferrer"}},[t._v("RemoveAsync"),a("OutboundLink")],1),t._v("：根据字符串键删除缓存项。")])]),t._v(" "),a("h3",{attrs:{id:"使用步骤"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#使用步骤"}},[t._v("#")]),t._v(" 使用步骤")]),t._v(" "),a("h4",{attrs:{id:"_1-准备配置信息"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_1-准备配置信息"}},[t._v("#")]),t._v(" 1 准备配置信息")]),t._v(" "),a("div",{staticClass:"language-json extra-class"},[a("pre",{pre:!0,attrs:{class:"language-json"}},[a("code",[a("span",{pre:!0,attrs:{class:"token property"}},[t._v('"Cache"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v('"Redis"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"127.0.0.1:6379,password=123456,DefaultDatabase=6"')]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),a("h4",{attrs:{id:"_2-注册服务"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_2-注册服务"}},[t._v("#")]),t._v(" 2 注册服务")]),t._v(" "),a("div",{staticClass:"language-csharp extra-class"},[a("pre",{pre:!0,attrs:{class:"language-csharp"}},[a("code",[t._v("builder"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("Services"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("AddStackExchangeRedisCache")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("options "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=>")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    options"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("Configuration "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" builder"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("Configuration"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"Cache:Redis"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    options"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("InstanceName "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"SampleInstance"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])])]),a("h4",{attrs:{id:"_3-测试控制器"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_3-测试控制器"}},[t._v("#")]),t._v(" 3 测试控制器")]),t._v(" "),a("div",{staticClass:"language-csharp extra-class"},[a("pre",{pre:!0,attrs:{class:"language-csharp"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("using")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token namespace"}},[t._v("Microsoft"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("AspNetCore"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("Mvc")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("using")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token namespace"}},[t._v("Microsoft"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("Extensions"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("Caching"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("Distributed")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("using")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token namespace"}},[t._v("System"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("Text")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("namespace")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token namespace"}},[t._v("RedisTest"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("Controllers")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),a("span",{pre:!0,attrs:{class:"token attribute"}},[a("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("Route")]),a("span",{pre:!0,attrs:{class:"token attribute-arguments"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"api/[controller]/[action]"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")])])]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),a("span",{pre:!0,attrs:{class:"token attribute"}},[a("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("ApiController")])]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("public")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("class")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("TestController")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token type-list"}},[a("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("ControllerBase")])]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("private")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("readonly")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("IDistributedCache")]),t._v(" _cache"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n    "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("public")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("TestController")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("IDistributedCache")]),t._v(" cache"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n        _cache "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" cache"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),a("span",{pre:!0,attrs:{class:"token attribute"}},[a("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("HttpGet")])]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("public")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("async")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token return-type class-name"}},[t._v("Task")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("Set")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token class-name"}},[a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("string")])]),t._v(" key"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token class-name"}},[a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("string")])]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("value")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token class-name"}},[a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("double")])]),t._v(" expiration"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n        "),a("span",{pre:!0,attrs:{class:"token class-name"}},[a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("var")])]),t._v(" encodedValue "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" Encoding"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("UTF8"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("GetBytes")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("value")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n        "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("await")]),t._v(" _cache"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("SetAsync")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("key"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" encodedValue"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("new")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token constructor-invocation class-name"}},[t._v("DistributedCacheEntryOptions")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" AbsoluteExpiration "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" DateTime"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("Now"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("AddSeconds")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("expiration"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),a("span",{pre:!0,attrs:{class:"token attribute"}},[a("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("HttpGet")])]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("public")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("async")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token return-type class-name"}},[t._v("Task"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("string")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("?")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("Get")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token class-name"}},[a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("string")])]),t._v(" key"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n        "),a("span",{pre:!0,attrs:{class:"token class-name"}},[a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("var")])]),t._v(" encodedValue "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("await")]),t._v(" _cache"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("GetAsync")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("key"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n        "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("if")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("encodedValue "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("==")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("null")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("null")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n        "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),t._v(" Encoding"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("UTF8"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("GetString")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("encodedValue"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),a("h2",{attrs:{id:"参考来源"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#参考来源"}},[t._v("#")]),t._v(" 参考来源")]),t._v(" "),a("p",[a("a",{attrs:{href:"https://blog.csdn.net/weixin_44442366/article/details/124206112",target:"_blank",rel:"noopener noreferrer"}},[t._v(".net 6 简单使用redis"),a("OutboundLink")],1)]),t._v(" "),a("p",[a("a",{attrs:{href:"https://docs.microsoft.com/zh-cn/aspnet/core/performance/caching/distributed?view=aspnetcore-6.0",target:"_blank",rel:"noopener noreferrer"}},[t._v("ASP.NET Core 中的分布式缓存"),a("OutboundLink")],1)])])}),[],!1,null,null,null);s.default=e.exports}}]);