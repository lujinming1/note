&emsp;&emsp;Chrome Performance工具文章网上一搜一大把，但是作为一个刚入门的前端小白，我还是觉得自己整理一下（抄的），来加深理解。          
&emsp;&emsp;网上很多文章都是使用官网提供的[DEMO](https://googlechrome.github.io/devtools-samples/jank/)了进行分析的。大概看了一下该网站用例，用例是通过修改蓝色图标的 `top` 值来完成动画效果。其优化是将 `offsetTop` 值进行了缓存，以避免频繁读取引发的回流。但是优化后，仍然是修改元素的top值来完成动画，此处还可以使用 `translate` 来代替 `top` 来进行优化。      

（扯远了，本文是初识Chrome Performance。嗯，好吧，下面才是正文。）     

&emsp;&emsp;先来看看 <b>Performance </b> 界面长什么样子。

![Performance 界面](http://s)

其从上到下是：

- 工具栏
- FPS图表
- CPU图表
- NET图表
- Network图表
- Frames图表
- Main图表
- Frame图表
- Raster图表
- CPU图表
- Summary面板


####1、FPS图表
&emsp;&emsp;FPS（frames per second）每秒帧数，是来衡量动画的一个性能指标，该指标若能保持在60，就能带来不错的用户体验。若出现了一个红色的长条，那就说明这些帧存在严重的问题。

![FPS](http://fps)

###2、CPU图表
&emsp;&emsp;CPU图表中的颜色和面板底部的Summary 面板中的颜色是匹配的。每种颜色分别代码一种处理。颜色条越长，表示CPU在该处理上所花费的时间就越长。

![CPU](http://CPU)


各颜色含义：

- 蓝色(Loading)：网络通信和HTML解析
- 黄色(Scripting)：JavaScript执行
- 紫色(Rendering)：样式计算和布局，即重排
- 绿色(Painting)：重绘
- 灰色(other)：其它事件花费的时间
- 白色(Idle)：空闲时间

<table>
<tr>
    <td>颜色</td>
    <td>事件</td>
	<td>描述</td>
</tr>
<tr>
    <td rowspan="5"> 蓝色(Loading)</td>
    <td>Parse HTML</td>
    <td>浏览器执行HTML解析</td>
</tr>
<tr>
    <td>Finish Loading</td>
    <td>网络请求完毕事件</td>
</tr>
<tr>
    <td>Receive Data</td>
    <td>请求的响应数据到达事件，如果响应数据很大（拆包），可能会多次触发该事件</td>
</tr>
<tr>
    <td>Receive Response</td>
    <td>响应头报文到达时触发</td>
</tr>
<tr>
    <td>Send Request</td>
    <td>发送网络请求时触发</td>
</tr>
<tr>
	<td rowspan="15"> 黄色(Scripting)</td>
    <td>Animation Frame Fired</td>
    <td>一个定义好的动画帧发生并开始回调处理时触发</td>
</tr>
<tr>
    <td>Cancel Animation Frame</td>
    <td>取消一个动画帧时触发</td>
</tr>
<tr>
    <td>GC Event</td>
    <td>垃圾回收时触发</td>
</tr>
<tr>
    <td>DOMContentLoaded</td>
    <td>当页面中的DOM内容加载并解析完毕时触发</td>
</tr>
<tr>
    <td>Evaluate Script</td>
    <td>A script was evaluated.</td>
</tr>
<tr>
    <td>Event</td>
    <td>js事件</td>
</tr>
<tr>
    <td>Function Call</td>
    <td>只有当浏览器进入到js引擎中时触发</td>
</tr>
<tr>
    <td>Install Timer</td>
    <td>创建计时器（调用setTimeout()和setInterval()）时触发</td>
</tr>
<tr>
    <td>Request Animation Frame</td>
    <td>requestAnimationFrame（）调用预定一个新帧</td>
</tr>
<tr>
    <td>Remove Timer</td>
    <td>当清除一个计时器时触发</td>
</tr>
<tr>
    <td>Time</td>
    <td>调用console.time()触发</td>
</tr>
<tr>
    <td>Time End</td>
    <td>调用console.timeEnd()触发</td>
</tr>
<tr>
    <td>Timer Fired</td>
    <td>定时器激活回调后触发</td>
</tr>
<tr>
    <td>XHR Ready State Change</td>
    <td>当一个异步请求为就绪状态后触发</td>
</tr>
<tr>
    <td>XHR Load</td>
    <td>当一个异步请求完成加载后触发</td>
</tr>

<tr>
    <td rowspan="4"> 紫色(Rendering)</td>
    <td>Invalidate layout</td>
    <td>当DOM更改导致页面布局失效时触发</td>
</tr>
<tr>
    <td>Layout</td>
    <td>页面布局计算执行时触发</td>
</tr>
<tr>
    <td>Recalculate style</td>
    <td>Chrome重新计算元素样式时触发</td>
</tr>
<tr>
    <td>Scroll</td>
    <td>内嵌的视窗滚动时触发</td>
</tr>

<tr>
    <td rowspan="4"> 绿色(Painting)</td>
    <td>Composite Layers</td>
    <td>Chrome的渲染引擎完成图片层合并时触发</td>
</tr>
<tr>
    <td>Image Decode</td>
    <td>一个图片资源完成解码后触发</td>
</tr>
<tr>
    <td>Image Resize</td>
    <td>一个图片被修改尺寸后触发</td>
</tr>
<tr>
    <td>Paint</td>
    <td>合并后的层被绘制到对应显示区域后触发</td>
</tr>
</table>

###3、NET和Network
&emsp;&emsp;NET中每条横杠表示一种资源，横杠越长，表示请求资源所需的时间越长。Network中表示忘了请求的详细情况。

![](http://net)


<b>注意：</b>无论鼠标移动到FPS,CPU或者NET图表上，DevTools都会显示在该时间节点上的屏幕截图，将你的鼠标左右移动，可以重放录制画面，这被称为擦洗。

###4、Frames
&emsp;&emsp;在Frames部分，如果将你的鼠标移动至绿色方块部分，会显示在该特定帧上的FPS值，此例中每帧可能远低于60FPS的目标。

![](http://Frames)

&emsp;&emsp;在这个例子中，页面的性能很差并且能很明显地被观察到，但是在实际场景中，可能并不是那么的容易，所以，要用所有这些工具来进行综合测量。

<b>实时显示FPS面板：</b>more tools -> Rendering -> 在Rendering面板打开 FPS Meter。

###5、Main
&emsp;&emsp;展开Main部分，DevTools将显示主线程上的随着时间推移的活动火焰图。x轴代表随时间推移的记录，每个长条代表一个事件，长条越宽，代表这个事件花费的时间越长。y轴代表调用堆栈，当你看到堆叠在一起的事件时，意味着上层事件发起了下层事件。

![](http://main)

&emsp;&emsp;可以通过单击、鼠标滚动或者拖动来选中FPS,CPU或NET图标中的一部分，Main部分和Summary Tab就会只显示选中部分的录制信息。注意Animation Frame Fired事件右上角的红色三角形图标，该红色三角图标是这个事件有问题的警告。

&emsp;&emsp;在Summary面板中，将会显示有导致问题的代码行号。比如点击 Initiator 的 reveal或者Initiator下面的： app.js:95，点击将会跳转到对应的代码行。

&emsp;&emsp;通过上面的方法可以分析该例子中，由于`offsetTop`导致了回流，所以优化方法是将该值缓存，避免重复读取。

参考：

[网页性能分析不完全指南](https://segmentfault.com/a/1190000012243560)    
[chrome-performance页面性能分析使用教程](https://www.cnblogs.com/ranyonsue/p/9342839.html)