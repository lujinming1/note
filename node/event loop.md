# Node 中的 Event Loop
### 1、Node 的 Event Loop 分为 6 个阶段: timer、 I/O、 idle prepare、 poll、 check、 close callback
	
		┌────────────────────┐
		│ timer（计时器)      │
	┌──>│ 执行setTimeout 以及 │
	│	│ setInterval的回调   │
	│	└────────────────────┘
	│			  │
	│	┌────────────────────┐
	│	│ pending callback   │
	│	│ 处理网络、流、tcp的  │
	│	│ 错误 callback 。    │
	│	└────────────────────┘
	│			  │
	│	┌────────────────────┐
	│	│ idle，prepare      │
	│	│ node 内部使用       │
	│	└────────────────────┘
	│              │
	│	┌────────────────────┐         ┌────────────────────────┐
	│	│ poll（轮询）        │         │ incoming:              │
	│	│ 执行poll中的 I/O对列 │  <───── │ connections data etc   │
	│  ┌│ 检查定时器是否到时    │         └────────────────────────┘
	│  │└────────────────────┘       
	│  └───────────│
	│	┌────────────────────┐
	│	│ check（检查）       │
	│	│ 存放setImmediate回调│
	│	└────────────────────┘
	│              │
	│	┌────────────────────┐
	│	│ close callbacks    │
	│	│ 关闭的回调例如       │
	│	│ socket.on('close') │
	│	└────────────────────┘
	│              │
	└──────────────┘

#### 任务分为宏任务和微任务 
macro-task（宏任务）： setTimeout、 setInterval、 setImmediate、 I/O   
micro-task（微任务）：Promise、 process.nextTick、 MessageChannel（Vue中nextTick实现原理）        

除了script外，其余微任务都快与宏任务，并且 process.nextTick先于其他micro-task执行。

#### timer
&emsp;&emsp;timers 阶段会执行 setTimeout 和 setInterval 到期的回调。    
一个 timer 指定的时间并不是准确时间，而是在达到这个时间后尽快执行回调，可能会因为系统正在执行别的事务而延迟。      
下限的时间有一个范围： [1, 2147483647](2^31-1)，如果设定的时间不在这个范围，将被设置为1。

#### pending callbacks
&emsp;&emsp;该阶段执行一些系统操作（TCP errors等），比如 一个TCP socket 尝试连接时，收到 ECONNREFUSED，那么 *nix 系统要等待报告错误。这些将被队列在 pending callback 阶段处理。 

#### idle， prepare
&emsp;&emsp;idle， prepare 阶段为 node 内部使用。

#### poll
&emsp;&emsp;poll 阶段很重要，这一阶段中，系统会做两件事情

1、计算它需要阻塞多长时间（根据各类情况综合判断）以及 对 I/O 进行轮询    
2、执行 poll 队列中的事件   
并且当 poll 中没有定时器的情况下，会发现以下两件事情，

- 如果poll队列不为空，会遍历回调队列并同步执行，直到队列为空或者系统限制。
- 如果poll队列为空，会发生两件事
	- 如果有setimmediate 需要执行，poll阶段会停止并进入 check 阶段执行 setImmediate
	- 如果没有 setImmediate 需要执行，会等待回调被加入到队列中并立即执行回调。通常此时 event loop 会等待 incoming connection，request 等

一旦poll队列为空，event loop 将检查是否有定时器到期。如果有一个或多个定时器到期，event loop将回到 timers 阶段执行定时器的回调。

#### check
&emsp;&emsp;check 阶段执行 setImmediate。如果 poll 阶段处于空闲阶段，并且队列中有 setImmediate 事件，那么 event loop 将直接终止 poll 阶段等待，直接进入 check 阶段执行 setImmediate 回调。      
&emsp;&emsp;setImmediate 实际上是一个特殊的 timer ，其运行是在 event loop 的一个单独阶段。它使用 libuv API 来预定回调在 poll 阶段完成后执行。

#### close callbacks
&emsp;&emsp;close callback 阶段执行 close 事件，比如 socket 或者 处理事件的突然终止（socket.destroy()）。

###2、setImmediate、 setTimeout、 process.nextTick

- setImmediate 是一旦 poll 阶段完成就会执行。       
- setTimeout 预定了一个 script 被执行，当最小阈值到达时。         
- process.nextTick 不属于 event loop 。取而代之的是，在当前操作完成后，nextTickQueue 将会被处理，无论 event loop 在那一阶段。也就是说，任意时刻调用了 process.nextTick(callback)，callback 将会在 event loop 继续之前处理完。当 process.nextTick(callback) 递归调用，将会阻止 event loop 进入 poll 阶段，从而会饿死其他事件，如 I/O。 