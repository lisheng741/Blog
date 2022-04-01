# VS Code记录



## VS Code修改状态栏颜色

VS Code 默认主题或者VS2019的主题，状态栏都有点丑。

### 切换主题快捷键

<kbd>Ctrl</kbd> + <kbd>K</kbd> +  <kbd>Ctrl</kbd> + <kbd>T</kbd> 

### 修改配置

在设置的json文件下，添加一个节点

```json
"workbench.colorCustomizations": {
    "[Visual Studio 2019 Light]": {
        "activityBar.activeBackground": "#ffffff",
        "activityBar.background": "#eeeeee",
        "activityBar.foreground": "#000000",
        "statusBar.background": "#eeeeee",
        "statusBar.foreground": "#555555",
        "statusBar.noFolderBackground": "#eeeeee",
        "statusBar.noFolderForeground": "#555555",
        "statusBarItem.remoteBackground": "#dddddd",
        "statusBarItem.remoteForeground": "#555555",
        "editorSuggestWidget.selectedBackground": "#25bb00"
    },
    "[Visual Studio 2019 Dark]": {
        "statusBar.background": "#252525",
        "statusBar.foreground": "#AAAAAA",
        "statusBar.noFolderBackground": "#252525",
        "statusBar.noFolderForeground": "#AAAAAA",
        "statusBarItem.remoteBackground": "#555555",
        "statusBarItem.remoteForeground": "#BBBBBB"
    },
    "[Default Light+]": {
        "activityBar.activeBackground": "#ffffff",
        "activityBar.background": "#eeeeee",
        "activityBar.foreground": "#000000",
        "statusBar.background": "#eeeeee",
        "statusBar.foreground": "#555555",
        "statusBar.noFolderBackground": "#eeeeee",
        "statusBar.noFolderForeground": "#555555",
        "statusBarItem.remoteBackground": "#dddddd",
        "statusBarItem.remoteForeground": "#555555",
        "editorSuggestWidget.selectedBackground": "#25bb00"
    },
    "[Default Dark+]": {
        "statusBar.background": "#252525",
        "statusBar.foreground": "#AAAAAA",
        "statusBar.noFolderBackground": "#252525",
        "statusBar.noFolderForeground": "#AAAAAA",
        "statusBarItem.remoteBackground": "#555555",
        "statusBarItem.remoteForeground": "#BBBBBB"
    }
}
```



## VS Code 扩展/插件

### vscode-solution-explorer

> 在 vs code 中查看 vs 解决方案
>

### GitLens

> Git 插件
>

