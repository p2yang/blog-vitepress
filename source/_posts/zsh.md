---
title: 白用了那么多年的 ‘oh-my-zsh’ -- Plugins
comments: true
date: 2018-03-22 19:02:56
updated: 2018-03-22 19:02:56
tags:
- Terminal
- Tool

categories:
- Tool
---


以前虽然研究过 `Oh My Zsh` 的使用技巧，但都是在需求的驱动下进行的。换过多次主题，配过 Sublime Text 和 Git 等 alias命令，还有一些零散的配置。今天偶然看到其可以开启 web-search 功能，十分惊喜和好奇。浏览过官方 wiki 后，才发现有一些很实用的 plugins, 便记录下折腾过程吧。
<!-- more -->

### 启动画面
先来看一个启动画面：

![](/blog/images/zsh/fbi.png)

哈哈，是不是有一种陌生的熟悉感！

如何配置呢？

1. 打开 .zshrc 配置文件

```zsh
vim ~/.zshrc
```

2. 加入一下配置

```zsh
export PATH="$PATH:$HOME/.rvm/bin" # Add RVM to PATH for scripting

_COLUMNS=$(tput cols)
_MESSAGE=" FBI Warining "
y=$(( ( $_COLUMNS - ${#_MESSAGE} )  / 2 ))
spaces=$(printf "%-${y}s" " ")

echo " "
echo -e "${spaces}\033[41;37;5m FBI WARNING \033[0m"
echo " "
_COLUMNS=$(tput cols)
_MESSAGE="Ferderal Law provides severe civil and criminal penalties for"
y=$(( ( $_COLUMNS - ${#_MESSAGE} )  / 2 ))
spaces=$(printf "%-${y}s" " ")
echo -e "${spaces}${_MESSAGE}"

_COLUMNS=$(tput cols)
_MESSAGE="the unauthorized reproduction, distribution, or exhibition of"
y=$(( ( $_COLUMNS - ${#_MESSAGE} )  / 2 ))
spaces=$(printf "%-${y}s" " ")
echo -e "${spaces}${_MESSAGE}"

_COLUMNS=$(tput cols)
_MESSAGE="copyrighted motion pictures (Title 17, United States Code,"
y=$(( ( $_COLUMNS - ${#_MESSAGE} )  / 2 ))
spaces=$(printf "%-${y}s" " ")
echo -e "${spaces}${_MESSAGE}"

_COLUMNS=$(tput cols)
_MESSAGE="Sections 501 and 508). The Federal Bureau of Investigation"
y=$(( ( $_COLUMNS - ${#_MESSAGE} )  / 2 ))
spaces=$(printf "%-${y}s" " ")
echo -e "${spaces}${_MESSAGE}"

_COLUMNS=$(tput cols)
_MESSAGE="investigates allegations of criminal copyright infringement"
y=$(( ( $_COLUMNS - ${#_MESSAGE} )  / 2 ))
spaces=$(printf "%-${y}s" " ")
echo -e "${spaces}${_MESSAGE}"

_COLUMNS=$(tput cols)
_MESSAGE="(Title 17, United States Code, Section 506)."
y=$(( ( $_COLUMNS - ${#_MESSAGE} )  / 2 ))
spaces=$(printf "%-${y}s" " ")
echo -e "${spaces}${_MESSAGE}"
echo " "
```

3. 应用生效
执行命令：

```zsh
source ~/.zshrc
```

打开新的 shell 即可看到启动动画了。


### 添加 Plugins

Oh My Zsh 内置了许多 Plugins, 直接添加配置即可。

修改 `~/.zshrc` 里的 plugin 属性，其默认值如下：

```zsh
plugins=(git)
```

只需要在括号里以空格隔开添加 plugin 名即可，如

```zsh
plugins=(git sublime web-search docker encode64 npm yarn node)
```

默认支持的 plugins 可以查看 [官方wiki](https://github.com/robbyrussell/oh-my-zsh/wiki/Plugins)，描述很详细。

其中， `web-search` 添加了几种搜索命令，如 google, bing, baidu, github 等, 支持从终端进行搜索，如：

```zsh
google oh my zsh 是个啥
```

执行该命令，会自动打开浏览器并搜索目标。


### 结语
保持好奇，总会发现许多有意思的东西，至于其作用，已经不重要了。毕竟，我们已经收获了探索的乐趣！






