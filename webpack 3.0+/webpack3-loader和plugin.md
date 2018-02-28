#<center>webpack3-loader和plugin
###1、loader
&emsp;&emsp;Loader是webpack最重要的功能之一。Loader让webpack能够处理不同的文件。loader可以将所有类型的文件转换为webpack能够处理的有效模块，然后利用webpack的打包能力，对他们进行处理。本质上，webpack loader将所有类型的文件，转换为应用程序的依赖图可以直接引用的模块。             
&emsp;&emsp;例如，

- loader可以将sass，less文件的写法转换成css，而不在使用其他转换工具。
- 可以将ES6或者ES7的代码，转换成大多数浏览器兼容的JS代码。
- 可以将React中的JSX转换成JavaScript代码。

即，在webpack中Loader有两个目标：

- 识别出应该被对应的loader进行转换的文件。（使用test属性）
- 转换这些文件，从而使其能够被添加到依赖图中（并最终添加到bundle中）。（使用use属性）

<b>用法：</b>   
&emsp;&emsp;Loader需要单独安装，需要什么Loader就使用npm安装即可。并对应webpack.config.js中的module属性：

	module:{
		rules: [{
			test: 
			use: 
			include/exclude:
			query: 
		}]
	}

- test：用于匹配处理文件的扩展名的表达式，必须
- use：loader名称，就是要使用的模块名，必须
- include/exclude：手动添加必须处理的文件（文件夹）或屏蔽不需要处理的文件（文件夹），可选
- query：为loader提供额外的设置选项，可选

其中，use有三种写法：

- 直接用use：

		use:['style-loader','css-loader']
- 将use换成loader： 

		loader:['style-loader','css-loader']
- 使用use + loader：

		use: [{
                 loader: "style-loader"
               }, {
                 loader: "css-loader",
				 options:{}
              }]

<b>例如:</b>

	 module:{
	        rules: [
	            {
	              test: /\.css$/,
	              use: [ 'style-loader', 'css-loader' ]
	            },
				{
			      test: /\.css$/,
			      use: [
			        { loader: 'style-loader' },
			        {
			          loader: 'css-loader',
			          options: {
			            modules: true
			          }
			        }
			      ]
			    }
	          ]
		    },
###2、plugins
&emsp;&emsp;loader被用于转换某些类型的模块，而插件则可以用于执行广泛的任务。插件的范围包括，从打包优化和压缩，一直到重新定义环境中的变量。插件接口功能极其强大，可以用来处理各种各样的任务。         
&emsp;&emsp;想要使用一个插件，你只需要 `require()`它，然后将它添加到plugins数组中。多数插件可以通过选项自定义。你也可以在一个配置中因为不同目的而多次使用同一个插件，这时需要通过使用new操作符来创建它的一个实例。     
<b>剖析：</b>       
&emsp;&emsp;webpack插件是一个具有 apply 属性的JavaScript对象。apply属性会被webpack compiler调用，并且compiler对象可在整个编译周期访问。       
<b>用法：</b>        
&emsp;&emsp;由于插件可以携带参数/选项，你必须在webpack配置中，想plugins属性传入 new 实例。         
<b>例如:</b>       

	// webpack.config.js文件头部引入插件
	const uglify = require('uglifyjs-webpack-plugin');
	const htmlPlugin= require('html-webpack-plugin');
	
	// 插件配置
	plugins:[
	    new uglify()，
		new htmlPlugin({
		      minify:{
		        removeAttributeQuotes: true
		      },
		      hash: true,
		      template: './src/index.html'
		    }),
	  ],

<b>（1）JS 压缩</b>        
&emsp;&emsp;在webpack中JS压缩使用的是 uglifyjs-webpack-plugin插件。

	const uglify = require('uglifyjs-webpack-plugin');
	
	plugins: [
		new uglify();
	]
 <b>注意：</b> 在开发环境中使用该插件会报错，因为在开发预览时需要明确报错行数和错误信息，所以不需要对JS压缩，而生产环境中才会对JS压缩。devServer用于开发环境，而压缩JS用于生产环境，在开发中做生产环境的事情，所以会报错。

<b>（2）打包HTML</b>       
&emsp;&emsp;要将 HTML 文件从 src 目录下打包到 dist 目录下，需要借助 html-webpack-plugin 插件。该插件需要安装。

	npm install html-webpack-plugin --save-dev

配置：

	const htmlPlugin = require('html-webpack-plugin');
	
	plugins: [
		new htmlPlugin({
			minify: {
				removeAttributeQuotes: true
			},
			hash: true,
			template: './src/index.html'
		})
	]

 - minify：是对HTML文件进行压缩，removeAttributeQuotes是去除属性的双引号。
 - hash：为了避免缓存js，加入 hash
 - template：是要打包的HTML模板路径和文件名称。