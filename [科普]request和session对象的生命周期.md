








#### 1. 生命周期

###### 1.1 session

> Session存储在服务器端，一般放置在服务器的内存中（为了高速存取），
Sessinon在用户第一次访问服务器时创建，需要注意只有访问JSP、Servlet等程序时才会创建Session，
只访问HTML、IMAGE等静态资源并不会创建Session，可调用request.getSession(true)强制生成Session。


- Session创建:在你打开一个浏览器开始访问的时候，就创建了。子窗口会共用父窗口的Session

- Session关闭
    - 他在你关闭浏览器的时候或者默认时间（Tomcat是20分钟）后会销毁。
    - 或者调用Session的invalidate方法


###### 1.2 request


- Request创建:是在页面向服务端发送一个请求时候，就产生了。这里就把servlet当作服务端

- Request关闭:有两种情况：
  
    - 使用了dispatcher把上级的request转给了下一个队员，这里request是传递的，还没被销毁。
    
    - 使用了重定向sendredirect，request直接销毁了。打开下一个页面的是一个新的request。



























首先我们要明白的一点那就是这个2个对象都是服务器自己创建的，
他们的生命范围也是开始于用户发送的一次请求到后台开始，
结束于用户最终得到后台的反馈为止，

1. 服务器在接收到客户端的请求之后，会创建request对象和response对象

2. 服务器会通过request对象把客户的数据，包括请求信息都封装到这个对象里面

3. 所以我们在控制层，servlet里面就是service方法里面通过request得到很多数据，并对信息进行相应的业务处理，最后反馈给用户结果

4. 这个结果我们是通过response来封装的，并带到用户面前

5. 当这整个过程结束之后，request和response对象的周期也就结束了，他们的生命范围就是用户的一次请求和得到的一次结果的反馈。


