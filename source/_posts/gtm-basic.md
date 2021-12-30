---
title: Google Tag Manager 基本应用与实践
comments: true
date: 2020-01-15 16:05:36
updated: 2020-01-15 16:05:36
tags:
- Google Tag Manager
categories:
---

如果想了解网站用户的互动情况，我们该怎么统计？

国际站的话可以选用 Google 家的 `gtag.js`, `analytics.js`，或者 `gtm.js` 进行开发。前两个的功能和使用方式基本一致，具体差别可参考下方的开发文档。`gtm.js` 就是本文要说的 Google Tag Manager 的 js 库。

<!-- more -->
Google Tag Manager (下文简称 "GTM") 功能齐全，支持 Google 代码和第三方代码。相比于 `gtag.js` 和 `analytics.js` 代码侵入性更小，也是 Google 推荐使用的工具。

话不多说，开始正文。

## 1. 注册 Container
填好容器名，选择应用平台。容器名建议以应用平台来命名，这里我使用的是域名 `blog.p2yang.com`。

![GTM Container](/images/gtm/gtm-container.png)

## 2. 安装
注册完成后，会自动分配一个 `id`, 并且弹窗提示安装方法，将代码片段插入自己的页面即可。
页面加载时，会异步请求 `gtm.js` 库和相关配置，并且提供了浏览器禁止 js 脚本的弥补方法。

这里摘录下代码段：

```html
<!-- Google Tag Manager -->
<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-NLZZ7XB');</script>
<!-- End Google Tag Manager -->
```

```html
<!-- Google Tag Manager (noscript) -->
<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-TFMV3HS"
height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
<!-- End Google Tag Manager (noscript) -->
```

下一步，我们就可以针对性地进行埋点了。

## 3. 建 Tag
这里是有 Google Analytics（以下称 GA） 处理和分析统计的数据，选择 `Google Analytics: Universal Analytics` 新建 Tag，如下图：
![GTM Tag](/images/gtm/gtm-tag.png)


### 3.1 关联 GA 配置
选择 `Track Type` 选择 `Event`; `Category`, `Action`, `Label` 的值便于识别即可，`Value` 建议填 `1`, 作为单词统计的基数。
![GTM Tag Config](/images/gtm/gtm-tag-config.png)

### 3.2 新建变量
然后，需要关联到 GA, 选择 `New Variable`, 配置 GA 的 Tracking ID （可在 https://analytics.google.com 个人管理中找到）。
变量创建一次后可以在侧边栏 `Variables` 进行管理。
![GTM Variable for GA](/images/gtm/gtm-tag-variable.png)

命名，保存。

## 4. 建 Trigger
创建好 Tag 后需要关联 Trigger。举个例子，我想统计阅读 `Google Tag Manager` 相关文章的 PV 总数，可以选择 `Page View` 类型的 `Track Type`, 然后添加一个触发规则，示图如下：

![GTM Trigger](/images/gtm/gtm-trigger.png)

追踪类型、触发规则要容易区分我们想要统计的页面或者操作。这个以后再讲。

## 5. Preview 调试
Tag, Trigger 配置好后，可以点击 “Preview” 开启 Debug 模式进行本地预览。

预览：
![GTM Preview](/images/gtm/gtm-preview.png)

本地 Debug 触发的 Trigger & Tag:
![GTM Debug](/images/gtm/gtm-debug.png)

上报的 Tag 信息：
![GTM Debug 2](/images/gtm/gtm-debug2.png)

GA 统计到的数据：
![GA](/images/gtm/ga-event.png)

调试 OK，推出 Debug，准备发布。

## 6. 发布
Google Tag Manager 提供了便捷的版本管理功能，填写好发布信息提交吧。

以上，就是一次 GTM 基本应用配置了。

## 总结
Google Tag Manager 中 Tag 和 Trigger 提供的功能十分丰富，需要根据我们自身的统计需求选择配置。
开始或许很复杂，熟悉之后就很方便快捷了，试试看吧。

