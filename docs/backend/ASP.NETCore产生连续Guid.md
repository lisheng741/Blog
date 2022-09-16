# ASP.NET Core 产生连续 Guid



## 1 前言

### 1.1 这篇文章面向的读者

本文不会过多解释 Guid 是什么，以及顺序 Guid 的作用，需要读者自行具备：

- 知道 Guid，并且清楚其作用与优势
- 清楚 `Guid.NetGuid()` 产生的 Guid 是混乱无序的，想要一种产生顺序 Guid 的算法来保证数据库的高效运行

### 1.2 连续 Guid 的原理

Guid 形如：

```bsah
08da7241-170b-c8ef-a094-06224a651c6a
```

该 Guid 有16字节（byte）共128位（bit），可以包含时间戳，而顺序 Guid 主要是根据时间戳顺序来实现的，所以时间戳的部分，作为排序的**决定性因素**。

如示例中，前8个字节的内容为时间戳，将其转为十进制为：

```bash
637947921111435500
```

这是一个以时钟周期数（Tick）为单位的时间戳，为从公元1年1月1日0点至今的时钟周期数，1个 Tick 为 100ns（参考[微软官方关于 Ticks 的介绍](https://docs.microsoft.com/en-us/dotnet/api/system.datetime.ticks?view=net-6.0#remarks)）。

注：上方示例的 Guid 并不符合 RFC 4122 标准，至于什么是 RFC 4122 标准，以及 Guid 的版本，这里不展开，读者自行参考[什么是 GUID？](http://guid.one/guid)。

### 1.3 Guid 分块描述

由于下面会涉及到 Guid 结构的分块，这里提前描述一下。

可以参考[richardtallent/RT.Comb](https://github.com/richardtallent/RT.Comb#gory-details-about-uuids-and-guids)的描述：

可以认为 Guid 是由一个 Int32（`Data1`），2个 Int32（`Data2` 和 `Data3`），以及8个字节（`Data4`）组成的。

```bash
Guid: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
Data: 1        2    3    4
```

### 1.4 本文思路

先大概讲解 ABP 产生连续 Guid 的源码，并提出其问题（高并发产生的 Guid 并不连续）。

接着就问题，以及 ABP 的源码提出解决方案，并给出修改后的源码。

并会就 Sql Server 数据库特殊的 Guid 排序方式，提出一种简单的处理方案，让 Sql Server 与 MySql 等数据库保持一致的排序。



## 2 ABP 连续 Guid 的实现

### 2.1 ABP 连续 Guid 源码

[ABP产生连续 Guid 的源码](https://github.com/abpframework/abp/blob/dev/framework/src/Volo.Abp.Guids/Volo/Abp/Guids/SequentialGuidGenerator.cs)，来源于：[jhtodd/SequentialGuid](https://github.com/jhtodd/SequentialGuid/blob/master/SequentialGuid/Classes/SequentialGuid.cs).

该方式，产生的 Guid 有6个字节是时间戳（毫秒级），10个字节是随机数。

其中，顺序 Guid 主要是根据时间戳顺序来实现的，所以时间戳的部分，作为排序的决定性因素。

源码主要的部分摘录如下：

```csharp
public class SequentialGuidGenerator : IGuidGenerator, ITransientDependency
{
    public Guid Create(SequentialGuidType guidType)
    {
        // 获取 10 字节随机序列数组
        var randomBytes = new byte[10];
        RandomNumberGenerator.GetBytes(randomBytes);

        // 获取 Ticks，并处理为毫秒级（1个Tick为100ns，1ms=1000us=1000000ns）
        long timestamp = DateTime.UtcNow.Ticks / 10000L;

        // 时间戳转为 byte 数组
        byte[] timestampBytes = BitConverter.GetBytes(timestamp);

        // 因为数组是从 int64 转化过来的，如果是在小端系统中（little-endian），需要翻转
        if (BitConverter.IsLittleEndian)
        {
            Array.Reverse(timestampBytes);
        }

        byte[] guidBytes = new byte[16];

        switch (guidType)
        {
            case SequentialGuidType.SequentialAsString:
            case SequentialGuidType.SequentialAsBinary:
                
                // 16位数组：前6位为时间戳，后10位为随机数
                Buffer.BlockCopy(timestampBytes, 2, guidBytes, 0, 6);
                Buffer.BlockCopy(randomBytes, 0, guidBytes, 6, 10);
                
                // .NET中，Data1 和 Data2块 分别视为 Int32 和 Int16
                // 跟时间戳从 Int64 转 byte 数组后需要翻转一个理，在小端系统，需要翻转这两个块。
                if (guidType == SequentialGuidType.SequentialAsString && BitConverter.IsLittleEndian)
                {
                    Array.Reverse(guidBytes, 0, 4);
                    Array.Reverse(guidBytes, 4, 2);
                }
                break;
                
            case SequentialGuidType.SequentialAtEnd:
                
                // 16位数组：前10位为随机数，后6位为时间戳
                Buffer.BlockCopy(randomBytes, 0, guidBytes, 0, 10);
                Buffer.BlockCopy(timestampBytes, 2, guidBytes, 10, 6);
                break;
        }
        return new Guid(guidBytes);
    }
}
```

`RandomNumberGenerator` 用于生成随机序列数组。

`DateTime.UtcNow.Ticks` 为获取从公元1年1月1日0点至今的时钟周期数，1个Tick为100ns（[微软官方关于 Ticks 的介绍](https://docs.microsoft.com/en-us/dotnet/api/system.datetime.ticks?view=net-6.0#remarks)）。

`SequentialGuidType`  为产生连续 Guid 的类别，默认为 `SequentialAtEnd` ，定义如下：

```csharp
public enum SequentialGuidType
{
    /// <summary>
    /// 用于 MySql 和 PostgreSql.当使用 Guid.ToString() 方法进行格式化时连续.
    /// </summary>
    SequentialAsString,

    /// <summary>
    /// 用于 Oracle.当使用 Guid.ToByteArray() 方法进行格式化时连续.
    /// </summary>
    SequentialAsBinary,

    /// <summary>
    /// 用以 SqlServer.连续性体现于 GUID 的第4块（Data4）.
    /// </summary>
    SequentialAtEnd
}
```

如各个枚举属性的 summary 描述，主要是因为数据库关于 Guid 排序方式的不同。

至于代码中需要翻转 byte 数组的部分，这一部分，可以参考：[Is there a .NET equivalent to SQL Server's newsequentialid()](https://stackoverflow.com/questions/211498/is-there-a-net-equivalent-to-sql-servers-newsequentialid)（Stack Overflow 这个问题，有一个回答介绍了时间戳高低位在 Guid 中的排布）。笔者也是看得一脸懵逼，就不在这里误人子弟了。

至于大端、小端，属于计算机组成原理的知识，如果不记得了，可以自行百度（或参考[大端、小端基础知识](https://zhuanlan.zhihu.com/p/316347205)）。

### 2.2 不同数据库 Guid 的排序方式

由于笔者只用过 MySql 和 Sql Server，测试也只用了这两种数据库测试，故而也只讲这两种。

[richardtallent/RT.Comb](https://github.com/richardtallent/RT.Comb#icombprovider)这个仓库也介绍了这一部分内容。

#### （1）MySql

笔者的 MySql 版本为 8.0.26.

MySql 对 Guid 的处理为字符串方式，排序方式为从左到右的。

故而决定顺序的时间戳部分应该位于 Guid 的左侧，所以 ABP 的源码里 Guid 的16位数组：前6位为时间戳，后10位为随机数。

#### （2）Sql Server

笔者的 Sql Server 版本为 2019 Express.

Sql Server 关于 Guid 的排序方式比较特殊，属于分块排序。

先排 `Data4` 的后6个字节（即最后一块，也即从第10个字节开始的最后6个字节），块内依旧是从左到右排序。

接着排 `Data4` 的前2个字节（即倒数第2块，也即从第8个字节开始的2个字节），块内依旧是从左到右排序。

随后依次是 `Data3`, `Data2`, `Data1` （其中，笔者验证了 `Data3` 的块内排序，并非从左到右，而是先排了块内第2个字节，后排第1个字节，可能是 Sql Server 认为 `Data3` 是 `Int16`，而小端处理后将2个字节翻转了，显示虽然显示了 `Mxxx`，但实际上是 `xxMx`，排序也是按后者来排）.

故而决定顺序的时间戳部分应该位于 Guid 的右侧，所以 ABP 的源码里 Guid 的16位数组：前10位为随机数，后6位为时间戳。

### 2.3 存在的问题

#### （1）毫秒级的时间戳

由于决定排序因素的部分为时间戳，而时间戳被处理成毫秒级。高并发的情况下，时间戳部分基本上一致，导致短时间内生成的 Guid 并不连续，是无序的。

```csharp
// 获取 Ticks，并处理为毫秒级（1个Tick为100ns，1ms=1000us=1000000ns）
long timestamp = DateTime.UtcNow.Ticks / 10000L;
```

#### （2）非标准 Guid

这里还是大概介绍一下 RFC 4122 版本4的内容：

Guid 组成形如：

```bash
xxxxxxxx-xxxx-Mxxx-Nxxx-xxxxxxxxxxxx
```

其中 M 为 RFC 版本（version），版本4的话，值为4。

N 为变体（variant），值为 8, 9, A, B 其中一个。

版本4为保留版本号和变体，其他位均为随机。

显然，ABP 的方案，一部分是时间戳，余下的部分均为随机数，这样并不包含版本和变体，不属于任何一版本的 Guid，为非标准的 Guid。



## 3 连续 Guid 修改版本

### 3.1 解决高并发时间戳一致问题

#### （1）实现

基于上述的方案的问题1，由于问题是高并发的情况下时间戳一致的问题，那么尽量让时间戳的间隔再小一点，即可，如修改时间戳的代码为：

```csharp
long timestamp = DateTime.UtcNow.Ticks;
```

直接将毫秒的处理去掉，让时间戳为纳秒级（ns）。

另外，还需要将时间戳原本只取6个字节，改成8个字节，让尾部的时间戳作用于 Guid 上。

完整的代码修改如下：

```csharp
public static Guid Next(SequentialGuidType guidType)
{
    // 原先 10 字节的随机序列数组，减少为 8 字节
    var randomBytes = new byte[8];
    _randomNumberGenerator.GetBytes(randomBytes);

    // 时间戳保持纳秒级，不额外处理
    long timestamp = DateTime.UtcNow.Ticks;

    byte[] timestampBytes = BitConverter.GetBytes(timestamp);
    if (BitConverter.IsLittleEndian)
    {
        Array.Reverse(timestampBytes);
    }

    byte[] guidBytes = new byte[16];

    switch (guidType)
    {
        case SequentialGuidType.SequentialAsString:
        case SequentialGuidType.SequentialAsBinary:

            // 16位数组：前8位为时间戳，后8位为随机数
            Buffer.BlockCopy(timestampBytes, 0, guidBytes, 0, 8);
            Buffer.BlockCopy(randomBytes, 0, guidBytes, 8, 8);

            // .NET中，Data1、Data2、Data3 块 分别视为 Int32、Int16、Int16
            // 跟时间戳从 Int64 转 byte 数组后需要翻转一个理，在小端系统，需要翻转这3个块。
            if (guidType == SequentialGuidType.AsString && BitConverter.IsLittleEndian)
            {
                Array.Reverse(guidBytes, 0, 4);
                Array.Reverse(guidBytes, 4, 2);
                Array.Reverse(guidBytes, 6, 2); // 翻转
            }

            break;

        case SequentialGuidType.SequentialAtEnd:

            // 16位数组：前8位为随机数，后8位为时间戳
            Buffer.BlockCopy(randomBytes, 0, guidBytes, 0, 8);
            // 方案1：正常拼接。这种方式只能连续1年+
            Buffer.BlockCopy(timestampBytes, 0, guidBytes, 8, 8);
            // 方案2：将时间戳末尾的2个字节，放到 Data4 的前2个字节
            Buffer.BlockCopy(timestampBytes, 6, guidBytes, 8, 2);
            Buffer.BlockCopy(timestampBytes, 0, guidBytes, 10, 6);
            break;
    }

    return new Guid(guidBytes);
}
```

#### （2）测试

AsString 方式：

```bash
# 主要影响排序的，体现在 Guid 第8个字节。
08da7241-170b-c8ef-a094-06224a651c6a	0
08da7241-170b-d141-6ffc-5cdcecec5db9	1
08da7241-170b-d14e-d49e-81ce5efa6143	2
08da7241-170b-d150-8f59-836eab8d1939	3
08da7241-170b-d152-ac41-0c357a8aa4a1	4
08da7241-170b-d163-90a4-6083d462eeaf	5
08da7241-170b-d175-25b2-1d47ddd25939	6
08da7241-170b-d178-aa93-dc86e6391438	7
08da7241-170b-d185-619f-c24faf992806	8
08da7241-170b-d188-bd51-e36029ad9816	9
```

AtEnd 方式：

```bash
// 顺序体现在最后一个字节
983C1A57-8C2B-DE7D-08DA-724214AED77D	0
4F1389B8-59F6-7C78-08DA-724214AEDAB6	1
CF6D52B1-3BFA-272F-08DA-724214AEDABC	2
017C4F99-4499-67DB-08DA-724214AEDABE	3
4B0A0685-4355-2060-08DA-724214AEDAC0	4
D690E344-DDB4-16CB-08DA-724214AEDAC6	5
6E22CDBE-65FE-64DC-08DA-724214AEDAC8	6
72E67EB4-CA92-DF3A-08DA-724214AEDACA	7
AA93D914-5415-21C9-08DA-724214AEDACB	8
9D93FA3F-84B6-519D-08DA-724214AEDACD	9
```

### 3.2 产生符合 RFC 4122 标准的 Guid

笔者对于这一块内容，也是一脸懵逼。

大概的思路是：在 ABP 连续 Guid 的方案中，插入版本（M）和变体（N），那么牺牲1个字节（byte）共8个位（bit）的随机数即可，影响到时间戳的部分，则往后挪一挪。

```bash
xxxxxxxx-xxxx-Mxxx-Nxxx-xxxxxxxxxxxx
```

修改后的代码比较复杂，如下：

```csharp
public static Guid Next(SequentialGuidType guidType)
{
    // see: What is a GUID? http://guid.one/guid
    // see: https://github.com/richardtallent/RT.Comb#gory-details-about-uuids-and-guids
    // According to RFC 4122:
    // dddddddd-dddd-Mddd-Ndrr-rrrrrrrrrrrr
    // - M = RFC 版本（version）, 版本4的话，值为4
    // - N = RFC 变体（variant），值为 8, 9, A, B 其中一个，这里固定为8
    // - d = 从公元1年1月1日0时至今的时钟周期数（DateTime.UtcNow.Ticks）
    // - r = 随机数（random bytes）

    var randomBytes = new byte[8];
    _randomNumberGenerator.GetBytes(randomBytes);

    byte version = (byte)4;
    byte variant = (byte)8;
    byte filterHighBit = 0b00001111;
    byte filterLowBit = 0b11110000;

    long timestamp = DateTime.UtcNow.Ticks;

    byte[] timestampBytes = BitConverter.GetBytes(timestamp);
    if (BitConverter.IsLittleEndian)
    {
        Array.Reverse(timestampBytes);
    }

    byte[] guidBytes = new byte[16];

    switch (guidType)
    {
        case SequentialGuidType.SequentialAsString:
        case SequentialGuidType.SequentialAsBinary:

            // AsString: dddddddd-dddd-Mddd-Ndrr-rrrrrrrrrrrr
            Buffer.BlockCopy(timestampBytes, 0, guidBytes, 0, 6); // 时间戳前6个字节，共48位
            // guidBytes[6]：高4位为版本 | 低4位取时间戳序号[6]的元素的高4位
            guidBytes[6] = (byte)((version << 4) | ((timestampBytes[6] & filterLowBit) >> 4)); 
            // guidBytes[7]:高4位取：[6]低4位 | 低4位取：[7]高4位
            guidBytes[7] = (byte)(((timestampBytes[6] & filterHighBit) << 4) | ((timestampBytes[7] & filterLowBit) >> 4)); 
            // guidBytes[8]：高4位为：变体 | 低4位取：[7]低4位
            guidBytes[8] = (byte)((variant << 4) | (timestampBytes[7] & filterHighBit)); 
            Buffer.BlockCopy(randomBytes, 0, guidBytes, 9, 7); // 余下7个字节由随机数组填充

            // .NET中，Data1、Data2、Data3 块 分别视为 Int32、Int16、Int16，在小端系统，需要翻转这3个块。
            if (guidType == SequentialGuidType.AsString && BitConverter.IsLittleEndian)
            {
                Array.Reverse(guidBytes, 0, 4);
                Array.Reverse(guidBytes, 4, 2);
                Array.Reverse(guidBytes, 6, 2);
            }

            break;

        case SequentialGuidType.SequentialAtEnd:

            // AtEnd: rrrrrrrr-rrrr-Mxdr-Nddd-dddddddddddd
            // Block: 1        2    3    4    5
            // Data4 = Block4 + Block5
            // 排序顺序：Block5 > Block4 > Block3 > Block2 > Block1
            // Data3 = Block3 被认为是 uint16，排序并不是从左到右，为消除影响，x 位取固定值
            
            Buffer.BlockCopy(randomBytes, 0, guidBytes, 0, 6);
            // Mx 高4位为版本 | 低4位取：全0
            guidBytes[6] = (byte)(version << 4); 
            // dr 高4位为：时间戳[7]低4位 | 低4位取：随机数
            guidBytes[7] = (byte)(((timestampBytes[7] & filterHighBit) << 4) | (randomBytes[7] & filterHighBit)); 
            // Nd 高4位为：变体 | 低4位取：时间戳[6]高4位
            guidBytes[8] = (byte)((variant << 4) | ((timestampBytes[6] & filterLowBit) >> 4)); 
            // dd 高4位为：时间戳[6]低4位 | 低4位取：时间戳[7]高4位
            guidBytes[9] = (byte)(((timestampBytes[6] & filterHighBit) << 4) | ((timestampBytes[7] & filterLowBit) >> 4)); 
            Buffer.BlockCopy(timestampBytes, 0, guidBytes, 10, 6); // 时间戳前6个字节

            if (BitConverter.IsLittleEndian)
            {
                //Array.Reverse(guidBytes, 0, 4); // 随机数就不翻转了
                //Array.Reverse(guidBytes, 4, 2);
                Array.Reverse(guidBytes, 6, 2); // 包含版本号的 Data3 块需要翻转
            }
            break;
    }

    return new Guid(guidBytes);
}
```



## 4 Sql Server 关于 Guid 的处理方案

基于 Sql Server 特殊的 Guid 排序方式，这里提出一种解决方案：

不使用 Sql Server 默认的 `[uniqueidentifier]` 而改用 `char(36)`，这样能让 Sql Server 的 Guid 处理成字符串，令其排序方式与字符串一致（与 MySql 和 C# 程序中的排序统一）。

具体处理可以在自定义的 DbContext 的 OnModelCreating 中配置：

```csharp
// 获取所有注册的实体，遍历
foreach (var entityType in builder.Model.GetEntityTypes())
{
    // 获取实体的所有属性，遍历
    PropertyInfo[] propertyInfos = entityType.ClrType.GetProperties();
    foreach (PropertyInfo propertyInfo in propertyInfos)
    {
        string propertyName = propertyInfo.Name;
        // 将 Guid 类型设置为 char(36)
        if (propertyInfo.PropertyType == typeof(Guid))
        {
            builder.Entity(entityType.ClrType).Property(propertyName).HasColumnType("char(36)");
        }
        if(propertyInfo.PropertyType == typeof(Nullable<Guid>))
        {
            builder.Entity(entityType.ClrType).Property(propertyName).HasColumnType("char(36)").IsRequired(false);
        }
    }
}
```



## 5 完整的代码

这里将完整的 GuidHelper 给出：

通过 `GuidHelper.Next()` 生成连续的 Guid.

```csharp
using System.Security.Cryptography;

public enum SequentialGuidType
{
    /// <summary>
    /// 用于 MySql 和 PostgreSql.
    ///  当使用 <see cref="Guid.ToString()" /> 方法进行格式化时连续.
    /// </summary>
    AsString,

    /// <summary>
    /// 用于 Oracle.
    /// 当使用 <see cref="Guid.ToByteArray()" /> 方法进行格式化时连续.
    /// </summary>
    AsBinary,

    /// <summary>
    /// 用以 SqlServer.
    /// 连续性体现于 GUID 的第4块（Data4）.
    /// </summary>
    AtEnd
}

public static class GuidHelper
{
    private const byte version = (byte)4;
    private const byte variant = (byte)8;
    private const byte filterHighBit = 0b00001111;
    private const byte filterLowBit = 0b11110000;
    private static readonly RandomNumberGenerator _randomNumberGenerator = RandomNumberGenerator.Create();

    /// <summary>
    /// 连续 Guid 类型，默认：AsString.
    /// </summary>
    public static SequentialGuidType SequentialGuidType { get; set; } = SequentialGuidType.AsString;

    /// <summary>
    /// 生成连续 Guid.
    /// </summary>
    /// <returns></returns>
    public static Guid Next()
    {
        return Next(SequentialGuidType);
    }

    /// <summary>
    /// 生成连续 Guid（生成的 Guid 并不符合 RFC 4122 标准）.
    /// 来源：Abp. from jhtodd/SequentialGuid https://github.com/jhtodd/SequentialGuid/blob/master/SequentialGuid/Classes/SequentialGuid.cs .
    /// </summary>
    /// <param name="guidType"></param>
    /// <returns></returns>
    public static Guid NextOld(SequentialGuidType guidType)
    {
        var randomBytes = new byte[8];
        _randomNumberGenerator.GetBytes(randomBytes);

        long timestamp = DateTime.UtcNow.Ticks;

        byte[] timestampBytes = BitConverter.GetBytes(timestamp);
        if (BitConverter.IsLittleEndian)
        {
            Array.Reverse(timestampBytes);
        }

        byte[] guidBytes = new byte[16];

        switch (guidType)
        {
            case SequentialGuidType.AsString:
            case SequentialGuidType.AsBinary:

                // 16位数组：前8位为时间戳，后8位为随机数
                Buffer.BlockCopy(timestampBytes, 0, guidBytes, 0, 8);
                Buffer.BlockCopy(randomBytes, 0, guidBytes, 8, 8);

                // .NET中，Data1、Data2、Data3 块 分别视为 Int32、Int16、Int16，在小端系统，需要翻转这3个块。
                if (guidType == SequentialGuidType.AsString && BitConverter.IsLittleEndian)
                {
                    Array.Reverse(guidBytes, 0, 4);
                    Array.Reverse(guidBytes, 4, 2);
                    Array.Reverse(guidBytes, 6, 2);
                }

                break;

            case SequentialGuidType.AtEnd:

                // 16位数组：前8位为随机数，后8位为时间戳
                Buffer.BlockCopy(randomBytes, 0, guidBytes, 0, 8);
            	Buffer.BlockCopy(timestampBytes, 6, guidBytes, 8, 2);
            	Buffer.BlockCopy(timestampBytes, 0, guidBytes, 10, 6);
                break;
        }

        return new Guid(guidBytes);
    }

    /// <summary>
    /// 生成连续 Guid.
    /// </summary>
    /// <param name="guidType"></param>
    /// <returns></returns>
    public static Guid Next(SequentialGuidType guidType)
    {
        // see: What is a GUID? http://guid.one/guid
        // see: https://github.com/richardtallent/RT.Comb#gory-details-about-uuids-and-guids
        // According to RFC 4122:
        // dddddddd-dddd-Mddd-Ndrr-rrrrrrrrrrrr
        // - M = RFC 版本（version）, 版本4的话，值为4
        // - N = RFC 变体（variant），值为 8, 9, A, B 其中一个，这里固定为8
        // - d = 从公元1年1月1日0时至今的时钟周期数（DateTime.UtcNow.Ticks）
        // - r = 随机数（random bytes）

        var randomBytes = new byte[8];
        _randomNumberGenerator.GetBytes(randomBytes);

        long timestamp = DateTime.UtcNow.Ticks;

        byte[] timestampBytes = BitConverter.GetBytes(timestamp);
        if (BitConverter.IsLittleEndian)
        {
            Array.Reverse(timestampBytes);
        }

        byte[] guidBytes = new byte[16];

        switch (guidType)
        {
            case SequentialGuidType.AsString:
            case SequentialGuidType.AsBinary:

                // AsString: dddddddd-dddd-Mddd-Ndrr-rrrrrrrrrrrr
                Buffer.BlockCopy(timestampBytes, 0, guidBytes, 0, 6); // 时间戳前6个字节，共48位
                guidBytes[6] = (byte)((version << 4) | ((timestampBytes[6] & filterLowBit) >> 4)); // 高4位为版本 | 低4位取时间戳序号[6]的元素的高4位
                guidBytes[7] = (byte)(((timestampBytes[6] & filterHighBit) << 4) | ((timestampBytes[7] & filterLowBit) >> 4)); // 高4位取：[6]低4位 | 低4位取：[7]高4位
                guidBytes[8] = (byte)((variant << 4) | (timestampBytes[7] & filterHighBit)); // 高4位为：变体 | 低4位取：[7]低4位
                Buffer.BlockCopy(randomBytes, 0, guidBytes, 9, 7); // 余下7个字节由随机数组填充

                // .NET中，Data1、Data2、Data3 块 分别视为 Int32、Int16、Int16，在小端系统，需要翻转这3个块。
                if (guidType == SequentialGuidType.AsString && BitConverter.IsLittleEndian)
                {
                    Array.Reverse(guidBytes, 0, 4);
                    Array.Reverse(guidBytes, 4, 2);
                    Array.Reverse(guidBytes, 6, 2);
                }

                break;

            case SequentialGuidType.AtEnd:

                // AtEnd: rrrrrrrr-rrrr-Mxdr-Nddd-dddddddddddd
                // Block: 1        2    3    4    5
                // Data4 = Block4 + Block5
                // 排序顺序：Block5 > Block4 > Block3 > Block2 > Block1
                // Data3 = Block3 被认为是 uint16，排序并不是从左到右，为消除影响，x 位取固定值
                
                Buffer.BlockCopy(randomBytes, 0, guidBytes, 0, 6);
                guidBytes[6] = (byte)(version << 4); // Mx 高4位为版本 | 低4位取：全0
                guidBytes[7] = (byte)(((timestampBytes[7] & filterHighBit) << 4) | (randomBytes[7] & filterHighBit)); ; // dr 高4位为：时间戳[7]低4位 | 低4位取：随机数
                guidBytes[8] = (byte)((variant << 4) | ((timestampBytes[6] & filterLowBit) >> 4)); // Nd 高4位为：变体 | 低4位取：时间戳[6]高4位
                guidBytes[9] = (byte)(((timestampBytes[6] & filterHighBit) << 4) | ((timestampBytes[7] & filterLowBit) >> 4)); // dd 高4位为：时间戳[6]低4位 | 低4位取：时间戳[7]高4位
                Buffer.BlockCopy(timestampBytes, 0, guidBytes, 10, 6); // 时间戳前6个字节

                if (BitConverter.IsLittleEndian)
                {
                    Array.Reverse(guidBytes, 6, 2); // 包含版本号的 Data3 块需要翻转
                }
                break;
        }

        return new Guid(guidBytes);
    }
}
```



## 6 其他全局唯一算法推荐

### 6.1 雪花算法

可以参考：[Adnc 项目的文章：如何动态分配雪花算法的WorkerId](https://github.com/AlphaYu/Adnc/wiki/%E5%A6%82%E4%BD%95%E5%8A%A8%E6%80%81%E5%88%86%E9%85%8D%E9%9B%AA%E8%8A%B1%E7%AE%97%E6%B3%95%E7%9A%84WorkerId).

Adnc 这个项目是[风口旁的猪](https://www.cnblogs.com/alphayu)的，一个轻量级的微服务/分布式开发框架。



## 参考来源

[ABP产生连续 Guid 的源码](https://github.com/abpframework/abp/blob/dev/framework/src/Volo.Abp.Guids/Volo/Abp/Guids/SequentialGuidGenerator.cs)

[DateTime.Ticks](https://docs.microsoft.com/en-us/dotnet/api/system.datetime.ticks?view=net-6.0#remarks)（微软官方关于 Ticks 的介绍，1个 Ticks 是100ns）

[Guid Generator is not sequential generating multiple call in one request](https://github.com/abpframework/abp/issues/11453)（ABP 的 issue）

[Is there a .NET equivalent to SQL Server's newsequentialid()](https://stackoverflow.com/questions/211498/is-there-a-net-equivalent-to-sql-servers-newsequentialid)（Stack Overflow 这个问题，有一个回答介绍了时间戳高低位在 Guid 中的排布）

[Pomelo.EntityFrameworkCore.MySql 连续 Guid 的源码](https://github.com/PomeloFoundation/Pomelo.EntityFrameworkCore.MySql/blob/ebe011a6f1b2a2a9709fe558cfc7ed3215b55c37/src/EFCore.MySql/ValueGeneration/Internal/MySqlSequentialGuidValueGenerator.cs)（Furion 源码看到的，这个方案我看不懂，大概理解了一下，实际上原理应该差不多，生成的 Guid 的连续的字符串。不过，这里生成的 Guid 是符合 Guid 的 RFC 4122 Version 4 标准的）

[不同数据库 Guid 的排序规则](https://github.com/richardtallent/RT.Comb#icombprovider)（讲了 MSSQL 即 Sql Server，还有 PostgreSQL）

[.NET生成多数据库有序Guid](https://www.cnblogs.com/Heris-d/p/9359859.html)（这篇贴出的源码与 Abp 没有太大区别，参考文章很齐全，可以看一看，这里不一一列出）

[UUID（GUID）不同版本和顺序递增探究](https://www.cnblogs.com/qinjin/p/uuid.html)

[什么是 GUID？](http://guid.one/guid)

[大端、小端基础知识](https://zhuanlan.zhihu.com/p/316347205)