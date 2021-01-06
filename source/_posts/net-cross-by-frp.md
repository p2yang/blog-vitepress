---
title: frp 内网穿透实践
comments: true
date: 2018-01-11 19:24:09
updated: 2018-01-11 19:24:09
tags:
- http

categories:
---

假设你在本地开发一个网站，需要在浏览器上进行测试，一般直接用IP访问即可，麻烦一点的可以设置代理。但如果有这样一种浏览器，她只能访问公网上的站点，完全忽视以上两种方法的搭讪，这个时候我们就可以使用“内网穿透”了。实现方法有很多，这里记录一下我采用frp实现此功能的过程。

<!-- more -->

[frp](https://github.com/fatedier/frp)是github上的一个开源项目，配置起来很简单。

## 准备
我们需要一台服务器来运行frp server，然后本地运行frp client端。最好还有一个域名来快速访问（当然，没有也可以，无名胜有名嘛）。
* 一台服务器
* 一个域名
* frp server端
* frp client端

点击前往[frp下载](https://github.com/fatedier/frp/releases)，选择对应的系统版本，下载包中包含了server端和client端。

## server配置和启动
### 下载安装
在服务器上，选择好目录，执行以下命令下载frp:
```bash
wget https://github.com/fatedier/frp/releases/download/v0.14.1/frp_0.14.1_linux_386.tar.gz
```

然后，解压
```bash
tar zxvf frp_0.14.1_linux_386.tar.gz
```

解压出的文件夹中server和client的配置, 如下图示
![frp_0.14.1_linux_386](/blog/images/frp/server.png)

这里，我们只需要用到 `frps` 和 `frps.ini` 两个文件。

### 修改配置
我们在默认配置下添加 http 访问端口配置：
```sh
vhost_http_port = 8080
```

`frps.ini` 结果如下：
```sh
[common]
bind_port = 7000
vhost_http_port = 8080
```
接下来就可以启动了。

### 启动
在当前目录下执行:
```bash
./frps -c ./frps.ini
```

可以看到：
```
▶ ./frps -c ./frps.ini
2018/01/11 19:57:37 [I] [service.go:88] frps tcp listen on 0.0.0.0:7000
2018/01/11 19:57:37 [I] [service.go:117] http service listen on 0.0.0.0:8080
2018/01/11 19:57:37 [I] [main.go:112] Start frps success
2018/01/11 19:57:37 [I] [main.go:114] PrivilegeMode is enabled, you should pay more attention to security issues
```

到此，server端启动完成，接下来看看本地该如何（注意，请勿关闭server，如要后台运行请用其他辅助工具，或看升级介绍）。


### 解析个域名先
为了方便访问，我们先添加一条解析记录吧。
给自己的域名[p2yang.com](http://p2yang.com)添加一条A记录，解析到上面的服务器IP(假设是xx.xx.xx.xx), 这里二级域名设为 work.

然后，来配置客户端吧。


### frp client配置与连接
根据本机系统下载客户端。这里会用到两个文件: `frpc` 和 `frpc.ini`.
打开`frpc.ini`, 添加配置:
```
[common]
server_addr = xx.xx.xx.xx
server_port = 7000

[web]
type = http
local_port = 80
custom_domains = www.yourdomain.com
```
说明：这里的 `server_addr` 是你启动 frp server的服务器; `type` 设为 http; `custom_domains` 设为解析的域名; 其他默认即可。`[web]` 中括号中的名字可以改。

执行：
```bash
▶ ./frpc -c ./frpc.ini
2018/01/11 20:11:03 [I] [control.go:277] [7621df25976e76bb] login to server success, get run id [7621df25976e76bb], server udp port [0]
2018/01/11 20:11:03 [I] [control.go:412] [7621df25976e76bb] [web] start proxy success
```

到此，启动成功！！！
开启本地静态服务，打开链接[http://work.p2yang.com:8080](http://work.p2yang.com:8080), 即可在公网上访问本地的开发资源。

### 进阶
如何让多个开发者共用一个frp server，并享用自定义的二级域名？

这里frp配置也很简单。

`frps.ini` 添加配置如下：
```
[common]
bind_port = 7000
vhost_http_port = 8080

subdomain_host = p2yang.com
```

`frpc.ini` 添加配置如下：
```
[common]
server_addr = xx.xx.xx.xx
server_port = 7000

[web]
type = http
local_port = 80
subdomain = work
```
注意，不同用户的 `[web]` 配置需要取不同的名字，`subdomain` 自己定义即可。当然，重名会产生冲突，请保持独一无二。

域名添加 `*` 泛解析。

然后，不同的用户启动自己的frp客户端，即可共享frp server了。


## 结语
frp还支持其他许多功能，点击查看[官方中文文档](https://github.com/fatedier/frp/blob/master/README_zh.md)。我就先到这里吧。

