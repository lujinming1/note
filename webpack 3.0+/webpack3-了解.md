#<center>Webpack 3 —— 了解
###1、简介
&emsp;&emsp;Webpack可以看做是模块打包机：它做的事情是，分析项目结构，找到JavaScript模块以及其他的一些浏览器不能直接运行的拓展语言（如less、sass、ts等），并将其转换和打包为合适的格式供浏览器使用。在3.0出现后，webpack还肩负起了优化项目的责任，即Webpack完成的任务有：

- 打包：可以把多个JavaScript文件打包成一个文件，减少服务器和下载带宽。
- 转换：把拓展语言转换成普通的JavaScript，让浏览器顺利运行。
- 优化：前端变得越来越复杂后，性能也会遇到问题，而webpack也开始肩负起了优化和提升性能的责任。
###2、环境搭建
- 项目目录   
 webpacktest/src  webpacktest/dist   
 进入根目录初始化项目，

		npm init
- 安装webpack

		1、npm install -g webpack // 全局安装webpack，可以使用webpack命令
		2、npm install --save-dev webpack
若不想全局安装webpack，则需在package.json中配置，使用npm run build 命令运行webpack，配置如下

		"scripts": {
    		"build": "webpack"
		},
###3、测试
&emsp;&emsp;在学习前，先看看整个项目，有个初步的概念，项目代码GitHub：[https://github.com/lujinming1/webpacktest.git](https://github.com/lujinming1/webpacktest.git "webpacktest")。           
&emsp;&emsp;下载代码，安装环境：

	npm install
&emsp;&emsp;运行webpack

	npm run build   // 不带watch
	npm run server  // 带watch
###4、webpack配置文件
&emsp;&emsp;webpack的配置文件是webpack.config.js，这个文件需要自己在项目根目录下手动建立。建立好后对其配置，首先了解一下webpack.config.js的基本结构：

	module.exports = {
		entry: {}, 
		output:{},
		module:{},
		plugin:[],
		devServer:{}，
		watchOptions：{}
	}

- entry：入口文件配置信息，可以是单一入口，也可以是多入口
- output：出口文件配置信息，在webpack2以后，支持多出口配置
- module：模块配置信息，主要是解析sass、less、图片转换、将拓展语言转换成普通的JavaScript等
- plugins：插件配置信息，根据需求，配置不同的插件
- devServer:开发服务器配置，该服务器是一个小型的Express服务器，主要有两个功能：为静态资源提供服务，以及自动刷新和热替换
- watchOptions：watch配置，用于自动刷新和热替换