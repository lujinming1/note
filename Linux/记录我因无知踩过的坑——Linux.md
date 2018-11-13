# 记录我因无知踩过的坑——Linux（持续更新ing）
&emsp;&emsp;最近经常在Linux下开发，所以感觉会遇到很多意想不到的坑，特以此文来祭奠它们。   
#### 1、权限不够 
<b>场景一： </b>       
&emsp;&emsp;使用 su 命令从 root 用户切换到普通用户，可能会遇到以下报错：
	
	Error: EACCES: permission denied, scandir '/root'
	(node:7489) UnhandledPromiseRejectionWarning: TypeError: Cannot read property 'get' of undefined
	.......
	.......
	TypeError: Cannot read property 'get' of undefined
	    at process.errorHandler 
	    at process.emit (events.js:182:13)
	    at process._fatalException (internal/bootstrap/node.js:491:27)
	nvm is not compatible with the npm config "prefix" option: currently set to ""
	Run `nvm use --delete-prefix v10.13.0 --silent` to unset it.

该错误产生的原因是由于，我们在 root 目录下将用户切换到了普通用户。而普通用户没有对该目录操作权限导致的。           
<b>注意：</b>该问题会导致普通用户下安装的某些命令不可使用，比如报错中显示 node xxxx，此时，虽然可以使用 su 切换到普通用户，但是使用 node 命令时将提示 `bash: node: command not found`。          
<b>建议：</b>切换用户时，最好将目录切换到公共目录下，以避免权限问题导致某些命令不可使用。
