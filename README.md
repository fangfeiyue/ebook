# ebook
运行项目

## 阅读器工作原理
将各种格式的电子书通过阅读器引擎解析为阅读器可识别的格式。然后将解析的结果渲染到界面上。 并提供一系列的辅助功能，如字体、主题设置等等

第一步是解压

第二步 在META-INF文件夹中找到container.xml文件，再找到rootfile所对应的文件路径。

第三步 解析content.opf文件

模拟阅读器引擎如何解析一个epub文件。将epub文件后缀名改为.zip，使用压缩工具进行解压。打开解压后的文件夹，

metadata对应的是电子书的基本信息。manifest对应的是电子书所有的资源文件及路径。spine对应的是电子书的排列顺序，对电子书资源排序哪个在前哪个在后。spine中的toc属性对应电子书的目录文件。guide对应指南信息。每本电子书的结构可能不一定完全一样，但是解析步骤是一样的。

## ePub标准介绍

ePub标准是IDPF制定的电子书标准，IDPF国际数字出版论坛，是一个国际组织，致力于推广电子出版物。IDPF拥有14个董事会席位，收入来源主要是会员费。

ePub标准主要解决电子书的分发、管理和加密等问题，ePub的核心是:ZIP+XML+资源文件（HTML+CSS+图片+音频+视频等）

ePub的核心就是利用zip技术将不同类型的文件打包成为一个 epub文件用xml技术进行配置管理，用各类资源文件如HTML、CSS、图片、音频、视频等实现电子书的展示。

## epubjs阅读器引擎介绍

epubjs是一个技术JS的开源的ePub阅读器引擎，它解决了epub电子书的解析、渲染、定位等技术难题，同时提供了媲美原生app的阅读体验。

epubjs核心类介绍：

Book类，完成了阅读器的解析，Rendition实现了阅读器的渲染 Locations实现了阅读器的定位。Navigation存储了目录信息。ViewManager负责渲染出来的视图的管理。EpubCFI利用了epub的CFI标准来进行文字级别的定位。

## nvm
nvm或者nvm-windows可以在电脑上管理多个node版本。

安装：
```js
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.37.2/install.sh | bash
```
执行完上述命令后
```js
export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" # This loads nvm
```
可以通过`cat ~/.bash_profile`查看

然后执行`source ~/.bash_profile`让环境变量生效。

### 安装node
```
# 安装最新版本node
nvm install node
# 安装指定版本 xxx代表node版本号如10.10.0
nvm install xxx
```
### 切换node版本
```
# xxx代表node版本号，如10.10.0
nvm use xxx
```

### 卸载nvm
```
$ rm -rf "$NVM_DIR"
```
执行完上述命令后，还要打开`~/.bashrc`文件，删除如下代码：
```
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" # This loads nvm
[[ -r $NVM_DIR/bash_completion ]] && \. $NVM_DIR/bash_completion
```

## Vue CLI3.0环境搭建
卸载老版本的，因为新的vue-cli包名变成了`@vue/cli`和老版本是不兼容的
```js
npm uninstall vue-cli -g
```
安装新版本的
```js
npm install -g @vue/cli
```
如果想做原型开发
```js
npm install -g @vue/cli-service-global
```
创建项目
```
# xxx代表项目名称
vue create xxx
```
这里我们执行
```
vue create ebook
```

安装epubjs
```js
npm install epubjs --save
```
简单使用
```js
<template>
  <div id="book"></div>
</template>
<script>
import Epub from 'epubjs'
export default {
  mounted () {
    this.book = new Epub('/2014_Book_Self-ReportedPopulationHealthA.epub')
    this.book.renderTo('book', {
      width: window.innerWidth,
      height: window.innerHeight
    }).display()
  }
}
</script>
```

安装sass
```
npm i node-sass sass-loader -D
```
## viewport设置和rem设置
viewport设置
```html
<meta name="viewport" content="width=device-width,initial-scale=1.0,maximum-scale=1.0,minimum=1.0,user-scalable=no">
```
rem设置
```js
document.addEventListener('DOMContentLoaded', () => {
  const html = document.querySelector('html')
  let fontSize = window.innerWidth / 10
  fontSize = fontSize > 50 ? 50 : fontSize
  html.style.fontSize = fontSize + 'px'
})
```


项目难点：

阅读器开发：分页算法、全文搜索算法、引入web字体、主题设计

离线存储机制设计：localstorage+indexedDB

实现复杂手势和交互动画，如何兼容手势和鼠标操作

利用vuex+minx机制实现组件解耦+复用 

利用es6优雅的实现数据结构变化




