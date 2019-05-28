#### ajax、axios、fetch

- jquery ajax是使用最多的一种方式，问题是jQuery文件太大，react中单纯的使用ajax就引入jquery不太合理

- Axios 是一个基于promise的HTTP库，可以用在浏览器和node.js中。简单易用，功能强大。兼容性方面要低于jQuery的ajax，支持ie9以上。提供了很多并发请求的接口，方便了很多。

- fetch更加底层，写法很方便，缺点是只对网络请求报错，对400，500都当作成功的请求，需要封装处理。

#### 综上考虑使用axios更好一些。
