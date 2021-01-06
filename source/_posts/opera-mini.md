---
title: 关于 Opera Mini 开发的那些事儿
comments: true
date: 2018-01-10 15:12:22
updated: 2018-01-10 15:12:22
tags:
- browser

categories:
---

前期暂时先记录这些，稍后再补充。

<!-- more -->

## 不支持的一些 CSS Style
  * line-height
  * border-radius
  * CSS gradients (老老实实用 background-color 吧)
  * CSS animations
  * font-family
  * icon fonts (用svg替代)
  * 只有body元素支持滚动, 其他元素即使加overflow也不行。即使是iframe，也会被切掉不足显示的部分。
  * fixed定位

## 注意事项：
* 动态图只会渲染第一帧，不会动。
* 图片会被压缩，建议不要用图片显示文本。如果非要用的话，可在CSS中引入图片，并且对图片做优化适配。
* 不支持任何动画，包括动态gif, 动态svg, blink/marquee元素等。因为服务器渲染并发送给客户端的只是一张快照。
* flex 布局会影响元素的width, 导致ellipsis失败，注意使用；

## 参考
[Opera Mini: Web Content Authoring Guidelines](https://dev.opera.com/articles/opera-mini-content-authoring-guidelines/#basic-html-css)
[Making websites that work well on Opera Mini](https://dev.opera.com/articles/making-sites-work-opera-mini/)
