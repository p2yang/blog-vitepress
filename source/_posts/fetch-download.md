---
title: 使用 fetch 方法下载后端文件
comments: true
date: 2020-02-12 15:17:34
updated: 2020-02-12 15:17:34
tags:
- web
categories:
---

在 web 页面中使用原生 window.fetch 下载后端文件。

<!-- more -->

## 过程分析
1. fetch url;
2. 解析 `blob` 数据;
3. 从 `response header` 中解析文件名;
4. 动态创建 `a` 标签，利用 `download` 进行下载;
5. 将 `blob` 数据转成 data uri, 赋值给 a href .


## 源码
[Gist Code](https://gist.github.com/p2yang/72f23f5bd808d424f0b18af34f3c95e1)
<!-- download source code -->
<script src="https://gist.github.com/p2yang/72f23f5bd808d424f0b18af34f3c95e1.js"></script>
