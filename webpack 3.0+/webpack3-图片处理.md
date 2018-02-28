#<center>webpack3-图片处理
###1、css中图片处理         
&emsp;&emsp;若在css中将图片以背景的方式展示时，如：

	#img{
		background-image: url(../imgages/img.png);
	}
此时，需要使用file-loader， url-loader 来处理。如过未使用loader将会报错：

【css-img-error.png】

安装：

	npm install --save-dev file-loader url-loader

 - <b>file-loader</b>：解决引用路径问题，拿 background 样式用URL引入背景图来说，webpack最终将各个模块打包成一个文件，因此我们样式中的URL路径是相对于入口HTML文件的，而不是相对于原始css文件所在的路径的。这就会导致图片引入失败。这个问题使用file-loader解决的，file-loader可以解析项目中的URL引入（不限于css），根据配置，将图片拷贝到相应的路径，再根据我们的配置，修改打包后文件引用路径，使之指向正确的文件。        
 - <b>url-loader</b>：url-loader 会将引入的图片编码，生成dataUrl，再打包到文件中。最终只需要引入这个文件就能访问图片了。当然图片较大，编码会消耗性能。因此url-loader 提供了一个limit 参数，小于limit字节的文件会被转为dataUrl，大于limit的会使用file-loader进行Corp。

<b>配置：</b>

	module:{
		rules: [
			{
				test: /\.css$/,
				use: ['style-loader','css-loader']
			},{
				test: /\.(png|jpg|gif)/,
				use: [{
					loader: 'url-loader',
					options:{
						limit: 50000,  // 把小于50000 byte的文件打包成Base64的格式写入JS	
						output: 'images/' // 当大于是使用file-loader将图片打包到images目录下
					}
				}]
			}
		]
	}
###2、css分离后图片路径处理
&emsp;&emsp;利用 extract-text-webpack-plugin 插件将 css 代码分离出来后，发现css中图片路径并不正确。此时需要使用publicPath解决。

<b>publicPath</b>:是在webpack.config.js文件的output选项中，主要作用就是处理静态文件路径问题。

配置：

	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: '[name].js',
		publicPath: "http://xxx.xxx.xxx.xxx:xxxx/" //使用绝对路径。
	}
###3、处理HTML中的图片
&emsp;&emsp;利用 html-withimg-loader 可以解决HTML文件中引入的\<img\>。          
安装：
	
	npm install --save-dev html-withimg-loader
配置

	module:{
		rules: [{
			test: /\.(html|htm)$/i,
			use: ['html-withimg-loader']
		}]
	}	
