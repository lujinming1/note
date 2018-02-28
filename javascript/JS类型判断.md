#<center>JS类型判断
&emsp;&emsp;如何检测对象类型？可能第一反应是使用 typeof。但是 typeof 真的好用吗？不见得，如 typeof null 返回的是 “object”。 还有引用类型（Function除外）也返回的是 object。除了 typeof 以外还可以使用 Object.prototype.toString.call()、constructor、 和 instanceof。
####1、typeof
	var a = 1;
	typeof a  => "number"
	typeof 12 => "number"
	
	var b = NaN;
	typeof b => "number"
	typeof NaN => "number"
	
	var c = "SD";
	typeof c => "string"
	typeof "SDF" => "string"
	
	var d = true;
	typeof d => "boolean"
	typeof false => "boolean"
	
	var e;
	typeof e => "undefined"
	typeof undefined => "undefined"
	
	var f = null;   // 注意
	typeof f => "object"
	typeof null => "object"

	var g = new Object;
	typeof g => "object"
	typeof {} => "object"
	
	var h = Array("s","v")；
	typeof h => "object"
	typeof [] => "object"
	
	var i = function(){}
	typeof i => "function"

	var j = new i();
	typeof j => "object"

	var k = /123/   //正则
	typeof k => "object"
<b>注意：</b>    

 - typeof（引用类型）除了函数，其他都是 ‘object’
 - <b>typeof null 为 ‘object’</b>

####2、Object.prototype.toString.call(obj) 或 {}.toString.call(obj)

	Object.prototype.toString.call(1)  => "[object Number]"
	Object.prototype.toString.call(NaN) => "[object Number]"
	Object.prototype.toString.call("as") => "[object String]"
	Object.prototype.toString.call(true) => "[object Boolean]"
	Object.prototype.toString.call(function(){}) => "[object Function]"
	Object.prototype.toString.call(undefined) => "[object Undefined]"
	Object.prototype.toString.call(null) => "[object Null]"
	Object.prototype.toString.call({}) => "[object Object]"
	Object.prototype.toString.call([]) => "[object Array]"
	Object.prototype.toString.call(new Date()) => "[object Date]"
	Object.prototype.toString.call(new Error()) => "[object Error]"
	Object.prototype.toString.call(/123/) => "[object RegExp]"

	function I(){}
	var i = new I()
	Object.prototype.toString.call(i) => "[object Object]"

可以看到Object.prototype.toString.call()可以将内置类型准确判断出来。
Object.prototype.toString方法原理请参考：[JavaScript中Object.prototype.toString方法的原理](http://www.jb51.net/article/79941.htm)一文。

####3、instanceof 和 constructor

- instanceof：用于判断一个变量是否为某个对象的实例
- constructor：用于判断一个对象的原型，constructor 属性返回对创建此对象的数组函数的引用。

	var a = 123
	a instanceof Number => false
	a.constructor == Number  => true
	
	var b = "sdf"
	b instanceof String  => false
	b.constructor == String => true
	
	var c = true
	c instanceof Boolean => false
	c.constructor == Boolean => true
	
	var d = null
	d instanceof Object => false
	d.constructor == null => 报错，Cannot read property 'constructor' of null
	
	var e = undefined
	e instanceof undefined  => 报错，Right-hand side of 'instanceof' is not an object
	e.constructor == undefined => 报错，Cannot read property 'constructor' of undefined
	
	var f = function(){}
	e instanceof Function => true
	e.constructor == Function => true
	
	var g = []
	g instanceof Array => true
	g.constructor == Array => true
	
	var h = {
		"a": 1,
		"b": 2
	}
	h instanceof Object => true
	h.constructor == Object => true
	
	function I(){}
	var i = new I()
	i instanceof I => true
	i.constructor == I => true

