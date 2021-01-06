---
title: 【实用推荐】npm script 便捷执行工具 - ntl
comments: true
date: 2020-02-28 12:05:24
updated: 2020-02-28 12:05:24
tags:
- npm
categories:
---

当 `package.json` 文件里写了很多 `scripts` 命令，一时想不起来有哪些怎么办？这里推荐一个 npm package: `ntl`, 不用打开配置文件, 直接在命令行中列出所有可执行命令，上下选择确认即可执行，非常方便。

![ntl](https://ruyadorno.github.io/svg-demos/ntl/examples/option-rerun.svg)

<!-- more -->
## 安装

```zsh
npm i ntl -g
```

## 配置
打开 `~/.bash_profile` 新增配置环境变量：

```bash
# .bash_profile
export NTL_RUNNER=yarn
```

## 使用
在项目根目录下执行 `ntl` 命令即可。

```zsh
ntl
```

其他参数，可查看[官方文档](https://www.npmjs.com/package/ntl)
