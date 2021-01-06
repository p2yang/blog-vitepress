---
title: 关于网页打印的开发实践
comments: true
date: 2017-12-11 12:31:50
updated: 2017-12-11 12:31:50
tags:
  - html

categories:
---

最近接到了一个PC打印需求，实现网页特定内容打印功能。据我所知，打印是直接调用 `window.print()` 就能唤起浏览器打印功能的。[MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/print)上的描述及其简洁：调用打印，不能传参，不属于任何标准。也就是说，网页是啥样，打印估计就是傻样。一番调研，找到了几种解决办法列举如下。

<!-- more -->
## CSS Media print
对于定制性不高，结构较为简单的页面来说，使用CSS的Media type属性较为合适。

腾讯CDC有一篇 《[Print —— 被埋没的Media Type](http://cdc.tencent.com/2014/08/19/print-%E8%A2%AB%E5%9F%8B%E6%B2%A1%E7%9A%84media-type/)》对 `@media print` 的用法讲述的十分清晰，可前往查阅，本文不再赘述。

简单来说，我们可以在 `@media print` 中书写打印所需的样式，无关内容可以直接 `display: none` 掉。示例如下：
```
<!-- css -->
@media print {
  <!-- code your style -->
}
```

我们还可以外链一个单独的样式文件来存储打印样式，如下：
```
<link rel="stylesheet" href="print.css" media="print"/>
```

补充说明：样式归样式，打印还得靠 `widnow.print()`。

## Iframe
如果定制化较高，基于当前页面改动太大的话，使用`@media print` 就不太合适了。这时我们可以使用嵌套 *iframe* 的方法来实现另类的打印。

我们可以动态创建 iframe 元素，将想要打印的内容及样式注入其中，再将iframe元素隐藏到当前页面，然后等iframe里的内容加载完后，直接调用 `iframe.contentWindow.document.print()` 即可。

说起来简单，实际操作还是挺复杂的，好在github上已经有做好的轮子了 —— [Print.js](https://github.com/crabbly/print.js)。
不过，个人觉得它支持的格式虽多，但有一些局限性，所以我fork做了一些简单的修改，即[html-print](https://github.com/p2yang/html-print)，目前主要用于打印html内容。

话说`Print.js` 的源码清晰明了，如果直接用不方便的话，可以fork定制自己的内容。

## 结语
以上是纯粹的网页开发者可以做的那些事儿，更强大省事儿的解决方法是用插件，前提是你的内容值得用户默默的装！
