# XSS CSRF
XSS是攻击者向网站A注入脚本，受害者访问网站A时会执行攻击者注入的脚本从而受到攻击。

CSRF是攻击者构建网站B，在网站B中隐藏一个访问网站A的请求链接，当受害者访问网站B时，会伪装为受害者向网站A发起请求。

XSS通常使用来窃取数据。

CSRF通常是修改服务器数据，因为浏览器同源策略。


XSS防御，白名单，编码

CSRF防御，token、 HTTP Referer、 XMLHTTPRequest header