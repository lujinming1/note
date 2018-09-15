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
	    this.divRef = React.createRef();
	  }
	  componentDidMount() {
	    new Promise((res, rej) => {
	      this.handleClick('Promise');
	      res();
	    }).then(() => {
	      this.handleClick('then');
	    });
	
	     this.divRef.current.addEventListener(
	      "mousedown",
	      this.handleClick
	    );
	
	    setTimeout(() => {this.handleClick('setTimeout')}, 1000);
	  }
	
	  handleClick = (event) => {
	    console.log(`${event}更新前：`,this.state.star); 
	    this.setState({star: this.state.star + 1});
	    console.log(`${event}更新后：`,this.state.star);      
	  }
	    
	  render(){
	     return (
	      <div ref = {this.divRef}>
	        <button onClick={this.handleClick}>Click</button>
	      </div>
	      
	    );
	  }
	
	}

在 IndexPage 组件中，通过5种方式调用setSate，

- 在 button 上通过onClick事件来调用 handleClick 函数（这是我们常见的形式）
- 在 componentDidMount 中通过 promise 的立即执行函数来调用 handleClick 函数
- 在 componentDidMount 中通过 promise 的 then 函数来调用 handleClick 函数
- 在 componentDidMount 中通过原生方法来为 div 元素添加 mousedown 事件来调用 handleClick 函数
- 在 componentDidMount 中通过 setTimeout 来调用 handleClick 函数

你能说出两种情况输出的结果吗？    
&emsp;&emsp;当然， onClick 是我们常见的形式，大家对此应该不会陌生，它更新前和更新后输出的结果是一样。   
&emsp;&emsp;但是，其他情况的结果你能说的出来吗？     
	
	Promise更新前： 0
	Promise更新后： 0
	then更新前： 1
	then更新后： 2
	setTimeout更新前： 2
	setTimeout更新后： 3
	mousedown更新前： 3
	mousedown更新后： 4
	click更新前： 4
	click更新后： 4

- Promise的参数函数是立即执行函数，在 new Promise时会调用是同步执行的，产生的结果是 setState 异步执行。
- then 和 setTimeout 异步执行，产生的结果是 setState 同步执行。  
- 原生方法绑定事件，产生的结果是 setState 同步执行。

惊不惊喜，意不意外，哈哈哈哈哈。

要想知道为何，就要探索一下 setState 的实现，还是等下一篇在具体分析原因吧。

<b>总结：</b>

- 在组件生命周期中同步调用setState或者在react事件绑定中，setState是通过异步更新的。
- 在异步回调或者原生事件绑定的回调中调用setState不一定是异步的。

https://segmentfault.com/a/1190000014131698