#<center>函数节流（throttle）与函数去抖（debounce）
&emsp;&emsp;频繁执行一段JS逻辑代码对性能会有很大的影响，比如监听 resize、scroll、mousemove等事件，并作出相应的DOM操作，或者逻辑中需要进行后端请求，此时会发现每移动一定像素便触发了大量的回调函数，回调函数中又伴随着DOM操作，或者后端请求，继而引发浏览器的重排与重绘，性能差的浏览器可能会直接假死。为此，需要降低触发回调的频率，而函数节流（throttle）与函数去抖（debounce）是在时间轴上控制函数的执行次数。
#####函数防抖（debounce）：在事件触发 n 秒后再执行回调，如果这 n 秒内又被触发，则重新计时。
<b>例如：</b>实现对于输入框连续输入进行AJAX验证。            
没有去抖之前：

	function ajax(content){
		console.log('ajax request ' + content);
	}
	var input = document.getElementById('input');
	input.addEventListener('keyup', function(e){ajax(e.target.value)})
此时每按一个键就会触发一次 ajax 请求。现在用debounce方法改进：

	function ajax(content){
		console.log('ajax request ' + content);
	}
	function debounce(func, delay){
		return function(args){
			var _this = this,
				_args = args;
			clearTimeout(func.id);
			func.id = setTimeout(func.call(_this, _args),delay);
		}
	}
	var debounceAjax = debounce(ajax, 1000);
	var input = document.getElementById('input');
	input.addEventListener('keyup', function(e){debunounceAjax(e.target.value)})
此时，并不是每按一个键就会触发 ajax 请求，而是当停止输入并在指定时间内没有输入的时候，才会执行相应的回调函数。

#####函数节流（throttle）：规定一个单位时间，在这个单位时间内，只能有一次触发事件的回调函数执行，如果在同一个单位时间内某个事件被触发多次，只有一次能生效。
<b>例如：</b>继续上面的例子，使用throttle方法改进：

	function ajax(content){
		console.log('ajax request ' + content);
	}
	function throttle(func, delay){
		var last, deferTimer;
		return function(){
			var _this = this,
				_args = arguments,
				now = +new Date();
			if(last && now < last + delay){
				clearTimeout(deferTimer);
				deferTimer = setTimeout(function(){
					last = now;
					func.apply(_this, _args);
				}, delay);
			} else {
				last = now;
				func.apply(_this._args);
			}
		}
	}
	var throttleAjax = throttle(ajax, 1000);
	var input = document.getElementById('input');
	input.addEventListener('keyup', function(e){throttleAjax(e.target.value)})
此时，ajax回调是每隔1s执行一次。

参考：    
[轻松理解JS函数节流和函数防抖JS函数防抖和函数节流](https://juejin.im/post/5a35ed25f265da431d3cc1b1)       
[深入浅出throttle和debounce](https://github.com/stephenLYao/diary/issues/12)
