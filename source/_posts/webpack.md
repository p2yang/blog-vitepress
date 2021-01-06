---
title: webpack 配置 react 开发环境
date: 2017-11-23 22:58:22
tags:
---

webpack 配置错综复杂，每次独立配置也会让我的心情跟着复杂起来。而今再也受不了，拿来即用可以，拿来受罪可不行。便在这里记录一下用 webpack 配置 react 开发的问题和实现过程。

<!--more-->
### 预热
react app 有现成的 build 工具, 可以快速生成项目配置，官方推荐 [create-react-app](https://github.com/facebookincubator/create-react-app)。如果你不想在配置上死磕，可以去研究研究如何使用这个工具，更专注地书写业务代码。

本文参考 [react官方文档](https://facebook.github.io/react/docs/hello-world.html) 和 [webpack官方文档](https://webpack.js.org/guides/)，结合各路 bug 解决方案而写，有所疏漏还请自行体会和交流。

### 初始化
   ～～～

1. 初始化 **package.json**

  这里使用 **yarn** 代替 **npm** 来配置和安装各路插件包，使用方法基本类似（[查看官方中文文档](https://yarnpkg.com/zh-Hans/docs)）。

  ```bash
  yarn init
  ```
  一路默认即可，也可以自己填入你想要的信息，后悔了也能修改。

2. 安装 **webpack**

  安装开发依赖: webpack
  ```bash
  yarn add webpack --dev
  ```

3. 配置 webpack 启动文件 *webpack.config.js*

  ```js
  const webpack = require('webpack')

  const config = {
    entry: './src/index.js',
    output: {
      filename: 'bundle.js',
      path: './dist'
    }
  }

  module.exports = config
  ```

4. 安装 *babel-loader*

  webpack 会将源文件打包输出到指定文件，所以我们需要配置入口和出口文件。另外，针对特定类型的文件，webpack 需要靠对应的 *loader* 来处理它们。由于本篇讲的是 `react`，所以这里需要加入 [babel-loader](https://github.com/babel/babel-loader)

  安装该 loader 还需安装依赖 *babel-core* 、 *babel-preset-env* 。
  ```bash
  yarn add babel-loader babel-core babel-preset-env --dev
  ```

  然后，在 *webpack.config.js* 中 config 添加配置：
  ```js
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  }
  ```

  要顺利启用 babel 需要添加一个配置文件，告诉她该如何执行。我们在根目录下添加 *.babelrc* 文件
  ```js
  // .babelrc
  {
    "presets": [
      "env",
      "react",
      "es2015"
    ]
  }
  ```

5. 安装 *react*

  安装 react 和 react-dom

  ```bash
  yarn add react react-dom
  ```

6. 写入 react 内容

  ```js
  import React from 'react'
  import ReactDOM from 'react-dom'

  ReactDOM.render(
    <h1>Hello, world!</h1>,
    document.getElementById('root')
  )
  ```

7. 配置 html 模板

  webpack 会导出一个 js 文件，若想在前端页面中执行，需要一个 html 文件来引入。
  我们在根目录下新建文件夹 *public* ，用于存放公共的静态资源。然后在其中新建文件 *index.html* ，添加 root 元素：
  ```html
  <div id='root'></div>
  ```

  这里不用手写script标签来引入js，而用 webpack 插件来配置和引入。首先安装 `html-webpack-plugin`，

  ```bash
  yarn add html-webpack-plugin --dev
  ```

  然后，在 *webpack.config.js* 中添加 config 配置：

  ```js
  ...
  const HtmlWebpackPlugin = require('html-webpack-plugin')

  ...
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html'
    })
  ],
  ```
  上面，我们在 *template* 中指定 index.html 路径。

8. 添加启动脚本

  在 *package.json* 中添加 `scripts`
  ```js
  "scripts": {
    "build": "webpack"
  }
  ```
  然后，执行命令：
  ```bash
  yarn run build
  ```
  执行成功后，根目录下会生成 dist 文件夹，这就是我们所需要的文件了。

  此时，项目目录结构如下：
  ![webpack_react_config.png](./webpack_react_config.png)




