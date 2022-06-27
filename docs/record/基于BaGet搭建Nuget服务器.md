# 基于 BaGet 搭建 Nuget 服务器



## 1 前言

### 1.1 BaGet 介绍

BaGet 是一个轻量级的，开源的，跨平台的 Nuget 和 symbol 服务器。

### 1.2 环境介绍

操作系统：CentOS 7

使用 Docker 安装



## 2 安装步骤

### 2.1 配置文件

登录 Linux 服务器以后，在 /root 目录下，创建一个 baget.env 文件：

```bash
touch baget.env
```

使用 vim 进入编辑：

```bash
vim baget.env
```

输入下面内容，将 ApiKey 设置为自己的密码：

```bash
# The following config is the API Key used to publish packages.
# You should change this to a secret value to secure your server.
ApiKey=NUGET-SERVER-API-KEY

Storage__Type=FileSystem
Storage__Path=/var/baget/packages
Database__Type=Sqlite
Database__ConnectionString=Data Source=/var/baget/baget.db
Search__Type=Database
```

更多的配置，可以查看：[BaGet's configuration](https://loic-sharma.github.io/BaGet/configuration/)

### 2.2 拉取 Docker 镜像

```bash
docker pull loicsharma/baget
```

### 2.3 启动 Baget

```bash
docker run --rm --name nuget-server -p 5555:80 --env-file baget.env -v "$(pwd)/baget-data:/var/baget" loicsharma/baget:latest
```

-p 5555:80 是把 docker 容器内的 80 端口映射到服务器的 5555 端口。

启动如果没有报错，则访问 http://服务器ip:5555，如 http://192.168.10.20:5555 即可成功访问



## 3 上传 Nuget 包

### 3.1 新建一个类库

使用 vs2022 新建一个类库，命名 MessageLib

```csharp
namespace MessageLib;

public class MessageLib
{
    public string Version { get; } = "1.0";

    public string Get()
    {
        return "test message!!!";
    }
}
```

右键项目属性，找到【包】一项，勾选 “在构建时生成 NuGet” 包。

并根据需要，指定包的一些属性，如包ID、版本等信息。

![image-20220520154238785](../images/image-20220520154238785.png)

### 3.2 生成解决方案

vs2022 的输出窗口输出如下信息：

```bash
已还原 D:\_code\testnetcore\Nuget\MessageLib\MessageLib\MessageLib.csproj (用时 3 ms)。
1>------ 已启动全部重新生成: 项目: MessageLib, 配置: Debug Any CPU ------
1>MessageLib -> D:\_code\testnetcore\Nuget\MessageLib\MessageLib\bin\Debug\net6.0\MessageLib.dll
1>已成功创建包“D:\_code\testnetcore\Nuget\MessageLib\MessageLib\bin\Debug\MessageLib.1.0.0.nupkg”。
========== 全部重新生成: 成功 1 个，失败 0 个，跳过 0 个 ==========
```

### 3.3 上传 Nuget 包

`Ctrl` + `~` 打开开发者 PowerShell，切换目录到上一步生成的包的路径：

```bash
cd D:\_code\testnetcore\Nuget\MessageLib\MessageLib\bin\Debug\
```

然后输入 publish 命令：

注意将命令中的地址改成自己的服务器地址，并且将 NUGET-SERVER-API-KEY 改成 baget.env 配置文件中设置的 ApiKey，包名 MessageLib.1.0.0.nupkg 对应改成自己的包名

```bash
dotnet nuget push -s http://localhost:5555/v3/index.json -k NUGET-SERVER-API-KEY MessageLib.1.0.0.nupkg
```

在网页中，可以看到上传的包：

![image-20220520160254594](../images/image-20220520160254594.png)



## 4 使用方式1：修改 VS 配置

使用自建服务器的 Nuget 包

### 4.1 修改 VS 配置

在：工具 -> 选项

添加一个新的包源，输入名称和源，点更新，确定

![image-20220520160624087](../images/image-20220520160624087.png)

### 4.2 引入 Nuget 包

在 Nuget 包界面中，选择程序包源为自己刚添加的自建服务器，选择对应的包安装即可。

![image-20220520160816243](../images/image-20220520160816243.png)



## 5 使用方式2：修改项目配置

### 增加 nuget.config 配置文件

在解决方案根目录，或者项目目录下，增加 nuget.config 配置文件。

注意：如果在解决方案根目录下增加，则该文件的配置，会覆盖默认的 VS 设置。

```xml
<?xml version="1.0" encoding="utf-8"?>
<configuration>

	<!-- Define the package sources, nuget.org and contoso.com. -->
	<!-- `clear` ensures no additional sources are inherited from another config file. -->
	<packageSources>
		<clear />
		<!-- `key` can be any identifier for your source. -->
		<add key="nuget.org" value="https://api.nuget.org/v3/index.json" />
		<add key="mynuget" value="http://175.178.244.200:6020/v3/index.json" />
	</packageSources>

	<!-- Define mappings by adding package patterns beneath the target source. -->
	<!-- Contoso.* packages and NuGet.Common will be restored from contoso.com, everything else from nuget.org. -->
	<packageSourceMapping>
		<!-- key value for <packageSource> should match key values from <packageSources> element -->
		<packageSource key="nuget.org">
			<package pattern="*" />
		</packageSource>
		<packageSource key="mynuget">
			<package pattern="MessageLib" />
            <package pattern="MessageLib.*" />
		</packageSource>
	</packageSourceMapping>

</configuration>
```

如上配置文件所示，MessageLib 这个 NuGet 包会通过 mynuget 这个源来还原，其他的使用默认的 nuget.org 还原。



## 参考来源

[BaGet](https://loic-sharma.github.io/BaGet/)