#React VS Vue
##相同点

比如相同点 数据驱动，组件化，工具，对应的插件,虚拟dom

###1、数据驱动
React与Vue都是专注于View层，它让开发者省去了操作DOM的过程，只需要专注于数据的操作。React和Vue会当数据发生改变会通知视图层做相应的改变，即数据驱动DOM变化。省去了手动操作DOM的繁琐过程。

###2、组件化
React与Vue都是组件化的。

###3、虚拟DOM
都使用了虚拟DOM来提高渲染性能。

###4、工具
将注意力集中保持在核心库，而将其他功能如路由和全局状态管理交给相关的库



##不同点
不同点 包括 双向数据绑定，template 与 jsx 状态管理 与 对象属性

###1、监听数据变化的原理不同
Vue 通过getter/setter以及一些函数的劫持，能精确知道数据变化，不需要特定的优化就能达到很好的性能。
react默认是通过比较引用的方式进行的，如果不优化（PurComponent/shouldComponentUpdate）可能导致大量不必要的VDOM的重新渲染。


Vue内部使用了Object.defineProperty()来实现双向绑定，通过这个函数来监听set和get的事件。



Vue使用的是可变数据（data ()=>{a:1}），React更强调数据的不可变。




###2、数据流不同

	Vue1.0 Parent <-(Props)-> child <-V-model-> Dom
	Vue2.0 Parent -(Props)-> child <-V-model-> Dom
	React Parent -(Props)-> Child -state-> Dom

child 修改 Parent 使用事件的方式进行修改

Vue有双向数据绑定
React提倡单向数据流



###4、组件通信的区别
	Vue Parent -props -> child .... childn   
	    Parent <- event - child
		parent -... Provide/Inject-> childn
	
	React Parent -props -> child .... childn   
	    Parent <- callback - child
		parent -... context-> childn

可以看到，React 本身并不支持自定义事件，Vue中子组件向父组件传递消息有两种方式：事件和回调函数，而且Vue更倾向于使用事件。但是在 React 中我们都是使用回调函数的，这可能是他们二者最大的区别。


Vue 有中三种方式可以实现组件通信

- 父组件通过props向子组件传递数据或者回调，虽然可以传递回调，但是我们一般只传数据，而通过事件的机制来处理子组件向父组件的通信。
- 子组件通过事件向父组件发送消息。($emit())
- 通过V2.2中新增加的Provide/inject来实现父组件向子组件注入数据，可以跨越多个层级

https://blog.csdn.net/qq_40479190/article/details/78323936
https://segmentfault.com/a/1190000013592099
子组件通过事件向父组件发送消息示例
	<template>
	    <child @msgFunc="func"></child>
	</template>
	 
	<script>
	 
	import child from './child.vue';
	 
	export default {
	    components: {
	        child
	    },
	    methods: {
	        func (msg) {
	            console.log(msg);
	        }
	    }
	}
	</script>
child.vue
	<template>
	    <button @click="handleClick">点我</button>
	</template>
	 
	<script>
	export default {
	    props: {
	        msg: {
	            type: String,
	            required: true
	        }
	    },
	    methods () {
	        handleClick () {
	            //........
	            this.$emit('msgFunc');
	        }
	    }
	}
	</script>



React中也有三种方式：
- 父组件通过props可以向子组件传递数据或者回调
- 可以通过context进行跨层级的通信，这其实和provide/inject 起到的作用差不多


###5、模板渲染方式的不同
在表层上，模板的语法不同

- react使用JSX渲染模板
- 而Vue是通过一种拓展的HTML语法进行渲染

但其实这只是表面现象，毕竟React并不必须依赖JSX

在深层次上，模板的原理不同，这才是他们的本质区别：

- React是在组件JS代码中，通过原生JS实现模板中常见的语法，比如插值、条件、循环等，都是通过JS代码语法实现的
- Vue是在和组件JS代码分离的单独的模板中，通过指令来实现，比如条件语句就需要V-if来实现

对于这一点，我个人比较喜欢React的做法，因为他更加纯粹更加原生，而Vue的做法显得有些独特，会把HTML弄得很乱，例如     
react中render函数是支持闭包特性的，所以我们import的组件在render中可以直接调用，但是在Vue中，由于模板中使用的数据必须挂在this上进行一次中转，所以我们import一个组件完了之后，还需要在components中再声明一下，这样显然是很奇怪但又不得不这样的做法。


###6、Vuex和Redux的区别
从表面上来说，store注入和使用方式有一些区别。     
在Vuex中，$store被直接注入到了组件实例中，因此可以比较灵活的使用：

- 通过使用dispatch和commit提交更新
- 通过mapState或者直接通过this.$store来读取数据

在Redux中，我们每一个组件都需要显示的用connect吧需要的props和dispatch连接起来。

另外Vuex更加灵活一些，组件中既可以dispatch action 也可以commit updates， 而Redux中只能进行dispatch，并不能直接调用reducer进行修改。

从实际原理上来说，最大的区别是两点：
- Redux使用的是不可变数据，而Vuex使用的是可变数据，Redux每次都是使用新的state替换旧的state，而Vuex是直接修改
- Redux在检测数据变化的时候，是通过diff的方式比较差异的，而Vuex其实和Vue的原理一样，是通过getter/setter来比较的（如果看Vuex源码会知道，其实他内部直接创建一个Vue实例用来跟踪数据变化）



而这两点的区别，其实也是因为 React 和 Vue的设计理念上的区别。React更偏向于构建稳定大型的应用，非常的科班化。相比之下，Vue更偏向于简单迅速的解决问题，更灵活，不那么严格遵循条条框框。因此也会给人一种大型项目用React，小型项目用 Vue 的感觉。




###3、组合组件的方式
Vue：mixin （）
React：Hoc(高阶组件)
https://juejin.im/post/5914fb4a0ce4630069d1f3f6
https://segmentfault.com/a/1190000008814336

高阶组件本质就是高阶函数，React的组件是一个纯粹的函数，所以高阶函数对于React来说非常简单。

Vue组件是一个被包装的函数，并不简单的就是我们定义组件的时候传入的对象或者函数。比如我们定义的模板怎么被编译的？比如声明的props怎么接收到的？这些都是vue创建组件实例的时候隐式干的事。由于vue默默帮我们做了这么多事，所以我们自己如果直接把组件的声明包装一下，返回一个高阶组件，那么这个被包装的组件就无法正常工作了。
##例子
比如虚拟dom 可能又让你对比diff 算法，template 又会问编译jsx 的过程

###1、JSX编译

https://react.docschina.org/docs/jsx-in-depth.html

本质上讲，JSX只是为React.createElement(component, props, ...children)方法提供了语法糖。

	<MyButton color="blue" shadowSize={2}>
	  Click Me
	</MyButton>
=>

	React.createElement(
	  MyButton,
	  {color: 'blue', shadowSize: 2},
	  'Click Me'
	)

如果没有子代，你还可以使用自闭合标签，比如：

	<div className="sidebar" />
=> 

	React.createElement(
	  'div',
	  {className: 'sidebar'},
	  null
	)



