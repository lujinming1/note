# HTTP报文

### 请求报文格式

	请求方法 URL HTTP/版本号   // 请求行
	请求首部字段               // 请求头
	空行
	body（只对Post请求有效）    // 请求主体

	GET http://www.baidu.com/108923674?since=1554&_=153193 HTTP/1.1
	Host: www.baidu.com
	Connection: keep-alive
	Accept: application/json, text/javascript, */*; q=0.01
	X-Requested-With: XMLHttpRequest
	...//其他header
	
	key=11	

一般情况下，一旦Web服务器向浏览器发送了请求数据，它就要关闭TCP连接。但如果浏览器或者服务器在其头部信息中加入

	Connection: keep-alive
TCP连接在发送后将仍保持打开状态。于是，浏览器可以继续通过相同的连接发送请求。保持连接是为了节省每个请求建立新连接所需的时间，还节约了网络带宽。


### 响应报文格式

	HTTP/版本号 返回码 返回码描述   // 状态行
	响应首部字段                   // 响应头
	空行
	body					      // 响应主体

	HTTP/1.1 200 OK
	Cache-Control: private
	Content-Type: text/plain; charset=utf-8
	Vary: Accept-Encoding
	Server: Microsoft-IIS/8.5
	X-AspNet-Version: 4.0.30319
	X-Powered-By: ASP.NET
	Date: Thu, 20 Sep 2018 02:53:34 GMT
	Connection: close
	Content-Length: 514
	
	5
	0
	20182



https://juejin.im/post/5af557a3f265da0b9265a498
https://juejin.im/post/5a584c146fb9a01cb508c14f
https://mp.weixin.qq.com/s/27zpNIGhVbx-on9FDs_6dw
https://segmentfault.com/a/1190000004457479