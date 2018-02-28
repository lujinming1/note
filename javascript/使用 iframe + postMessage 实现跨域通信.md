#<center>使用 iframe + postMessage 实现跨域通信
&emsp;&emsp;在实际项目开发中可能会碰到在 a.com 页面中嵌套 b.com 页面，这时第一反应是使用 iframe，但是产品又提出在 a.com 中操作，b.com 中进行显示，或者相反。       

####1、postMessage
&emsp;&emsp;postMessage方法允许来自不同源的脚本采用异步方式进行有限的通信，可以实现跨文本档、多窗口、跨域消息传递。
 
<b>语法：</b>     

	otherWindow.postMessage(message, targetOrigin, [transfer]);

 - otherWindow：其他窗口的引用，如 iframe的contentWindow、执行window.open返回的窗口对象、或者是命名过或数值索引的window.frames。
 - message：将要发送到其他window的数据。
 - targetOrigin：指定那些窗口能接收到消息事件，其值可以是字符串 “*” 表示无限制，或者是一个URI。
 - transfer：是一串和message同时传递的Transferable对象，这些对象的所有权将被转移给消息的接收方，而发送方将不再保留所有权。

postMessage方法被调用时，会在所有页面脚本执行完毕之后像目标窗口派发一个 MessageEvent 消息，该MessageEvent消息有四个属性需要注意：

 - type：表示该message的类型
 - data：为 postMessage 的第一个参数
 - origin：表示调用postMessage方法窗口的源
 - source：记录调用postMessage方法的窗口对象

####2、搭建框架

 - http://a.com/main.html    主页面
 - http://b.com/iframepage.html   嵌套页面

main.html
	
	<!DOCTYPE html>	
	<html>
	<head>
	<meta charset="utf-8">
	<title>iframe+postMessage 跨域通信 主页面</title>
	</head>
	<body>
		<h1>主页面</h1>
		<iframe id="child" src="http://b.com/iframepage.html"></iframe>
		<div>
			<h2>主页面接收消息区域</h2>
			<span id="message"></span>
		</div>
	</body> 
	</html>

iframepage.html

	<!DOCTYPE html>
	<html>
	<head>
	<meta charset="utf-8">
	<title>iframe+postMessage跨域通信 子页面</title>
	</head>
	<body>
		<h2>子页面</h2>
		<div>
			<h3>接收消息区域</h3>
			<span id="message"></span>
		</div>
	</body>
	</html>

####2、父向子发送消息

main.html

	<script>
		window.onload = function(){
			document.getElementById('child')
			 .contentWindow.postMessage("主页面消息", 
					"http://b.com/iframepage.html")
		}
	</script>
<b>注意：</b>一定是页面加载完成后在发送消息，否则会因为 iframe 未加载完成报错。

	Failed to execute ‘postMessage’ on ‘DOMWindow’

子页面接收消息：
iframepage.html

	<script>
		window.addEventListener('message',function(event){
			console.log(event);
			document.getElementById('message').innerHTML = "收到" 
				+ event.origin + "消息：" + event.data;
		}, false);
	</script>

此时可看到页面中，iframe的子页面中打印了

	收到http://a.com消息：主页面消息

【主向子发送消息.png】

以及控制台打印了MessageEvent对象。

【MessageEvent.png】

####3、子向父发送消息
子页收到消息后回复父页面
iframepage.html 

	<script>
		window.addEventListener('message',function(event){
			console.log(event);
			document.getElementById('message').innerHTML = "收到" 
				+ event.origin + "消息：" + event.data;
			top.postMessage("子页面消息收到", 'http://a.com/main.html')
		}, false);
	</script>

父页面收到消息并显示：

	window.addEventListener('message', function(event){
		document.getElementById('message').innerHTML = "收到" 
			+ event.origin + "消息：" + event.data;
	}, false);

【子向父发送消息.png】

4、完整代码

main.html

	<!DOCTYPE html>
	<html>
	<head>
	<meta charset="utf-8">
	<title>iframe+postMessage 跨域通信 主页面</title>
	</head>
	<body>
		<h1>主页面</h1>
		<iframe id="child" src="http://b.com/iframepage.html"></iframe>
		<div>
			<h2>主页面接收消息区域</h2>
			<span id="message"></span>
		</div>
	</body> 
	<script>
		window.onload = function(){
			document.getElementById('child')
			 .contentWindow.postMessage("主页面消息", 
				"http://b.com/iframepage.html")
		}
		window.addEventListener('message', function(event){
			document.getElementById('message').innerHTML = "收到"
			 + event.origin + "消息：" + event.data;
		}, false);
	</script>
	</html>

iframepage.html

	<!DOCTYPE html>
	<html>
	<head>
	<meta charset="utf-8">
	<title>iframe+postMessage跨域通信 子页面</title>
	</head>
	<body>
		<h2>子页面</h2>
		<div>
			<h3>接收消息区域</h3>
			<span id="message"></span>
		</div>
	</body>
	<script>
		window.addEventListener('message',function(event){
			if(window.parent !== event.source){return}
			console.log(event);
			document.getElementById('message').innerHTML = "收到" 
				+ event.origin + "消息：" + event.data;
			top.postMessage("子页面消息收到", 'http://a.com/main.html')
		}, false);
	</script>
	</html>