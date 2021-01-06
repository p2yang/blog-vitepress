---
title: Parcel + Vue 尝鲜
comments: true
date: 2018-01-24 19:46:26
updated: 2018-01-24 19:46:26
tags:
- parcel
- vue

categories:
---

Webpack 久负盛名，包罗万象。若是用其造轮子的话，难免修修补补。年前兴起了Parcel打包工具，号称“极速零配置”，让人不胜向往。这不得空了，就来尝尝鲜，记录下如何使用 Parcel + Vue进行开发。

<!-- more -->

这里是[示例代码](https://github.com/p2yang/parcel-vue)!

## 预备
### 两个依赖
* `parcel-bundler`([戳我👇](https://www.npmjs.com/package/parcel-bundler))
这是 ***Parcel*** 打包工具，“极速零配置”的起源。

* `parcel-plugin-vue`([戳我👇](https://www.npmjs.com/package/parcel-plugin-vue))
这是一个 parcel 插件，使 pacel 支持 `.vue` 文件。

### 项目结构
```
parcel-vue
├── package.json
├── .babelrc
├── index.html
├──src
   ├── App.vue
   ├── main.js
```
这是基本的项目结构。


## 开始
1. 安装parcel相关开发依赖

  ```
  yarn add parcel-bundler parcel-plugin-vue babel-preset-env -D
  ```

2. 安装vue

  ```
  yarn add vue
  ```

3. 添加入口文件 `index.html`

  ```
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>parcel + vue</title>
  </head>
  <body>
    <div id="app"></div>
    <script src="./src/main.js"></script>
  </body>
  </html>
  ```

4. 添加脚本内容 `main.js` 和 vue组件 `App.vue`

  ```
  // ./src/main.js
  import Vue from 'vue'
  import App from './App'

  new Vue({
    el: '#app',
    render: h => h(App)
  })
  ```

  ```
  // App.vue
  <template>
    <h1>parcel vue</h1>
  </template>

  <script>
  export default {
    name: 'App'
  }
  </script>
  ```

5. 配置 `.babelrc`
  ```
  {
    "presets": [
      "env"
    ]
  }
  ```


大功告成！！！

额，再加条启动脚本吧！
```
// package.json
{
  ...,
  "scripts": {
    "start": "parcel index.html"
  },
  ...
}
```

Node执行:
```bash
yarn start
```

好了，浏览器打开http://localhost:1234看看吧。

## 生产环境
构建生产环境，只需要执行：
```
parcel build index.html --public-url ./
```

这里以index.html为入口，parcel会自动识别和提取相关依赖资源，并在根目录下创建 `dist` 文件夹。这里 `dist` 名称是默认的，可以按意愿更改。可以通过命令 `parcel build -h` 查看具体的参数列表。

查看[示例代码](https://github.com/p2yang/parcel-vue)。
