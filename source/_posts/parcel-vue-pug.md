---
title: parcel-vue环境下pug支持实践
comments: true
date: 2018-01-30 09:18:42
updated: 2018-01-30 09:18:42
tags:
- parcel
- vue

categories:
---

`parcel-plugin-vue` 插件默认没有实现此功能，需要我们自己写配置。其默认转换工具是 `vueify`, 根据文档资料，本文记录下实现 pug 支持的基本步骤。

<!-- more -->

## 添加配置文件 ***vue.config.js***
在根目录下新建配置文件 ***vue.config.js***，添加pug解析方法，具体如下：

```js
// vue.config.js
const pug = require('pug')

module.exports = {
    customCompilers: {
        pug (content, cb) {
            const html = pug.render(content)
            cb(null, html)
        }
    }
}
```

> 具体配置说明请查看[文档](https://github.com/vuejs/vueify#configuring-options).

## 添加依赖 `pug`
需要 `pug` 来解析, 所以添加
```bash
yarn add pug --dev
```

## 使用pug语法
现在就可以在。vue文件中书写pug语法了。
```vue
<template lang="pug">
  h1 parcel vue
</template>
// ...
```

--
到此，大功告成！
