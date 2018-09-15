# React setState的异步性
&emsp;&emsp;在 React 官方文档中有如下介绍：

Calls to setState are asynchronous - don’t rely on this.state to reflect the new value immediately after calling setState.

并且，我们在学习 React 过程中所看到的资料都在反复强调 setState 是异步的。

例如：

	incrementCount(){
		// Let's say `this.state.count` starts at 0.
		this.setState({count: this.state.count + 1});
		console.log(this.state) // =>  0
	}
此时，console.log 输出的是0， 而不是1。

下面介绍的内容，也许会颠覆你的三观，请坐稳了。  
先看一段代码：
      
	class IndexPage extends Component{
	  constructor(props){
	    super(props);
	    this.state = {
	      star: 0
	    };
	  }
	  componentDidMount() {
	    setTimeout(this.handleClick, 1000)
	  }
	
	  handleClick = (event) => {
		  console.log('更新前：',this.state.star); 
	      this.setState({star: this.state.star + 1});
	      console.log('更新后：',this.state.star);      
	  }
	    
	  render(){
	     return (
	      <button onClick={this.handleClick}>Click</button>
	    );
	  }
	
	}

在 IndexPage 组件中，通过两种方式调用setSate，

- 在 button 上通过onClick事件来调用 handleClick 函数（这是我们常见的形式）
- 在 componentDidMount 中通过 setTimeout 来调用 handleClick 函数

你能说出两种情况输出的结果吗？    
&emsp;&emsp;当然， onClick 是我们常见的形式，大家对此应该不会陌生，它更新前和更新后输出的结果是一样。   
&emsp;&emsp;但是，setTimeout 更新前后的结果你能说的出来吗？     

<b>使用 setTimeout 调用 handleClick 输出的结果是：更新后是更新前 + 1，即 state 被同步更新了。</b>      

惊不惊喜，意不意外，哈哈哈哈哈。

让我们来看看 <b>setState</b> 方法的实现，（源码得先了解一下fiber架构）

	/**
	 * 代码位置：react/packages/react/src/ReactBaseClasses.js
	 * @param {object|function} partialState Next partial state or function to
	 *        produce next partial state to be merged with current state.
	 * @param {?function} callback Called after state is updated.
	 * @final
	 * @protected
	 */
	Component.prototype.setState = function(partialState, callback) {
		// Use invariant() to assert state which your program assumes to be true.
	  invariant(
	    typeof partialState === 'object' ||
	      typeof partialState === 'function' ||
	      partialState == null,
	    'setState(...): takes an object of state variables to update or a ' +
	      'function which returns an object of state variables.',
	  );

	  /**
		* import ReactNoopUpdateQueue from './ReactNoopUpdateQueue';
		* this.updater = updater || ReactNoopUpdateQueue;
		*/
	  this.updater.enqueueSetState(this, partialState, callback, 'setState');
	};

从源码中可以看到，在setState中调用了enqueueSetState方法，并将更新状态以参数的形式传入。

      /**
	   * 代码位置：react/packages/react/src/ReactNoopUpdateQueue.js
	   * @param {ReactClass} publicInstance The instance that should rerender.
	   * @param {object} partialState Next partial state to be merged with state.
	   * @param {?function} callback Called after component is updated.
	   * @param {?string} Name of the calling function in the public API.
	   * @internal
	   */
	  enqueueSetState: function(
	    publicInstance,
	    partialState,
	    callback,
	    callerName,
	  ) {
	    warnNoop(publicInstance, 'setState');
	  },

<b>总结：</b>

- 在组件生命周期中同步调用setState或者在react事件绑定中，setState是通过异步更新的。
- 在异步回调或者原生事件绑定的回调中调用setState不一定是异步的。

https://segmentfault.com/a/1190000014131698