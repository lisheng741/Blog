# EF Core 的关联查询



## 0 前言

本文会列举出 EF Core 关联查询的方法：

在第一、二、三节中，介绍的是 EF Core 的基本能力，在实体中配置好关系，即可使用，且其使用方式，与编程思维吻合，是本文推荐的方式。

第四节中，将介绍 Linq 语句的两种关联查询方式：分别是 lambda 方式和 query 方式。



## 1 概述

数据库中，表与表之间可能是有一定关联关系的，在查询数据过程中，我们经常会用到关联查询（常见的关联查询有如：inner join、left join 等）。

而在程序中，使用 EF Core 写关联查询语句是比较难写的（或者说大部分 ORM 工具都是如此）。

其实 EF Core 提供了关系的配置，通过简单一些设置，可以让我们以代码的思维，去处理这些有关联关系的数据。

下面举个栗子：

官方例子的 Blog 和 Post 是一对多的关系，如果要查出某个 Blog 下的 Post，正常在数据库中，我们会写连接语句，大概如下：

```sql
SELECT b.BlogId, b.Url, p.PostId, p.Title, p.Context
FROM Blog b
LEFT JOIN Post p ON b.BlogId = p.BlogId
WHERE b.BlogId = 1
```

通过左连接（left join）进行关联查询。

而在 EF Core 中，如果我们建立起关系，以及配置好相应的导航属性，可以直接将实体关联起来，通过实体操作与实体关联的其他实体（如官方的例子，通过 Blog 操作与 Blog 关联的 Post）：

```csharp
var blog = db.Blogs.Include(b => b.Posts) // 关联 Post
    .Where(t => t.BlogId == 1)            // 查出 BlogId = 1 的记录
    .FirstOrDefault();                    // 查出第一条记录

var url = blog.Url;                       // 获取 blog 的 url 属性
var postCount = blog.Posts.Count;         // 获取与 Blog 关联的 Post 的数量
var title = blog.Posts[0].Title;
```

这种关联关系，在程序中操作，其实是很方便的。



## 2 基本实现

