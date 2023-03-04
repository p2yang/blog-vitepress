---
title: webpack@5 升级实践
comments: true
date: 2022-12-11 17:36:43
updated: 2022-12-11 17:36:43
tags:
- webpack
categories:
- webpack
---

本文记录了 `webpack@4` 升级 `webpack@5` 步骤和注意事项。

<!-- more -->

> [webpack 官方迁移指南](https://webpack.js.org/migrate/5/)

## 升级 `dependencies` & `devDependencies`
1. webpack
+ `"webpack": "^4.46.0"` -> `^5.75.0`
+ `"webpack-dev-server": "^3.11.2"` -> `^4.11.1`
+ `"webpack-merge": "^4.2.1"` -> `^5.8.0`
+ `"webpack-bundle-analyzer": "^3.3.2"` -> `^4.7.0`

2. loaders
+ remove `url-loader`, `file-loader`, `raw-loader`, 使用 `webpack` 自带 Asset Modules 替代;
+ remove `cache-loader`
+ `"css-loader": "^5.2.7"` -> `^6.7.2`
+ `"less-loader": "^7.3.0"` -> `^11.1.0`
+ `"postcss-loader": "^4.3.0"` -> `^7.0.2`
+ `"sass-loader": "^10.1.0"` -> `^13.2.0`
+ `"style-loader": "^2.0.0"` -> `^3.3.1`
+ `"vue-loader": "^15.9.6"` -> `^15.9.8`

3. plugins
+ `"html-webpack-plugin": "^4.5.2"` -> `^5.5.0`
+ `"mini-css-extract-plugin": "^1.6.0"` -> `^2.7.2`
+ `"terser-webpack-plugin": "^2.2.1"` -> `^5.3.6`, remove `terser`
+ add `"css-minimizer-webpack-plugin": "^3.0.2"`
+ remove `optimize-css-assets-webpack-plugin`
+ remove `script-ext-html-webpack-plugin`

## 更新 webpack config
1. 依据[指南](https://webpack.js.org/migrate/5/#update-outdated-options)，更新配置
+ add `optimization.moduleIds: 'deterministic'`
+ add `cache.type: 'filesystem'`
+ remove `new webpack.HashedModuleIdsPlugin()`

2. `webpack-merge`
修改 require 取值 `const merge = require('webpack-merge')` 为 `const { merge } = require('webpack-merge')`

3. dev server
+ `webpack-dev-server` API 有改动，需要修改传参顺序
```js
const WebpackDevServer = require('webpack-dev-server')

// const server = new WebpackDevServer(compiler, devServerOptions)
// server.listen(PORT)

const server = new WebpackDevServer(devServerOptions, compiler)
server.start(PORT)
```

+ devServer options
删除 `contentBase`, `stats`，如下:
```js
{
	// ...
	static: ['public'],
	host: '0.0.0.0',
  client: {
    overlay: true
  },
  open: true,
  // ...
}
```

+ devtool
`devtool: 'cheap-module-eval-source-map'` -> `eval-cheap-source-map`

4. 删除自定义 open browser / ip 方法和调用

5. `optimization`
```js
optimization: {
 runtimeChunk: true,
 removeAvailableModules: false,
 removeEmptyChunks: false,
 splitChunks: false
}
```

6. 删除 `script-ext-html-webpack-plugin`
由于 `script-ext-html-webpack-plugin` 不支持 `webpack@5`， 原本想用 `@vue/preload-webpack-plugin` 代替 `script-ext-html-webpack-plugin`, 结果发现 `@vue/preload-webpack-plugin` 配置复杂，无法仅 preload js 类型文件，所以暂时舍弃了。

7. `vue-loader`
删除 `cacheDirectory`, `cacheIdentifier`

8. 图片、音频、字体等资源
```js
{
	test: /\.(jpe?g|png|gif|svg)$/i,
	type: 'asset',
 	parser: {
   	dataUrlCondition: {
     	maxSize: 1024
   	}
 	},
 	generator: {
   	filename: isProd ? 'images/[hash:8][ext][query]' : 'images/[name].[hash:8][ext]'
 	}
}, {
	test: /\.(mp3|mp4|ogg|webm|ttf)$/i,
	type: 'asset/resource',
 	generator: {
   	filename: isProd ? 'assets/[hash:8][ext][query]' : 'assets/[name].[hash:8][ext]'
  }
}
```

9. `svg-sprite-loader`
原本项目中使用的是 `extract` 模式，打包成独立 svg 文件，通过接口请求后插入 DOM。现在由于 webpack@5 `cache.type: 'filesystem'`, 导致开发模式下非首次打包无法获取到 svg, 所以这里取消了 `extract` 模式。
```js
{
	test: /\.svg$/,
	loader: 'svg-sprite-loader'
}
```

	注意，需要删除 `new SpriteLoaderPlugin()`

10. `css-minimizer-webpack-plugin`
使用 `css-minimizer-webpack-plugin` 替代 `optimize-css-assets-webpack-plugin`


## 升级 `nodejs >= 14.15.0`
1. 有部分 `dependencies` 最小 nodejs 版本为 `14.15.0`, 可酌情升级更高版本。
2. 如果 `--max_old_space_size=4096` 分配内存超出了系统上限，可能导致打包卡住，可删除该配置。

## 适配业务代码
1. `json` 文件 import 不能直接展开对象属性;
2. 环境变量不能是 undefined，即使是空值，也需要主动声明;
3. 根据提示增加 `resolve.fallback`，如 `querystring: require.resolve('querystring-es3')`;
4. 自定义的预渲染插件无法直接修改 `compilation.assets`，这里把插件改写为 nodejs 脚本来执行预渲染逻辑。

以上。

