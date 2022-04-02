# 便捷操作-VS Code

[[toc]]



## 1 主快捷键

<kbd>Ctrl</kbd> + <kbd>K</kbd> +  <kbd>Ctrl</kbd> + <kbd>S</kbd> **（查看）键盘快捷方式**

<kbd>F1</kbd> 或 <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>P</kbd> **主命令框（查找并运行指令）**

<kbd>Shift</kbd> + <kbd>P</kbd> **主命令框**

### 1.1 主命令框补充

> 主命令框输入 `?` 可以查看所有提示

**主要的几个符号：**

* `>` 用于显示所有命令
* `@` 用于显示和跳转文件中的“符号”（Symbols），在@符号后面添加 `:` 则可以把符号们按类别归类。
* `#` 用于显示和跳转工作区中的“符号”（Symbols）
* `:` 用于跳转到当前文件中的某一行



## 2 快捷键

### 2.1 左侧面板

<kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>E</kbd> **文件**

<kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>D</kbd> **运行和调试**

<kbd>Ctrl</kbd> + <kbd>B</kbd> **专注模式：隐藏左侧面板**

<kbd>Ctrl</kbd> + <kbd>J</kbd> **专注模式：隐藏下方控制台面板**

### 2.2 查看类

<kbd>Ctrl</kbd> + <kbd>R</kbd> **快捷切换窗口**

<kbd>Ctrl</kbd> + <kbd>F</kbd> **查找**

<kbd>F3</kbd> **查找下一个**

<kbd>Shift</kbd> + <kbd>F3</kbd> **查找上一个**

<kbd>Alt</kbd> + <kbd><-</kbd> **光标上一个位置**

<kbd>Alt</kbd> + <kbd>-></kbd> **光标下一个位置**

<kbd>Ctrl</kbd> + <kbd><-</kbd> **上一个单词**

<kbd>Ctrl</kbd> + <kbd>-></kbd> **下一个单词**

<kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>Space</kbd> **触发参数提示**

<kbd>Ctrl</kbd> + <kbd>鼠标</kbd>  **查看定义**

<kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>O</kbd> **符号跳转（查找函数等）**

<kbd>Ctrl</kbd> + <kbd>K</kbd> +  <kbd>Ctrl</kbd> + <kbd>/</kbd> **折叠注释**

<kbd>Ctrl</kbd> + <kbd>K</kbd> +  <kbd>Ctrl</kbd> + <kbd>L</kbd> **折叠切换：当前块**

<kbd>Ctrl</kbd> + <kbd>K</kbd> +  <kbd>Ctrl</kbd> + <kbd>数字0</kbd> **全部折叠**

<kbd>Ctrl</kbd> + <kbd>K</kbd> +  <kbd>Ctrl</kbd> + <kbd>J</kbd> **全部展开**

### 2.3 编辑类

<kbd>Alt</kbd> + <kbd>Shift</kbd> + <kbd>F</kbd> **格式化代码**

<kbd>Alt</kbd> + <kbd>J</kbd> **【自定义（该快捷键为人为设置）】合并行**

<kbd>Ctrl</kbd> + <kbd>/</kbd> **代码注释切换**

<kbd>Alt</kbd> + <kbd>鼠标左键</kbd>  **多光标（可用于同时修改）**



## 4 代码片段

### 4.1 构建代码片段

> 代码片段可以快速构建一段代码

```json
"Print to console": { //Print to console 是代码片段的名称
    "prefix": "log",  //打出 log 后按 Tab 键，可以直接构造出 body 的内容
    "body": [
        "console.log('$1');", //$1 是占位符
        "$2"
    ],
    "description": "Log output to console"
}
```

### 4.2 常用代码片段

#### 4.2.1 前端

```js
/**
//JSDoc 注释
//在函数上使用，可以生成注释
```



## 5 一些设置

### 5.1 explorer.autoReveal

切换文件时，滚动资源管理器滚动条到屏幕中间

### 5.2 explorer.confirmDelete

删除文件询问

### 5.3 shell 设置

```bash
# 默认 shell 设置
terminal.integrated.shell.windows
terminal.integrated.shell.osx
terminal.integrated.shell.linux

# 结果行数
terminal.integrated.scrollback
```

### 5.4 切换边栏位置

查找命令：切换边栏位置



## 6 其他补充

### 6.1 settings.json

位于 `.vscode\settings.json`

对项目的管理配置，比如能设定一个 Tab 键是几个空格等。



## 9 不理解

### 9.1 工作区

不同工作区，设置不同的插件、环境

### 9.2 任务

任务、任务检测、任务结果分析



## 参考来源

[VSCode 是什么](https://geek-docs.com/vscode/vscode-tutorials/what-is-vscode.html)