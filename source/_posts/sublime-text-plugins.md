---
title: Sublime Text 实用插件
comments: true
date: 2018-05-21 19:04:05
updated: 2018-05-21 19:04:05
tags:
- Sublime Text

categories:
- Editor
---

本文是对 Sublime Text 编辑器一些实用插件的总结，可以参考下。

<!-- more -->

## 说明
想装插件，请先开启 `Package Control`, 网上教程很多，本文不做赘述。


所有支持的插件可以从[packagecontrol.io](https://packagecontrol.io/)上找到。

## Sync Settings -- 配置云同步
最简单的、省事儿、安全的方法当然是“拿来主义”了。这个插件可以将你的配置上传到[`Gist`](https://gist.github.com/)上，也可以将`Gist`上的配置同步到本地。也就是说，你可以直接获取别人分享的配置。注意这些配置包括了插件、快捷键、个性化配置等。

## SideBarEnhancements -- 侧边栏增强
默认的侧边栏功能极简，使用该插件应该能满足需求。

![](/blog/images/sublime/sidebar.png)

## SublimeCodeIntel -- 代码提示
这个就不用说了吧，效率必备。

## SublimeLinter -- 代码校验
配合以下两个插件，可以对文件进行 `Eslint` 规则校验，让代码更漂亮、风格更统一。

### SublimeLinter-eslint -- Eslint 语法校验
### SublimeLinter-json -- JSON 检测

## ESLint-Formatter -- Eslint fix
将不符合规则的代码格式化，不过，只能格式化简单的规则，如标点符号。

## Git
应该要装吧。

## Git​Gutter -- 显示git信息
看图：

![](/blog/images/sublime/gitgutter1.gif)

![](/blog/images/sublime/gitgutter2.gif)


## Git blame -- Git 历史问责
`vscode` 上有个`Gitlens`，可以在每行代码上显示上一次的`Git`提交记录。`Sublime Text` 上的 `Git blame` 同样可以实现此功能。代码责任到行，从此，不用担心甩锅（当然啦，可以查看具体的文件commit history）。该插件提供了快速查看某行或某文件上次修改历史记录的功能，十分方便。

## Color Highlighter -- 颜色高亮

![](/blog/images/sublime/colorhighlighte.png)

## Case Conversion -- 格式转换
将选中文本转换成目标格式，如 `snake_case`, `SCREAMING_SNAKE_CASE`, `camelCase`, `PascalCase`, `dot.case`等。

## DocBlockr -- 添加注释

![](/blog/images/sublime/docblockr.gif)

## 主题配色
### Spacegray
1. 白色

	![](/blog/images/sublime/spacegray1.png)

2. 黑色

	![](/blog/images/sublime/spacegray2.png)

### Material

![](/blog/images/sublime/material.gif)

## 结语
详细安装使用教程都可以在 [packagecontrol.io](https://packagecontrol.io/) 上找到，以上部分截图也是取自官方文档。暂时先记录到这里吧。
