#React 中的变量存储
&emsp;&emsp;在React中，我们可以将数据保存在 props、state、store 或者 this 中，但是为了更好的管理数据，我们应该正确的存储数据。     
本文大部分为翻译自[Where to Hold React Component Data: state, store, static, and this](https://medium.freecodecamp.org/where-do-i-belong-a-guide-to-saving-react-component-data-in-state-store-static-and-this-c49b335e2a00 "Where to Hold React Component Data: state, store, static, and this")
####1、props
&emsp;&emsp;我们先从最简单的没有争议的 props 说起。    
&emsp;&emsp;在 React 中 props 被赋予的角色是不可变属性。它是组件之间沟通的一个接口，原则上讲，它只能从父组件流向子组件。

#####使用
&emsp;&emsp;只需像写HTML标签属性一样，给子组件添加属性，它将传递给子组件的 this.props。     

需要注意的是：

- key 和 ref 不会传递给子组件的 this.props。
- 只有属性没有值，React会自动解析为布尔值 true。
- 属性值除了字符串外，其他值需要用花括号包裹。
- 子组件内部不能改变 this.props 的值。

&emsp;&emsp;综上，使用 props 来存储父组件传递给子组件的值。

####2、state
&emsp;&emsp;React使用this.state来管理组件内部状态。当我们使用this.setState去改变state属性时，会触发一次渲染。          
&emsp;&emsp;目前最佳的实践是使用 this.state 来存储用户界面（UI）的状态而不是数据。       
&emsp;&emsp;我们在使用 state 时，可以考虑一下你需要存储的值是否会被其他组件使用。如果一个值只会被单独的组件（也许是这个组件的孩子）使用到，那么使用 state 存储会比较安全。     

&emsp;&emsp;综上，可以将 UI 的状态以及 一些临时的数据（如：input输入的值）保存在 state中。

#####使用
- 初始化：React构造函数中 this.state = {}
- 更新： this.setState
- 获取：this.state

需要注意的是，this.setState 会触发渲染，如果直接使用 this.state = {} 来更改 state 值，无法触发渲染。

####3、this.<something>
&emsp;&emsp;存储在 this 上的值应该是一些不会因改变而触发二次渲染的值。

需要注意的是，除了 setState 和 props 以外的任何东西都不会触发二次渲染。所以如果你将值存储在 this 上，并希望该值改变时能触发重新渲染那么你将需要在值改变后调用 forceUpdate()。

&emsp;&emsp;forceUpdate 直接调用 render()，跳过本组件的 shuoldComponentUpdate()方法，但是子组件的生命周期正常。但是尽量不要使用 forceUpdate。        
&emsp;&emsp;所以，当你发现你需要使用 forceUpdate 时，那么你可能将数据存储错位置了。

&emsp;&emsp;综上，使用 this 来存储一些不会触发二次渲染的属性。

####4、store 如 context、Redux 存储 
&emsp;&emsp;组件间跨级传递数据可以存储在 store 中。

&emsp;&emsp;最好使用 store 来存储组件状态，而非 UI 状态。例如，使用 store 来存储登录态，一旦登录态改变，所有的组件应该重新渲染来更新信息。      
&emsp;&emsp;store 还可以用来触发多个组件或路由之间的事件。例如，你可以通过在顶层容器中通过 store 中的某个值来触发蒙层登录，在所有组件中，可以通过按钮来触发这个蒙层。

&emsp;&emsp;综上，使用store来存储多个组件之间共享的数据。








参考：[Where to Hold React Component Data: state, store, static, and this](https://medium.freecodecamp.org/where-do-i-belong-a-guide-to-saving-react-component-data-in-state-store-static-and-this-c49b335e2a00 "Where to Hold React Component Data: state, store, static, and this")