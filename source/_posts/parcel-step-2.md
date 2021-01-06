---
title: Parcel 开启三大CSS预处理器--Stylus/Less/Sass
comments: true
date: 2018-01-26 19:59:28
updated: 2018-01-26 19:59:28
tags:
- parcel
- vue
- css

categories:
---

Parcel 默认支持 Stylus/Less/Sass, 只不过需要安装对应的npm依赖。官方文档言语模糊，我们这里便来实践一下具体如何开启tylus/Less/Sass。

<!-- more -->

## 支持 **stylus**
```bash
yarn add stylus --dev
```

如在 App.vue 同目录下新建***style.styl*** 样式文件, 然后引入：

```vue
// template 和 script 内容略过
<style lang="stylus">
@import './style';
</style>
```

启动，会看到 Parcel 默认将样式文件内联到`<head>`标签中。


## 支持 **less**
```bash
yarn add less --dev
```

如在 App.vue 同目录下新建***style.less*** 样式文件, 然后引入：

```vue
// template 和 script 内容略过
<style lang="less">
@import './style';
</style>
```

## 支持 **sass**
```bash
yarn add node-sass --dev
```

如在 App.vue 同目录下新建***style.scss*** 样式文件, 然后引入：

```vue
// template 和 script 内容略过
<style lang="scss">
@import './style';
</style>
```

> 注意：上述如果启动失败，可以重装 `babel-preset-env` 依赖。


## 问题
实践过程中发现一个问题： 在vue 组件 `<style>` 中，通过 `@import`引入样式文件后，修改样式文件 HMR 失效。 这是个让人很受伤的问题。该问题是`parcel-plugin-vue`([查看issue18](https://github.com/BoltDoggy/parcel-plugin-vue/issues/18)) 导致的，目前还未解决。

我们这里可以先在vue 组件的 `<script>`中将样式 import 进来， HMR有效。
