# SQL Server



## 链接其他 SQL 服务器

```sql
-- 连接其他SQL服务器===============
EXEC sp_addlinkedserver
@server = 'xxxdb', -- 目标服务器别名
@srvproduct = 'MSSQL',  -- 产品名称
@datasrc = '192.168.110.120' , -- 目标服务器名称
@provider = 'SQLOLEDB'
GO

EXEC sp_addlinkedsrvlogin
@rmtsrvname = 'xxxdb' , -- 与以上 @server 同名
@useself = 'false' ,
@locallogin = NULL ,
@rmtuser = 'sa' ,
@rmtpassword = '123456'

-- 删除
exec sp_dropserver 'xxxdb' , 'droplogins'
```

　

## 判断存在

1，判断**表**存在**字段**（参考：https://www.cnblogs.com/ouyy/p/9202491.html）

```sql
IF EXISTS(SELECT 1 FROM SYSOBJECTS so,SYSCOLUMNS sc    
    WHERE so.ID = sc.ID AND so.NAME='表名' AND sc.NAME='字段') 
IF EXISTS(SELECT 1 FROM syscolumns WHERE id = object_id('表名') AND name = '字段')
IF COL_LENGTH('表名', '字段') IS NOT NULL    
    PRINT N'存在'    
ELSE    
    PRINT N'不存在'   
```