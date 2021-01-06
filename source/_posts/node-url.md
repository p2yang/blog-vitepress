---
title: Node API - URL
comments: true
date: 2018-05-15 09:33:10
updated: 2018-05-15 09:33:10
tags:
- node

categories:
---

`URL` 提供了一系列 url 解析和处理方法。

<!-- more -->

说明：本文是基于 node@9.3.0 整理。 查看[官方文档](https://nodejs.org/docs/v9.3.0/api/url.html)

## 两种实践
Node `url` 有两种实现实践形式。

### 一. WHATWG URL 标准
在 WHATWG 标准规范中定义了一个 `URL` 类，`new` 出一个示例后，就可以得到一系列解析值。如下：

```js
const { URL } = require('url');
const parsedUrl = new URL('https://user:pass@sub.host.com:8080/p/a/t/h?query=string#hash');
```

1. 属性

  得到的 `parsedUrl` 对象如下：
  ```node
  {
    href: 'https://user:pass@sub.host.com:8080/p/a/t/h?query=string#hash',
    origin: 'https://sub.host.com:8080',
    protocol: 'https:',
    username: 'user',
    password: 'pass',
    host: 'sub.host.com:8080',
    hostname: 'sub.host.com',
    port: '8080',
    pathname: '/p/a/t/h',
    search: '?query=string',
    searchParams: URLSearchParams { 'query' => 'string' },
    hash: '#hash'
  }
  ```

  上面这些属性都可以通过setter的方式赋值改写，如：

  ```js
  const { URL } = require('url');
  const myURL = new URL('https://example.org');
  console.log(myURL.protocol);
  // Prints https:

  myURL.protocol = 'ftp';
  console.log(myURL.href);
  // Prints ftp://example.org/
  ```

2. 方法
  + url.format(url[, options])

  + url.domainToUnicode(domain)

  + url.domainToASCII(domain)

### 二. Node 自实现
```js
const url = require('url')
const parsedUrl = url.parse('https://user:pass@sub.host.com:8080/p/a/t/h?query=string#hash')
```

解析结果如下：
```js
{
  protocol: 'https:',
  slashes: true,
  auth: 'user:pass',
  host: 'sub.host.com:8080',
  port: '8080',
  hostname: 'sub.host.com',
  hash: '#hash',
  search: '?query=string',
  query: 'query=string',
  pathname: '/p/a/t/h',
  path: '/p/a/t/h?query=string',
  href: 'https://user:pass@sub.host.com:8080/p/a/t/h?query=string#hash'
}
```

1. urlObject 对象
`url.parse` 方法解析后会返回一个 `urlObject` 对象，对象上即存在众多解析得到的属性值，示例如上所示。

2. 方法
  + url.format(urlObject)

  + url.parse(urlString[, parseQueryString[, slashesDenoteHost]])

  + url.resolve(from, to)


## URLSearchParams 类
主要用于处理 `query` 字符串。

### 简单示例
参数可以是 `string`、`object`、`iterable`。简要示例如下，具体可以查看文档。

```js
// string
const { URLSearchParams } = require('url');
let params;

params = new URLSearchParams('user=abc&query=xyz');
console.log(params.get('user'));
// Prints 'abc'
console.log(params.toString());
// Prints 'user=abc&query=xyz'
```

注意：参数中的 `?` 会被忽略。


```js
// object
const { URLSearchParams } = require('url');
const params = new URLSearchParams({
  user: 'abc',
  query: ['first', 'second']
});
console.log(params.getAll('query'));
// Prints [ 'first,second' ]
console.log(params.toString());
// Prints 'user=abc&query=first%2Csecond'
// ...
```

```js
params = new URLSearchParams([
  ['user', 'abc'],
  ['query', 'first'],
  ['query', 'second']
]);
console.log(params.toString());
// Prints 'user=abc&query=first&query=second'
// ...
```

### 一些方法
返回的对象具有通行的 ES6 对象方法，`toString`

1. ES6 对象方法
  `entries`、`keys`、`values`

2. 数组方法
  `forEach`、`sort`

3. 其他
  `set`, `get`, `getAll`, `delete`, `append`, `has`, `toString`

## 结语
很实用的工具。以上。
