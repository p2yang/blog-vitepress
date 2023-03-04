---
title: HTML 应用 a 标签拨打电话字符问题
comments: true
date: 2020-03-05 21:20:33
updated: 2020-03-05 21:20:33
tags:
- web
categories:
- web
---

在 HTML 中我们使用 `a` 标签来拨打电话。有一些特殊字符可能无法带入系统拨号键盘，如 `#`。

<!-- more -->

解决方法：对号码进行编码，如：

```html
<a href="tel:123*312%23"> TEL: 123*312# </a>
```

手机号中带有 `#`，编码后变成了 `%23`。
在 js 中，可以使用 `encodeURIComponent` 方法对其进行编码。

以上。
