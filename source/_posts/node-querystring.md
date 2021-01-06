---
title: Node API - Querystring
comments: true
date: 2018-01-04 22:56:50
updated: 2018-01-04 22:56:50
tags:
- node

categories:
---

`querystring` 是一个实用的 URL query 字符串处理工具，可以序列化一串键值对字符串，也可以将对象转化成一段 `a=b&c=d` 形式的字符串。总之，非常好用，尤其是处理跟url query相关参数的时候。

<!-- more -->

说明：本文是基于 node@9.3.0 整理。查看[官方文档](https://nodejs.org/docs/v9.3.0/api/querystring.html)

## 基本用法
在 node 环境下，我们可以直接 require 或 import，如下：
```js
const querystring = require('querystring')
```

需要说明的是，npm上有一个 [qs](https://www.npmjs.com/package/qs) 包，跟querystring类似，但功能更强大，可以看看。

node querystring 公开的有四个方法，我们来看一看。

## parse 爱 stringify
`parse`和`stringify`总是形影不离，在`JSON`中如此，这里也是一样。

### querystring.parse(str[, sep[, eq[, options]]])
可选参数有点多，先来介绍一下:
* str: `String`, 目标字符串;
* sep: `String`, str 中键值对间的分隔符，默认是`&`;
* eq: `String`, str 中key和value间的分隔符，默认是`=`;
* options: `Object`, 包含三个属性：
  + decodeURIComponent: `Function`, 解码方法，默认使用`querystring.unescape()`
  + maxKeys: `Number`, 可以解析的最大key数目，默认是1000。设为0，则表示不限制数量。

示例如下:
```js
querystring.parse('foo=bar&abc=xyz&abc=123')
/* Returns
{
  foo: 'bar',
  abc: ['xyz', '123']
}
*/
```

注意：官方文档说，返回的对象不完全继承js的`Object`, 所以诸如`obj.toString`, `obj.hasOwnProperty`之类未定义的方法，无法使用哦～


### querystring.stringify(obj[, sep[, eq[, options]]])
`sep`,`eq`同上，默认分别是`&`，`=`.
* obj: `Object`, 目标对象
* options: `Object`, 包含一个方法
  + encodeURIComponent: `Function`, 编码方法，默认使用`querystring.escape()`

`obj`的属性有所限制，只能转化 `String`, `Number`, `Boolean`, `String[]`, `Number[]`, `Boolean[]`类型的的值，其他类型的值会被转化为空字符串。

示例如下:
```js
querystring.stringify({ foo: 'bar', baz: ['qux', 'quux'], corge: '' });
// returns 'foo=bar&baz=qux&baz=quux&corge='

querystring.stringify({ foo: 'bar', baz: 'qux' }, ';', ':');
// returns 'foo:bar;baz:qux'
```

## 离开，还是留下？
`escape` or `unescape`，选择只取决于你。一般不怎么用。
官方有云，
> The querystring.escape() method is used by querystring.stringify() and **is generally not expected to be used directly**. It is exported primarily to allow application code to provide a replacement percent-encoding implementation if necessary by assigning querystring.escape to an alternative function.

所以，用不用随你心意。我们这里就简单说下吧（反正写的都很简洁。。。）。

### querystring.escape(str)
编码。
```js
querystring.escape('https://nodejs.org/dist/latest-v9.x/docs/api/querystring.html?nav=faq&sa=sae')
// Returns 'https%3A%2F%2Fnodejs.org%2Fdist%2Flatest-v9.x%2Fdocs%2Fapi%2Fquerystring.html%3Fnav%3Dfaq%26sa%3Dsae'
```

### querystring.unescape(str)
解码，与escape相反。
```js
querystring.unescape('https%3A%2F%2Fnodejs.org%2Fdist%2Flatest-v9.x%2Fdocs%2Fapi%2Fquerystring.html%3Fnav%3Dfaq%26sa%3Dsae')
// Returns 'https://nodejs.org/dist/latest-v9.x/docs/api/querystring.html?nav=faq&sa=sae'
```

## 结语
说实话，之前从别人的文章中去看用法，总觉得捉急。md不写时间，不写版本，行文也不格式化，极易产生误解。后来总算明白了，别人嚼烂剩下，心里要有个谱儿。主动被动之间，不只有情趣！
