##### CHROME 80版本以后，SAMESITE COOKIE验证跨站问题

今天启动本地测试环境，发现登录不成功。排查问题发现登录成功后，之后的请求没有携带cookie。然后我就仔细看了一下登录请求的参数。

发现在chorme header头的cookie里有一个黄色的小叹号，发现问题了。

this set-cookie didn't specify a "SameSite" attribute，然后变成默认Lax。(不能复制，懒得打英文了)

然后我搜索了一下Samesite定义，有三个值，None, Lax,Strict.这个参数是防止跨站攻击用的，因为测试环境，所以最方便就是跨站调试了。

然后我搜了一下flask源码，发现有这个设置，配置了一下发现不管用。然后放弃了。

找了一下怎么关闭chrome的这个选项，虽然别的网站可能有一点风险。自己调试的时候会方便点。

chrome://flags/#same-site-by-default-cookies

chrome://flags/#cookies-without-same-site-must-be-secure

这两项设置为Disabled，并重启浏览器

