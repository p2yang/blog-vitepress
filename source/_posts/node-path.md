---
title: Node API - Path
comments: true
date: 2018-01-03 09:20:46
updated: 2018-01-03 09:20:46
tags:
- node

categories:
---

准备好好过一下 node api, 先来看看 path 吧。

<!-- more -->

说明：本文是基于 node@9.3.0 整理。查看[官方文档](https://nodejs.org/docs/v9.3.0/api/path.html)

## 基本用法
人如其名，path 也一样，表示“路径”，是node中的一大模块，为文件和文件夹路径提供实用的信息。

引入很简单。在node环境下，直接require即可，如下所示。

```js
const path = require('path')
```

声明：下面的示例基本都是在POSIX系统下的结果。
<b style="color: #f00">注意：在windows和POSIX系统上，路径分隔符有区别。</b>

## 实用
### path.join([...paths])
自动添加系统分隔符，返回对应路径。
```js
path.join('/foo', 'bar', 'baz/asdf', 'quux', '..');
// Returns: '/foo/bar/baz/asdf'
```

### path.normalize(path)
序列化目标路径，解析 `..` 和 `.` 。
```
path.normalize('/foo/bar//baz/asdf/quux/..');
// Returns: '/foo/bar/baz/asdf'
```


## 相对，还是绝对？
### path.relative
```js
path.relative('/data/orandea/test/aaa', '/data/orandea/impl/bbb');
// Returns: '../../impl/bbb'
```

### path.resolve
```js
path.resolve('/foo/bar', './baz');
// Returns: '/foo/bar/baz'
```

## 格式化
### path.format(options)
返回由目标对象参数解析而成的路径字符串。
与 `path.parse` 相反。

参数 options 包含以下这些值
```
options = {
  dir: String,  // 文件夹路径
  root: String, // 根路径
  base: String, // 基本文件
  name: String, // name
  ext: String.  // 文件扩展名
}
```

* 如果 `options.dir` 存在，则 `options.root` 将被忽略
* 如果 `options.base` 存在，则 `options.ext` 和 `options.name` 将被忽略


### path.parse(path)
解析目标路径，返回对象（同上面的options）


## 其他 api
### path.basename(path[, ext])
返回最后的路径。
```js
path.basename('/foo/bar/baz/asdf/quux.html');
// Returns: 'quux.html'

path.basename('/foo/bar/baz/asdf/quux.html', '.html');
// Returns: 'quux'
```

### path.delimiter
返回系统分隔符。
* Windows 是`;`
* POSIX 是 `:`

### path.dirname(path)
返回目标路径所在的文件夹名。
```
path.dirname('/foo/bar/baz/asdf/quux');
// Returns: '/foo/bar/baz/asdf'
```

### path.extname(path)
返回目标路径扩展名（字符串）。
* 无扩展名，则返回空
* 以 `.` 结尾，则返回 `.`
* 以 `.` 开头，则返回空

### path.isAbsolute(path)
判断目标路径是否是绝对路径，返回布尔值。

### path.sep
返回系统分隔符

### path.posix
提供POSIX系统下的专属方法

### path.win32
提供windows系统下的专属方法

### path.toNamespacedPath(path)
windows平台专属，提供一个等价的命名盘符。

## 结语
详细的数据还是看[官方文档](!https://nodejs.org/api/path.html)比较好，本文只是一个简单的介绍。实际中，先了解，再使用，总比一头雾水要好。
