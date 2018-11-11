# CentOS7 Nginx安装
该文档用于记录在CentOS 7 中，使用yum安装Nginx。
### 1、安装Nginx

	yum install -y nginx
注意，如果无法安装，提示无Nginx源使用以下命令安装yum源

	rpm -ivh http://nginx.org/packages/centos/7/noarch/RPMS/nginx-nr-agent-2.0.0-11.el7.ngx.noarch.rpm
然后重新执行 `yum install -y nginx`来安装Nginx。

1.1、查看确认是否安装

	rpm -qa | grep nginx

1.2、查看Nginx目录

	whereis nginx
	
	输出：
	[root@localhost /]# whereis nginx
	nginx: /usr/sbin/nginx /usr/lib64/nginx /etc/nginx /usr/share/nginx /usr/share/man/man8/nginx.8.gz /usr/share/man/man3/nginx.3pm.gz

以下是Nginx的默认路径：        
（1）Nginx执行文件：/usr/sbin/nginx           
（2）Nginx配置路径：/etc/nginx        
（3）Nginx默认站点目录：/usr/share/nginx      
（4）Nginx日志：/var/log/nginx/      
（5）Nginx PID目录：/var/run/nginx.pid        
特别要记住Nginx配置路径，其配置文件为 `/etc/nginx/nginx.conf` 以及 `/etc/nginx/conf.d/default.d.conf`

### 2、启动Nginx

2.1、启动Nginx

	systemctl start nginx

2.2、设置开机启动

	systemctl enable nginx

2.3、查看Nginx启动状态

	systemctl status nginx

2.4、查看80端口是否被监听

	[root@localhost /]# netstat -tnlp | grep 80
	tcp    0   0 0.0.0.0:80    0.0.0.0:*         LISTEN      2766/nginx: master  
	tcp6   0   0 :::80         :::*              LISTEN      2766/nginx: master

2.5、测试Nginx      
&emsp;&emsp;在浏览器中输入Nginx服务器的IP地址，可以看见Nginx的测试页面。        
备注：如果不能正常访问，检查一下信息：     
（1）检查是否端口被允许：如使用阿里云服务器，在安全组中允许 80端口        
（2）关闭防火墙：

	systemctl stop firewalld.service     #停止Firewall
	systemctl disable firewalld.service  #禁止Firewall开机启动
	firewall-cmd --state #查看默认防火墙状态（关闭后显示not running，开启后显示running）