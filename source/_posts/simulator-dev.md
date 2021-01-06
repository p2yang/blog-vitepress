---
title: iOS Simulator 模拟器 - web 页面调试实践
comments: true
date: 2018-11-06 16:06:40
updated: 2018-11-06 16:06:40
tags:
	- Tool
	- ios
categories:
	- Tool
	- ios
---

低版本 iOS safari 如何调试？在真机难求的情况下，可以用 Mac `iOS Simulator` 进行调试。

<!-- more -->

## 操作步骤
1. 安装下载 Xcode
	在 App Store 中搜索 Xcode 下载安装。

	说明：本文基于 Xcode 10.1 创作。

2. 打开 Simulator
	依次选择菜单栏: `Xcode -> Open Developer Tool -> Simulator`，如图：

	![](/blog/images/simulator/open.png)

	经过初始化后，出现如下界面:

	![](/blog/images/simulator/device.png)

	可以打开菜单栏: `Hardware -> Device` 选择切换成你想要的系统版本、设备类型。

3. 调试
	我们用 Mac 上的 Safari 开发者工具进行调试。

	首先打开 Simulator 中的 Safari, 访问目标 web 页面。

	然后打开 mac 上的 Safari，选择 `开发 -> 模拟器 -> 目标url` 即可打开对应的开发者工具进行调试。
	（如没有`开发`菜单，请从 Safari 偏好设置里启用此功能。）

	![](/blog/images/simulator/dev.png)

4. 选择系统版本
	默认的 Simulator 支持的 iOS 版本只有一个，此时，我们需要手动到 Xcode 里下载想要的 iOS 版本。

	依次打开 `Xcode -> Preferences -> Components` ，下载目标版本，完成之后重新打开 Simulator，就能从 `Hardware` 里进行切换了。

	![](/blog/images/simulator/components.png)

以上，就是用 iOS Simulator 调试的基本过程。
