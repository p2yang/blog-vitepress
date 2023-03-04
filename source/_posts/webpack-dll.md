---
title: Webpack DllPlugin 基本应用与实践
comments: true
date: 2020-01-19 22:37:31
updated: 2020-01-19 22:37:31
tags:
- webpack
categories:
- webpack
---

`Webpack` 内置插件 `DllPlugin` 可以将一些较长时间内、稳定不变的包或组件拆分出来，以 `script` 外链的形式引入页面，以减少 `webpack` 打包时间，长期缓存。本文记录了 Webpack 内置插件 `DllPlugin` 基本应用方法。

<!-- more -->

本文环境以 `webpack@4.x` + `node@10.x` 为主，应用分 3 步：
1. 单独打包 `dll` 相关文件；
2. 引入 `webpack` 配置；
3. 插入外链；

## 单独打包 `dll` 相关文件；
新建 `webpack` 配置文件 `webpack.dll.js`，添加 `dll` 相关文件打包配置，代码如下：

```js
// webpack.dll.js
const path = require('path')
const webpack = require('webpack')

module.exports = {
  mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
  entry: {
    vendor: [
      'vue',
      'vue-router',
      'vuex'
    ]
  },
  output: {
    path: path.resolve(__dirname, 'static/lib'),
    filename: '[name].dll.js'
  },
  plugins: [
    new webpack.DllPlugin({
      name: '[name]_[hash]',
      path: path.join(__dirname, '.', '[name]_manifest.json')
    })
  ]
}

```

然后在 `package.json` scripts 中添加命令:
```json
{
	"scripts": {
    "build:dll": "webpack --config dll/webpack.dll.js"
  }
}
```

配置好后，执行命令：

```zsh
npm run build:dll

# 或者
yarn build:dll
```

这里会将我们选取 vue 三件套打包出来(Github示例地址请看下文)，生成以下两个文件：

+ `vendor_manifest.json`: dll 配置文件，需要在 `webpack` 主配置文件中引入；
+ `vendor.dll.js`: 目标依赖整合文件，最后需要外链。

下面，来看下这两个文件的使用吧。

## 使用 `webpack.DllReferencePlugin` 引入 `webpack` 主配置；
在 `webpack` 主配置文件中引入 `vendor_manifest.json`：

```js
// webpack.config.js
const webpack = require('webpack')

module.exports = {
	// ...此处省略其他配置
  plugins: [
    new webpack.DllReferencePlugin({
      context: __dirname,
      manifest: require('./vendor_manifest.json')
    })
  ]
}

```

## 插入外链；
直接在 html 入口文件中引入。

```html
<script src="/static/lib/vendor.dll.js"></script>
```

启动本地服务看看吧。

注：可使用 [`anywhere`](https://www.npmjs.com/package/anywhere) 或者 [`http-server`](https://www.npmjs.com/package/http-server) 快速启动本地静态服务器。

## Github 示例
[Github 示例](https://github.com/p2yang/webpack-examples/tree/master/dll)
[个人博客](http://blog.p2yang.com)