下面将会以一个简单的例子实现，具体可以查看官方[关系](https://docs.microsoft.com/zh-cn/ef/core/modeling/relationships)的内容。

### 2.1 配置导航属性

如下面，将会建立 Blog 和 Post 之间一对多的关系：

```csharp
public class Blog // 主体实体
{
    public int BlogId { get; set; } // 主体键
    public string Url { get; set; }

    public List<Post> Posts { get; set; } // 集合导航属性
}

public class Post // 依赖实体
{
    public int PostId { get; set; }
    public string Title { get; set; }
    public string Content { get; set; }

    public int BlogId { get; set; } // 外键
    public Blog Blog { get; set; } // 引用导航属性
}
```

`Post.Blog` 是 `Blog.Posts` 的反向导航属性（反之亦然）

### 2.2 添加 DbSet

在自定义的 DbContext 中添加相应对应 DbSet：

```csharp

public class EDbContext : DbContext
{
    public virtual DbSet<Blog> Blogs { get; set; }
    public virtual DbSet<Post> Posts { get; set; }

    public EDbContext() { }

    public EDbContext(DbContextOptions<EDbContext> options) : base(options) { }

    protected override void OnConfiguring(DbContextOptionsBuilder options)
    {
        options.UseSqlServer("server=localhost;database=EfCoreRelationship;uid=sa;pwd=Qwe123456;");
        base.OnConfiguring(options);
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
    }
}
```

### 2.3 查询

如此即可进行查询：

```csharp
var blog = db.Blogs.Include(b => b.Posts) // 关联 Post
    .Where(t => t.BlogId == 2)            // 查出 BlogId = 2 的记录
    .FirstOrDefault();                    // 查出第一条记录

var url = blog.Url;                       // 获取 blog 的 url 属性
var postCount = blog.Posts.Count;         // 获取与 Blog 关联的 Post 的数量
var title = blog.Posts[0].Title;
```



## 3 补充

这一节，将是对基本实现的一些内容的补充。

### 3.1 手动配置关系

基本实现中，没有在自定义的 DbContext 中明确配置关系，可以如下配置：

```csharp
protected override void OnModelCreating(ModelBuilder modelBuilder)
{
    modelBuilder.Entity<Post>()
        .HasOne(p => p.Blog)
        .WithMany(b => b.Posts);
}
```

### 3.2 阴影属性（shadow property）

如果依赖实体（如例子中 Post 实体）上，没有明确定义外键（如例子中 BlogId），具体可以查看[阴影和索引器属性](https://docs.microsoft.com/zh-cn/ef/core/modeling/shadow-properties)。

```csharp
public class Blog // 主体实体
{
    public int BlogId { get; set; } // 主体键
    public string Url { get; set; }

    public List<Post> Posts { get; set; } // 集合导航属性
}

public class Post // 依赖实体
{
    public int PostId { get; set; }
    public string Title { get; set; }
    public string Content { get; set; }

    // 自动引入 BlogId 阴影属性
    public Blog Blog { get; set; } // 引用导航属性
}
```

### 3.3 级联删除

参考[级联删除](https://docs.microsoft.com/zh-cn/ef/core/saving/cascade-delete)。

```csharp
protected override void OnModelCreating(ModelBuilder modelBuilder)
{
    modelBuilder.Entity<Post>()
        .HasOne(p => p.Blog)
        .WithMany(b => b.Posts)
        .OnDelete(DeleteBehavior.Cascade);
}
```

DeleteBehavior 枚举值及其定义，可以参考[DeleteBehavior 枚举](https://docs.microsoft.com/zh-CN/dotnet/api/microsoft.entityframeworkcore.deletebehavior?view=efcore-6.0)。

### 3.4 补充：加载相关数据

参考[加载相关数据](https://docs.microsoft.com/zh-cn/ef/core/querying/related-data/)

#### 3.4.1 预先加载

查询的时候，使用 Include 方法。

```csharp
var blogs = db.Blogs.Include(b => b.Posts) // 关联 Post
    .ToList(); 
```

包含多个层级，使用 ThenInclude

```
var blogs = db.Blogs.Include(blog => blog.Posts)
    .ThenInclude(post => post.Author)
    .ToList(); 
```

#### 3.4.2 显式加载

```csharp
using (var context = new BloggingContext())
{
    var blog = context.Blogs
        .Single(b => b.BlogId == 1);

    context.Entry(blog)
        .Collection(b => b.Posts)
        .Load();

    context.Entry(blog)
        .Reference(b => b.Owner)
        .Load();
}
```

#### 3.4.3 延迟加载

[相关数据的延迟加载](https://docs.microsoft.com/zh-cn/ef/core/querying/related-data/lazy)



## 4 Linq 语句实现关联查询

### 4.1 Lambda 方式

lambda 方式实现 EF Core 左连接查询（left join），使用 SelectMany 方法：

版本1：

```csharp
var blogs = _db.Set<Blog>()
            .SelectMany(b => _db.Set<Post>().Where(p => b.BlogId == p.BlogId).DefaultIfEmpty(), 
                        (b, ps) => new { b.Url, ps.Title })
            .ToList();
```

版本2：

```csharp
var blogs = _db.Set<Blog>()
            .GroupJoin(_db.Set<Post>(),
                        b => b.BlogId,
                        p => p.BlogId, (b, p) => new { b, p })
            .SelectMany(n => n.p.DefaultIfEmpty(), 
                        (n, p) => new { n.b.Url, p!.Title })
            .ToList();
```

两个版本的 sql 语句（都是一样的）：

```csharp
SELECT [b].[Url], [p].[Title]
FROM [Blog] AS [b]
LEFT JOIN [Post] AS [p] ON [b].[BlogId] = [p].[BlogId]
```

### 4.2 Query 方式

两表关联 query 方式基本写法：

```csharp
var query = from b in context.Set<Blog>()
            join p in context.Set<Post>()
    			on b.BlogId equals p.BlogId
            select new { b, p };
```

其他写法（实际上是基于 SelectMany 方法）：

```csharp
var query = from b in context.Set<Blog>()
            from p in context.Set<Post>().Where(p => b.BlogId == p.BlogId)
            select new { b, p };

var query2 = from b in context.Set<Blog>()
             from p in context.Set<Post>().Where(p => b.BlogId == p.BlogId).DefaultIfEmpty()
             select new { b, p };
```

对应的 sql 语句：

```sql
SELECT [b].[BlogId], [b].[OwnerId], [b].[Rating], [b].[Url], [p].[PostId], [p].[AuthorId], [p].[BlogId], [p].[Content], [p].[Rating], [p].[Title]
FROM [Blogs] AS [b]
INNER JOIN [Posts] AS [p] ON [b].[BlogId] = [p].[BlogId]

SELECT [b].[BlogId], [b].[OwnerId], [b].[Rating], [b].[Url], [p].[PostId], [p].[AuthorId], [p].[BlogId], [p].[Content], [p].[Rating], [p].[Title]
FROM [Blogs] AS [b]
LEFT JOIN [Posts] AS [p] ON [b].[BlogId] = [p].[BlogId]
```



## 参考来源

[EF Core 官方文档：关系](https://docs.microsoft.com/zh-cn/ef/core/modeling/relationships)

[EF Core 官方文档：复杂查询运算符](https://docs.microsoft.com/zh-cn/ef/core/querying/complex-query-operators)

