#<center>Mustache 模板引擎
####1、Mustache简介
&emsp;&emsp;mustache.js 是一个简单强大的 JavaScript 模板引擎。使用mustache前需要通过script标签引入它的js文件，然后按以下步骤操作：        
（1）定义模板字符串        
&emsp;&emsp;定义字符模板有两种方式，

 - 方式一：在 js 代码中定义
 
		var template = ['<ul>',
							'<li>',
							'</li>',
						 '</ul>
						].join('');
 - 方式二：直接把模板内容用 script 定义在 HTML 中
 
		<script id="tpl" type="text/html">
			{{name}}
		</script>
然后在编译模板之前，通过获取 tpl 的 innerHTML 定义原始模板串：

		var template = document.getElementById('tpl')
			.innerHTML.trim();

（2）预编译模板         
使用 parse 函数进行预编译模板，即

	Mustache.parse(template);
要注意，经过预编译后的 template 已经不是原来的模板字符串了，连接数据类型都变成了数组类型。         
（3）渲染模板       
使用 render 函数进行渲染，即

	var rendered = Mustache.render(template, obj)
obj 是数据源对象，mustache 会把模板中属性标签替换成与 obj 对象属性名相同的属性值。         
（4）替换 DOM 内容       
将渲染后的数据挂载到DOM树上。           
####2、mustache 标签
（1）变量：{{prop}}         
&emsp;&emsp;该标签可将数据源对象上 prop 属性对应的值，转换成字符串进行输出，该标签渲染逻辑为：       
1）如果 prop 引用的值是 null 或 undefined，则渲染成空串；       
2）如果 prop 引用的是一个函数，则在渲染是自动执行这个函数，并把这个函数返回值作为渲染结果，假如这个返回值是 null 或 undefined，那么渲染结果仍然为空串，否则把返回值转成字符串作为渲染结果；       
3）其他场景，直接把 prop 引用的值转为字符串作为渲染结果；        
4）默认情况下，在渲染该标签时，是对 prop 的原始值进行 URL 编码或者 HTML 编码之后再输出，若要阻止这种编码行为，应该使用 {{{prop}}}

（2）带有 HTML 的变量：{{{arg}}}      

（3）{{#variable}} ... {{/variable}}     
&emsp;&emsp;该标签可以同时完成 if-else 和 for-each 以及动态渲染的模板功能。在这对标签之间，可以定义其他模板内容，嵌套说有标签。        
1）if-else        
&emsp;&emsp;只有 variable 属性在数据源对象上存在，并且不为 falsy 值（JavaScript 6 个 falsy 值：null，undefined，NaN，0，false，空字符串），并且不为空数组的情况下，标签之间的内容才会被渲染，否则不会被渲染。       
<b>注意：</b>当 variable 属性引用的是一个函数的时候，{{#variable}}会自动调用这个函数，并把函数的返回值作为 if-else 渲染逻辑的判断依据，也就是说如果这个函数的返回值是 falsy 值或者是空数组的时候，那么这对标签之间的内容还是不会显示。          
2）for-each      
&emsp;&emsp;当 variable 属性所引用的是一个非空数组时，这对标签之间的内容将会根据数组大小进行迭代，并且当数组元素为对象时，还会把该对象作为每一次迭代的上下文，以便迭代时标签可以直接引用数组元素上的属性。      
&emsp;&emsp; 数组循环时 `.` 作为下标，或者使用对象属性名提取属性值。        
3）动态渲染      
&emsp;&emsp;当 variable 属性所引用的是一个函数，并且这个函数的返回值还是一个函数的话，mustache 会再次调用这个返回的函数，并给它传递 2 个参数： text 表示原来的模板内容， render 表示 mustache 内部的执行渲染的对象，以便在这个函数内部可以通过这个 render对象，结合原来的模板内容，自定义渲染逻辑，并把函数的返回值作为渲染结果。         

（4）{{^variable}}...{{/variable}}
&emsp;&emsp;这对标签，与{{#variable}} ... {{/variable}}的 if-else 渲染执行相反逻辑，即只有在 variable 属性不存在或者引用的是一个 falsy 值，或者是一个空数组时才会显示标签之间的内容，否则不会显示。        

（5）注解：{{!注解}}

（6）举例：对象

	{
		"name":{
			"first":"Mi",
			"last":"Jack"
		}
		"age": "20"
	}
	
	{{name.first}}{{name.last}}
	{{age}}
循环使用：

	{
		"stooges":[
			{"name":"MOE"},
			{"name":"LARRY"}
		]
	}
	
	{{#stooges}}
		{{name}}
	{{/stooges}}
####3、示例   
（1）index.html  
  
	<!DOCTYPE html>
	<html lang="en">
	<head>
	    <meta charset="UTF-8">
	    <title>test</title>
	</head>
	<body>
	    <div id="J_wrapper"></div>
	    <script src="require.js" charset="UTF-8"></script>
	    <script>require(['app/tpl']);</script>
	</body>
	</html>
（2）tpl/helloworld.mustache    

	<div>
	    {{value}}
	</div>
（3）app/tpl.js

	define(["mustache"],function(mustache){
	        require(['text!tpl/helloworld.mustache'],function(tpl){
	            mustache.parse(tpl)
	            var view ={value : "hello world"},
	                html = mustache.render(tpl, view); // 第二个参数必须是对象
	            document.getElementById("J_wrapper").innerHTML = html;
	
	        })
	    });
（4）引入的 js 有： mustache.js、require.js、text.js
参考：[http://www.cnblogs.com/lyzg/p/5133250.html](http://www.cnblogs.com/lyzg/p/5133250.html)

####4、注意
- <b>问题</b>   

&emsp;&emsp;当我们双击HTML文件，或者在Sublime中右键选择“open in browser”，浏览器会报一个错：

	Failed to load file:///E:/testspace/mustache_test/tpl/helloworld.mustache: 
	Cross origin requests are only supported for protocol schemes: 
	http, data, chrome, chrome-extension, https.

错误消息为：    
&emsp;&emsp;跨域请求仅支持：http, data, chrome, chrome-extension, https 等，不支持 file协议。这是由于浏览器（Webkit内核）的安全策略决定了file协议访问的应用无法使用 XMLHttpRequest对象。     
&emsp;&emsp;sublime 默认是没有内置HTTP服务器的，所以是以 file 的方式打开，并产生了该问题。
     
- <b>解决方法</b>

<strong>（1）配置浏览器</strong>
 
Windows：

设置Chrome的快捷方式属性，在“目标”后面加上`--allow-file-access-from-files`，注意前面有个空格，重新打开Chrome即可。

Mac：

只能通过终端打开浏览器：打开终端，输入下面命令：open -a “Google Chrome” –args –disable-web-security然后就可以屏蔽安全访问了[ –args：此参数可有可无] 

<strong>（2）安装HTTP服务器</strong>  

&emsp;&emsp;若使用IDE，则无需配置，因为每个用于Web开发的IDE都内置HTTP服务器。    
&emsp;&emsp;编辑器一般没有内置HTTP服务器，下面以sublime为例进行安装 Sublime Server插件。     

	1、在package control install中搜索 sublime server，然后安装。（具体安装不做略，与其他插件安装步骤一样）
	2、启动sublime server。方法：Tool → SublimeServer → Start SublimeServer
	3、打开HTML文件，在右键菜单中选择View in SublimeServer，此时就可以以HTTP方式在浏览器中访问该文件了。若View in SublimeServer 为灰色不可点时，可能是未启动成功，或者端口已被占用（SublimeServer默认使用8080端口）。
