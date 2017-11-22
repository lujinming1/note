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

 - 变量：{{arg}}
 - 带有 HTML 的变量：{{{arg}}}
 - 循环：{{#variable}} ... {{/variable}}
 数组循环时 `.` 作为下标，或者使用对象属性名提取属性值。
 - if else : {{#variable}} ... {{/variable}}{{^variable}}...{{/variable}}
 如果variable标签是 null undefined false 或者是 未找到 、空数组、不是数组等时，渲染{{^variable}}标签
 - 注解：{{!注解}}
（1）对象：

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

