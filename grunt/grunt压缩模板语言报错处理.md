#Grunt 压缩模板语言报错处理

####场景复现：
&emsp;&emsp;当我们在模板（如Mustache）中使用模板语言包裹标签属性后，使用 `grunt-contrib-htmlmin` 压缩模板时，可能会遇到 `Parse Error` 错误。

<b>例如</b>

	<span {{#overdue}}class="overdue"{{/overdue}}>{{expireDate}}</span>
	在 span 标签中我们使用标签 {{#overdue}}{{/overdue}} 来动态添加 class 属性
	此时使用 htmlmin 来压缩时会报 Parse Error 错误。
	<option {{#active}}selected{{/active}}>{{name}}</option>
	在 option 标签中我们使用标签 {{#active}}{{/active}} 来动态添加 selected 属性
	此时使用 htmlmin 来压缩时会报 Parse Error 错误。

####问题分析
&emsp;&emsp;这是因为 `htmlmin` 不接受 HTML 级别的自定义属性，导致上述情况为无效的HTML 所以无法解析该模板。但是，插值器可以识别出用于包裹纯文本、元素属性值的双括号。

####问题解决

#####方法一：
&emsp;&emsp;通过上面分析我们发现，这是由于自定义属性导致的，但是 `class` 是 `span` 标签已有属性。所以我们可将标签 `{{#overdue}}{{/overdue}}` 添加到双引号中，即

	<span class="{{#overdue}}overdue{{/overdue}}">{{expireDate}}</span>
	此时，模板标签处于双引号之中，所以可以正常解析，
	当条件不成立时，class 值为空，不会影响显示效果。


<b>但是：</b>

	<option {{#active}}selected{{/active}}>{{name}}</option>
	不可以使用该方法来解决。此时，需要第二种解决方法。

#####方法二：
&emsp;&emsp;某些 DOM 元素支持布尔属性，其存在会导致元素行为发生变化。例如：上面的 `selected` 属性，如果使用方法一来解决，则所有 `option` 都有 `selected` ，不是我们想要的。 为此，需要使用 `customAttrSurround` 属性来解决问题。

- customAttrSurround ： 允许支持自定义属性包裹表达式的正则数组。

则上面的例子可以使用一下配置来解决：

	options: {
		customAttrSurround: [[/\{\{#[^}]+\}\}/, /\{\{\/[^}]+\}\}/]]
	}

	/\{\{#[^}]+\}\}/：开始标签 {{#xx}}
	/\{\{\/[^}]+\}\}/：结束标签 {{/xx}}
	如果想匹配其他标签时，在数组中增加既可，如：
	customAttrSurround : [
			[/\{\{#[^}]+\}\}/, /\{\{\/[^}]+\}\}/],
			[/\{\{\^[^}]+\}\}/, /\{\{\/[^}]+\}\}/]
		]
	可以匹配：{{#xx}}{{/xx}}、{{^xx}}{{/xx}}

<b>注意：</b>该表达式用于解析单个属性值对，因此，模板标签不能跨越多个属性，否则无法识别。若包裹了多个属性，则压缩完会将包裹多属性标签的 {{}} 去除了。

	<img src="logo.svg" {{#if logo_title}}alt="{{logo_title}}" title="{{logo_title}}"{{/if}} />
	此时无法识别，则压缩后的代码为：
	<img src="logo.svg" if logo_title alt="{{logo_title}}" title="{{logo_title}}" if />

	应改为：
	<img src="logo.svg" {{#if logo_title}}alt="{{logo_title}}"{{/if}} {{#if logo_title}}title="{{logo_title}}"{{/if}} />
 		
 <b>注意：</b>若有多层标签包裹，应该写多个标签的正则，否则将导致压缩挂起。比如：

	<input {{#ISVOUCHER}}{{^coupon}}style="display:none"{{/coupon}}{{/ISVOUCHER}} >
	
	此时，如果使用的配置为：
	customAttrSurround : [
			[/\{\{#[^}]+\}\}/, /\{\{\/[^}]+\}\}/],
			[/\{\{\^[^}]+\}\}/, /\{\{\/[^}]+\}\}/]
		]
	这将无法匹配到 {{#ISVOUCHER}}{{^coupon}} 标签情况，将导致压缩挂起，因此需要将配置改为：
	options: {
		customAttrSurround: [
			[/\{\{#[^}]+\}\}\{\{\^[^}]+\}\}/, /\{\{\/[^}]+\}\}\{\{\/[^}]+\}\}/]
		]
	}

<b>注意：</b>特别注意标签与内容之间不能有空格，压缩后检查一下是否正确压缩。因为个人遇到过，标签与内容之间有空格，压缩后将包裹多属性标签的 {{}} 去除了，导致未达到预期效果。