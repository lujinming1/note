#<center>如何在一台电脑配置GitHub和gitlab的SSH</center>
&emsp;&emsp;在工作中，很多小伙伴在一台电脑上使用不止一个Git账号，例如：自己的个人的GitHub账号，公司的GitLab账号等。在代码 clone、pull、push时，如果使用HTTPS通信，那么git账号之间不会有冲突，但是每次都需要输入账号密码，较为繁琐。并且当代码库规模较大时，采用HTTPS方式，可能会出现超时不响应的情况，因此需要配置SSH。SSH在配置完SSH key后使用很方便，但同一台电脑上使用多个git账号会产生冲突，为此需要配置SSH以支持多账号。

####第一步
在.ssh文件夹下创建一个config 文件（注意没有后缀）文件中大致可配置如下字段：    

	Host：用来替代将要连接的服务器地址。当ssh的时候如果服务器地址能匹配上这里Host指定的值，
		则Host下面指定的HostName将被作为最终的服务器地址使用，并且将使用该Host字段下面配
		置的所有自定义配置来覆盖默认的`ssh_config`配置信息。
	Port：自定义端口
	User：用户名
	HostName：真正连接的服务器地址
	PreferredAuthentications：指定优先使用哪种方式验证，支持密码和秘钥验证方式
	IdentityFile：指定本次连接使用的密钥文件
该文件的主要作用就是指明各个git帐号对应的User以及IdentityFile的文件位置。
 

在该文件中添加如下文件内容

	# gitlab
	Host gitlab
	  HostName git.**.com
	  IdentityFile ~/.ssh/id_rsa
	  
	# github
	Host github.com
	  HostName ssh.github.com
	  User xxx@163.com
	  PreferredAuthentications publickey
	  IdentityFile ~/.ssh/id_github_rsa
	  Port 443

####第二步
1、按照公司Git代码仓库文档生成密钥对，并添加秘钥。

2、按照GitHub的生成秘钥的文档进行秘钥生成：

	https://help.github.com/articles/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent/

在需要输入文件名时输入 id_github_rsa 来生成GitHub秘钥对。

	Enter a file in which to save the key (/c/Users/you/.ssh/id_rsa):[Press enter]

然后按照GitHub的文档，来添加秘钥

	https://help.github.com/articles/adding-a-new-ssh-key-to-your-github-account/

检查是否成功：

	ssh -T git@github

####注意
网上有些资料使用如下配置：

	# github
	Host github
	  HostName github.com
	  IdentityFile ~/.ssh/id_github_rsa
我在使用该配置时报错
	
	ssh: connect to host github.com port 22: Connection timed out
	fatal: Could not read from remote repository.
	说明我们配置的 Port 443 端口没有生效，因此要采用如下配置

	Host github.com
	  HostName ssh.github.com

此外，如果你配置错误将出现如下错误

	ssh_exchange_identification: Connection closed by remote host
	fatal: Could not read from remote repository.


