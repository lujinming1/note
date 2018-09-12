#<center>grunt 配置文件
1、模板   
&emsp;&emsp;grunt 配置文件一般是gruntflie.js或者gruntfile.coffee文件。但不管是种类型，其内容都是相同的。每一个grunt配置文件都包含下面内容。

	module.exports = function(grunt){
		// 引入外部数据
		pkg: grunt.file.readJSON('package.json'),
		// 加载所需的插件，在加载插件前需要进行安装
		grunt.loadNpmTasks('')；
		// 任务配置
		grunt.initCofig({	});
		// 注册任务
		// 若没有该配置可以使用 grunt <任务名> 执行任务，
		// 有了该配置可以执行多个任务
		grunt.registerTask(   );
		grunt.registerTask('default', );
	}

2、常用插件         

 - grunt-contrib-uglify：依赖UglifyJS来进行JS压缩。
 - grunt-contrib-copy：用于拷贝文件夹或文件。
 - grunt-contrib-cssmin：用于压缩css，内部依赖了clean-css。
 - grunt-contrib-htmlmin：用html-minifier来压缩html。
 - grunt-contrib-requirejs：如果你的项目里使用了requirejs来管理模块依赖也需要该插件。内部依赖r.js
 - grunt-contrib-imagemin：用OptIPN个和jpegtran来做不同图片格式的压缩。
 - grunt-contrib-compass：编辑sass文件。
 - grunt-contrib-compress:用来打一些zip等压缩包。
 - grunt-contrib-watch：调试插件，本地环境调试的时候可以使用它来自动执行一些任务。
 - grunt-contrib-clean：用于删除文件夹或文件，内部依赖rimraf来做删除操作。

