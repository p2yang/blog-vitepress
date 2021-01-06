---
title: Node 图片绘制及合成介绍
comments: true
date: 2019-01-17 10:14:09
updated: 2019-01-17 10:14:09
tags:
	- node
categories:
---

本文主要介绍 Node 图片绘制及合成的一些方式，不涉及图表相关。

<!-- more -->

## 实践方式
1. node-canvas - 类前端
	这里说的 canvas 是 web canvas 的 node 实现。其 api 与 web canvas 高度相似。

	安装：
	```bash
	npm install canvas
	```

2. gm - node
	`gm` 是通过 node 调用 `GraphicsMagick` 和 `ImageMagick` 来实现绘图功能的。其中，GraphicsMagick “短小精悍”，号称是“图像处理领域的瑞士军刀”, 是从 ImageMagick 5.2.2 中独立出来的。
    `gm` 支持链式调用，基本功能类似 canvas api，但更强大。可查看官方文档深入研究。

	使用方法：

	#### (1) 下载 GraphicsMagick 和 ImageMagick

	Mac 上可以直接直接使用 `Homebrew` 下载安装：

	```bash
	brew install imagemagick
	brew install graphicsmagick
	```

	#### (2) 安装 gm
	```bash
	npm install gm
	```

	#### (3) 基本使用
	```js
	const gm = require('gm')
	gm('/path/to/img.jpg')
		.font('/path/to/font.ttc') // 字体文件
        .fontSize(70)
        .fill('#ffe600')
        .drawText(0, 70, 'Hello')
        .resize(200, 100)
		.write('/path/to/resize.png', function (err) {
		  if (!err) console.log('done')
		})
	```

### 一些有意思的 Package
+ [d3](https://github.com/d3/d3)
+ [matter-js](https://github.com/liabru/matter-js)
+ [Proton](https://github.com/a-jie/Proton)
+ [Paper.js](http://paperjs.org)
+ [sprite.js](https://github.com/spritejs/spritejs)

## 参考链接
+ [node-canvas](https://github.com/Automattic/node-canvas)
+ [gm](https://github.com/aheckmann/gm)
+ [GraphicsMagick](http://www.graphicsmagick.org/)

