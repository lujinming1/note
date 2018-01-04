#<center>Webpack 3
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
###3、

