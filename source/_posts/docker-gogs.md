---
title: Gogs + Docker 搭建 Git 服务器实践
comments: true
date: 2018-03-07 12:59:00
updated: 2018-03-07 12:59:00
tags:
- git
- docker

categories:
---

本文是用 Gogs Docker 镜像快速搭建自己的 Git 服务器实践记录。

<!-- more -->
### 基本说明
此次实践以 `Docker` 为主，以 `systemd` 守护进程。

相关文档
* [Docker for Gogs](https://github.com/gogits/gogs/tree/master/docker)
* [Gogs官方文档](https://gogs.io/docs/)
* [Docker官方文档](https://docs.docker.com/)

### 安装
#### 拉取镜像
```bash
docker pull gogs/gogs
```

#### 创建本地资源文件
```bash
mkdir -p /var/gogs
```

#### 配置 service 文件
```
[Unit]
Description=gogs service
After=docker.service
Requires=docker.service
[Service]
TimeoutStartSec=0
Restart=always
ExecStartPre=-/usr/bin/docker rm gogs
ExecStart=/usr/bin/docker run \
   --name gogs \
   -v /var/gogs:/data/ \
   -p 10022:22 \
   -p 10080:3000 \
   gogs/gogs

ExecStop=/usr/bin/docker kill gogs
[Install]
WantedBy=multi-user.target
```

#### 启动服务
```bash
systemctl start gogs
```

至此，安装启动完成，访问 10080 端口即可！

### 配置
访问 `http://ip:port` 配置gogs服务。

主要是配置 `数据库`、`域名`、`应用地址`。根据个人情况配置如下，其他默认：
数据库：SQLite3
域名：git.p2yang.com
应用地址：http://git.p2yang.com

访问 git.p2yang.com:10080， 结果如图所示
![gogs](/blog/images/gogs.png)

### 配置nginx反向代理
nginx 增加配置如下：
```
server {
    server_name git.p2yang.com
    listen 80;

    location / {
        proxy_pass http://139.196.54.203:10080;
        proxy_set_header Host $host:80;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
}
```
监听`80`端口，代理到服务器`10080`端口。
* 注意：如果是`nginx + docker` 容器起的服务，此处 `proxy_pass` 的值须采用`ip`.

### 备份
实现中...

