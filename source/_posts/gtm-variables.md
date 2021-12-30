---
title: Google Tag Manager 实用自定义 Variable 和 Trigger
comments: true
date: 2020-01-16 22:19:47
updated: 2020-01-16 22:19:47
tags:
- Google Tag Manager
categories:
---

单独为每个埋点建立一个个 Tag 和 Trigger, 未免太过麻烦。这里记录几个实用的自定义变量，以提高效率。

<!-- more -->
Google Tag Manager 支持多种类型的自定义变量，前端同学可自行选择使用哪些。

## 根据 CSS Selector 获取目标元素
设置变量名为 `Find Closest`, 变量类型为 `Custom JavaScript`, 脚本内容如下：

```js
function() {
  return function(target, selector) {
    while (!target.matches(selector) && !target.matches('body')) {
      target = target.parentElement;
    }
    return target.matches(selector) ? target : undefined;
  }
}
```

![GTM Variable](/images/gtm/gtm2-variable.png)

下面会有具体应用。

## 自定义 GA Event Category / Event Label 变量
在关联配置 GA 的 Event track 类型中，可以使用变量，而不用把值写死。同样是先命名变量，设置变量类型为 `Custom JavaScript`。
脚本内容示例如下：

```js
function() {
	var el = {{Find Closest}}({{Click Element}}, '[data-label]');
	return el ? el.dataset.label : ''；
}
```

脚本中出现的 `\{\{Find Closest\}\}` 就是上面自定义的变量 `Find Closest`，双大括号是调用取值语法。
不同的是，`\{\{Click Element\}\}` 是 Google Tag Manager 内置变量，表示被点击的 DOM 元素。
`selector` 可自行改写。

该变量的作用是获取到被点击目标元素上的 `data-label` 值，没有则返回空字符串。

## 自定义 Data Layer 变量
如果需要手动上报的话，这里可以新建一个 `Data Layer Variable` 类型的变量，所定义的值可以被 `window.dataLayer` 上报。示例如下：

```js
// 注意：此处代码需要在自己的页面中添加
window.dataLayer.push({
	'event': 'track_custom_event',
	'xxx': '待上报的值'
})
```

其中 `xxx` 即为此处需要定义的 Data Layer Variable Name。

再建立一个自定义事件变量，变量类型选 `Custom Event`。

然后，可以建一个 `Custom Event` 类型的 Trigger 来响应手动上报事件。
其中 Event Name 可使用正则表达式，如：`[A-Z0-9_]+`。
注意，需要加一条匹配规则，用来排除官方的事件类型 - `gtm`，示图如下：

![GTM Trigger](/images/gtm/gtm2-trigger.png)
