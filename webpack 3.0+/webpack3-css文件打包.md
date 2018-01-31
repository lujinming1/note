#<center>webpack3-CSS 文件打包
###1、css 打包简单配置
&emsp;&emsp;css 打包要依赖 style-loader 和 css-loader 来解析。首先安装这两个loader

	npm install style-loader css-loader --save-dev
编写css文件 "./src/css/index.css"

	body{
		background-color: red;
		color: white;
	}
在入口文件 “./src/entery.js” 中引入css文件

	import css from './css/index.css'

 - <b>style-loader</b> ：syle-loader 是用来处理 css 文件中的 url() 等
 - <b>css-loader</b> ：css-loader 是用来将 css 插入到页面的 style 标签。


<b>配置：</b> 

	module:{
		rules: [
			test: /\.css$/,
			use: ['style-loader', 'css-loader']
		]
	}
###2、单独打包css
&emsp;&emsp;上述方法是将 css 以 style 标签的形式 插入到 head 标签下，如果想将 css 单独提取出来，需要使用 extract-text-webpack-plugin 插件。          
&emsp;&emsp;虽然 extract-text-webpack-plugin 可以完成 css 代码提取，但是 webpack 官方不建议这样做，因为他们认为 css 就应该打包在 JavaScript 中以减少 HTTP 的请求数。

 - 安装  
 
		 npm install --save-dev extract-text-webpack-plugin
 - 引入

		const extractTextPlugin = require("extract-text-webpack-plugin");
 - 配置

		plugins: [
			new extractTextPlugin("/css/index.css");  // /css/index.css是分离后的路径位置
		]
		module:{
			rules: [
				test: /\.css$/,
				use: extractTextPlugin.extract({
					fallback: "style-loader",
					use: "css-loader"
				})
			]
		}