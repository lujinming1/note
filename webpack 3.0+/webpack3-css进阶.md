#<center>webpack3-css进阶
###1、less 文件的打包与分离
安装：

	npm install --save-dev less
	npm install --save-dev less-loader
配置：

	modules: {
		roules: [
			{
				test: /\.less$/,
				use: [{
						loader: 'style-loader' // creates style nodes from JS strings
					},{
						loader: 'css-loader' // translates CSS into CommonJS
					},{
						loader: 'less-loader'  // compiles Less to CSS
					}]
			}
		]
	}

或者想要将less文件分离打包配置如下：

	modules: {
		roules: [
			{
				test: /.\less$/,
				use: extractTextPlugin.extract({
					use: [{
						loader: 'css-loader'
					},{
						loader: 'less-loader'
					}],
					// use style-loader in development
					fallback: 'style-loader'
				})
			}
		]
	}
###2、sass 文件的打包与分离
安装：

	//因为sass-loader依赖于node-sass，所以需要先安装node-sass
	npm install --save-dev node-sass
	npm install --save-dev sass-loader
node-sass容易安装失败可以使用淘宝镜像进行配置 npm 或者使用 cnpm 。可以参考 [http://blog.csdn.net/tang_yi_/article/details/78053431](http://blog.csdn.net/tang_yi_/article/details/78053431 "npm配置淘宝源")来配置npm淘宝镜像。

配置：
	
	modules: {
		roules: [
			{
				test: /\.scss$/,
				use: [{
						loader: 'style-loader' // creates style nodes from JS strings
					},{
						loader: 'css-loader' // translates CSS into CommonJS
					},{
						loader: 'sass-loader'  // compiles sass to CSS
					}]
			}
		]
	}
或者想要将sass文件分离打包配置如下：

	modules: {
		roules: [
			{
				test: /.\scss$/,
				use: extractTextPlugin.extract({
					use: [{
						loader: 'css-loader'
					},{
						loader: 'sass-loader'
					}],
					// use style-loader in development
					fallback: 'style-loader'
				})
			}
		]
	}
###3、自动处理css3属性前缀
&emsp;&emsp;CSS3中有些属性需要加前缀，若自己查询并添加前缀比较麻烦，可以使用 postcss-loader 给 常css3 属性自动添加前缀。        
&emsp;&emsp;PostCSS是一个CSS的处理平台，可以实现很多功能。

安装：

	npm install --save-dev postcss-loader autoprefixer
postcss配置，在根目录下（webpack.config.js同级），建立一个 postcss.config.js 文件   
postcss.config.js 

	module.export = {
		plugins: [require('autoprefixer')]
	}

webpack.config.js

	modules: {
		roules: [
			{
				test: /\.css$/,
				use: [
					{
						loader: 'style-loader'
					},{
						loader: 'css-loader',
						modules: true
					},{
						loader: 'postcss-loader'
					}
				]
			}
		]
	}

或者想要将css文件分离打包配置如下：

	modules: {
		roules: [
			{
				test: /\.css$/,
				use: extractTextPlugin.extract({
					fallback: 'style-loader'
					use: [
						{loader: 'css-loader', options: {importLoader: 1}},
						'postcss-loader'
					]
				})
			}
		]
	}
###4、消除未使用的css
&emsp;&emsp;随着项目的进展，CSS也会越来越多，有时需求更改，带来了DOM结构的更改，这是若不关注css样式，会造成css的冗余。使用 PurifyCSS 可以消除未使用的css，减少css冗余。

安装：

	npm --save-dev purify-webpack purify-css
配置：

	const glob = require('glob'); // 因为需要同步检查HTML模板，所以需要引入node的glob对象。
	const PurifyCSSPlugin = require('purifycss-webpack');

	plugins: [
		new extractTextPlugin("css/index.css"),
		new PurifyCSSPlugin({
			// 这里配置了一个paths，主要是需找html模板，purifycss根据这个配置会遍历你的文件，查找哪些css被使用了。
			path: glob.sync(path.join(__dirname, 'src/*.html'))
		})
	]
<b>注意：</b>这个插件必须配合 extract-text-webpack-plugin 插件使用。