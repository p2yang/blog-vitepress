---
title: Canvas 跨域脱坑实践
comments: true
date: 2018-11-02 14:35:29
updated: 2018-11-02 14:35:29
tags:
	- Canvas
categories:
	- web
---

`Canvas` 跨域如何解决？这里记录下使用 `Canvas` 绘图过程中所遇到的跨域问题和解决方案。

先来看下实现方法。

<!-- more -->

## 实现方法
目标图片一般是由 图片 + 文本 构成。无论是千奇百怪的大小图片，还是变幻莫测的各式文本，都能用 `canvas` api `drawImage` 和 `fillText` 方法来完成。

基本流程如下:

1. 获取 `canvas` 上下文 -- `ctx`

	```js
	const canvas = document.querySelector(selector)
	const ctx = canvas.getContext('2d')
	```

2. 绘图
忽略图片上的内容，直接用 `drawImage` 将其画到 `canvas` 画布上即可。

	```js
	const image = new Image()
	image.src = src
	image.onload = () => {
		ctx.save()
		// 这里我们采用以下参数调用
		this.ctx.drawImage(image, dx, dy, dWidth, dHeight)
		this.ctx.restore()
	}
	```

	`drawImage` 有3种参数使用方式，具体用法可以查看 [MDN 文档](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/drawImage)。

3. 获取图像数据
调用 `HTMLCanvasElement` DOM 对象提供的 `toBlob()`, `toDataURL()` 或 `getImageData()` 方法，即可。

	```js
	canvas.toBlob(blob => {
		// 你要的 blob
	}, mimeType, encoderOptions)
	```

	这里的 `mimeType` 默认值为 `image/png`。`encoderOptions` 指定了图片质量，可用于压缩，不过需要 `mimeType` 格式为 `image/jpeg` 或者 `image/webp`。

## Canvas 跨域
正常情况下，如果需要将绘制好的图像输出，我们可以调用 `canvas` 的 `toBlob()`, `toDataURL()` 或 `getImageData()` 方法来获取到图像数据。然而，遇到图片跨域的情况就有些尴尬了。可能回报如下错误:

```
Failed to execute 'toBlob' on 'HTMLCanvasElement': Tainted canvases may not be exported.
```

或者

```
Access to image at 'https://your.image.src' from origin 'https://your.website' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource.
```

先来看看第2种情况。

+ `Access-Control-Allow-Origin`
	如果你跨域使用某些图片资源，并且该服务未正确响应 `Access-Control-Allow-Origin` 头信息, 则会报出如下错误信息:

	```
	Access to image at 'https://your.image.src' from origin 'https://your.website' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource.
	```

	说明不允许跨域访问，那么你可以试着让后台修改 `Access-Control-Allow-Origin` 的值为 `*` 或 `your.website`, 或者改用同域资源（考虑下？）。

接下来，我们来解决第1种情况。

+ `img.crossOrigin = 'Anonymous'`
	为避免未经许可拉取远程网站信息而导致的用户隐私泄露（如 GPS 等信息，具体可搜索 Exif），在调用 `canvas` 的 `toBlob()`, `toDataURL()` 或 `getImageData()` 会抛出安全错误:

	```
	Failed to execute 'toBlob' on 'HTMLCanvasElement': Tainted canvases may not be exported.
	```

	如果你的图片服务允许跨域使用（如果不允许，见上条），那么你该考虑下给 img 元素加上 `crossOrigin` 属性，即：

	```js
	const image = new Image()
	image.crossOrigin = 'Anonymous'
	image.src = src
	```

如此，你便可以拿到图片数据了。如果没招，换同域资源吧～
