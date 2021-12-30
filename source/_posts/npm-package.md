---
title: npm包发布实践
comments: true
date: 2017-12-07 12:41:16
updated: 2017-12-07 12:41:16
tags:
- npm

categories:
---

npm package下载容易，publish也很容易。我们来实践一下吧！
<!-- more -->

## 基本流程
1. 准备项目;
2. npm注册;
3. 本地npm登录;
3. 发布.

## 准备项目
准备好你想要发布到npm的项目
新项目请执行 `npm init`。示例如图：
![](/images/npm/npm-index.png)

准备好项目之后，就可以进行登录发布了。

## npm注册
在npm官网上注册一个账号，我们将以此帐号的名义来发布npm包。[前往注册](https://www.npmjs.com/signup)

## 本地npm登录
在本地终端执行:
```
npm addUser
```
执行该命令后，依次输入用户名、密码、邮箱等信息。如图所示：
![](/images/npm/npm-login.png)

以上，登录完成。

## 发布
执行发布，命令如下：
```
npm publish
```

发布的npm package 会自动使用 `package.json` 中的 ***version***作为版本号。

## 遇到的问题
1. package name如果已存在，发布时会出现权限错误，导致发布失败，改名即可。错误信息如下：
```
▶ npm publish
npm ERR! publish Failed PUT 403
npm ERR! code E403
npm ERR! You do not have permission to publish "npm-package-test". Are you logged in as the correct user? : npm-package-test

npm ERR! A complete log of this run can be found in:
npm ERR!     /Users/pyang/.npm/_logs/2017-12-07T05_28_57_277Z-debug.log
```

## 结语
`npm publish`有个 ***prepublish*** 钩子，可以自动执行相关脚本。在`package.json`的 ***scripts*** 中添加一条 ***prepublish*** 的脚本即可。

整理一下套路，操作就清楚多了。还是多尝试吧！
