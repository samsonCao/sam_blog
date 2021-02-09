- express版本 4.17.1
- koa版本 2.13.1


- express核心文件
    - lib/
        - middleware/ 两个中间件
            - init.js 初始化req和res。req.__proto__ = app.request; res.__proto__ = app.response
            - query.js  处理url的query.调用了 parseUrl(req).query，req.query = queryparse(val, opts)
        - router/
            - index.js
            - layer.js
                - Layer 设置 this.handle = fn, this.name= fn.name, this.params this.path this.regexp 
                - Layer.handle_error,获取fn fn = this.handle, 执行错误 fn(err, req, res, next)
                - Layer.handle_request, 获取fn fn = this.handle,执行fn(req, res, next)
                - Layer.match(path),判断路径path是否匹配 返回true false
            - route.js
                - Route(path) => this.stack = path; this.stack = []; this.method = {}
                - Route._handles_method，判断是否有当前的method 返回true false
                - Route._options 支持http方法，小写转大写(例：get->GET)，并增加head方法。
                - Route.dispatch, 让req res指向当前route，并触发 Layer.handle_request
                - Route.all，把参数全部push进stack，
        - application.js
            - app.init初始化
                - this.cache = {}
                - this.engines = {}
                - this.enable(x-powered-by)
                - this.set-> etag,env,query parser,subdomain offset,trust proxy,view, views,jsonp callback name,
                - this.request -> parent.request,
                - this.response -> parent.response,
                - this.engines -> parent.engines,
                - this.response -> parent.response,
                - this.settings -> parent.settings,
                - this.local = Object.create(null)
            - app.lazyrouter 惰性地添加基础路由器(如果还没有添加的话)
            - app.handle -> this._router.handle(req, res, done),将一个请求分派的对应的req和res中，管道式处理。
            - app.use 代理' Router#use() '添加中间件到应用的路由器。
        - express.js
            - createApplication 实例化app 添加request,添加response, 执行app.init初始化
        - request.js
        - response.js
        - util.js
        - view.js
        
- koa核心文件
    - lib/
        - application.js
        - context.js
        - request.js
        - response.js
        
  
#### express和koa2区别
##### 1. Handle处理方式
###### express
Express 使用普通的回调函数，一种线性的逻辑，在同一个线程上完成所有的 HTTP 请求，
Express 中一种不能容忍的是 Callback，特别是对错捕获处理起来很不友好，
每一个回调都拥有一个新的调用栈，因此你没法对一个 callback 做 try catch 捕获，
你需要在 Callback 里做错误捕获，然后一层一层向外传递。
###### koa
Koa2 这个现在是 Koa 的默认版本，与 Koa1 最大的区别是使用 ES7 的 Async/Await 
替换了原来的 Generator + co 的模式，也无需引入第三方库，底层原生支持，
Async/Await 现在也称为 JS 异步的终极解决方案。
Koa 使用的是一个洋葱模型，它的一个特点是级联，通过 await next() 
控制调用 “下游” 中间件，直到 “下游” 没有中间件且堆栈执行完毕，
最终在流回 “上游” 中间件。这种方式有个优点特别是对于日志记录（请求->响应耗时统计）、
错误处理支持都很完美。
因为其背靠 Promise，Async/Await 只是一个语法糖，
因为 Promise 是一种链式调用，当多个 then 链式调用中你无法提前中断，
要么继续像下传递，要么 catch 抛出一个错误。对应到 Koa 这个框架也是你只能通过 await next() 
来控制是否像下流转，或者抛出一个错误，无法提前终止。
##### 2. 中间件实现机制
###### express
express中间件是线性的，类似嵌套的回调地狱，
Express 中间件实现是基于 Callback 回调函数同步的，
如果中间件遇到await它不会去等待异步（Promise）完成，
初始化时主要通过 proto.use 方法将中间件挂载到自身的 stack 数组中。
###### koa
express中间件是洋葱模型，类似一个洋葱，从第一层到最后一层，再从最后一层返回第一层。
Koa （>=v7.6）默认支持 Async/Await，在 Koa 中多个异步中间件进行组合，
其中一个最核心的实现是 koa-compse 这个组件。
每一个中间件会被转为promise，遇到await next会指向下一个中间件。
当所有中间件执行完毕，栈调用结束，会执行 Promise.resolve()，
代表当前中间执行完，之前执行的函数会一个个出栈。执行顺序是 1 2 3 -> 3 2 1

##### 3. 响应机制
###### express
在 Express 中我们直接操作的是 res 对象，在 Koa 中是 ctx，直接
 res.send() 之后就立即响应了，这样如果还想在上层中间件做一些操作是有点难的
###### koa
在 Koa 中数据的响应是通过 ctx.body 进行设置，注意这里仅是设置并没有立即响应，
而是在所有的中间件结束之后做了响应
这样做一个好处是我们在响应之前是有一些预留操作空间的


参考  
多维度分析 Express、Koa 之间的区别  https://www.yuque.com/jarvis-zzzhw/frontend/sgaw6q  
koa中间件分析  https://www.yuque.com/yikeludan/ft4q9d/ak3k79  
koa源码分析  https://www.yuque.com/jianxu/study/lm5dlc   
koa源码分析  https://www.yuque.com/xixia-ujstx/ziur46/suggls

   
