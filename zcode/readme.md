实现一个节流函数? 如果想要最后一次必须执行的话怎么实现?

实现一个批量请求函数, 能够限制并发量?

数组转树结构, 数组转树, 写完后问如果要在树中新增节点或者删除节点, 函数应该怎么扩展

```js
const arr = [
  {
    id: 2,
    name: "部门B",
    parentId: 0,
  },
  {
    id: 3,
    name: "部门C",
    parentId: 1,
  },
  {
    id: 1,
    name: "部门A",
    parentId: 2,
  },
  {
    id: 4,
    name: "部门D",
    parentId: 1,
  },
  {
    id: 5,
    name: "部门E",
    parentId: 2,
  },
  {
    id: 6,
    name: "部门F",
    parentId: 3,
  },
  {
    id: 7,
    name: "部门G",
    parentId: 2,
  },
  {
    id: 8,
    name: "部门H",
    parentId: 4,
  },
];
```

去除字符串中出现次数最少的字符，不改变原字符串的顺序。

```
“ababac” —— “ababa”
“aaabbbcceeff” —— “aaabbb”
```

写出一个函数 trans，将数字转换成汉语的输出，输入为不超过 10000 亿的数字。

```
trans(123456) —— 十二万三千四百五十六
trans（100010001）—— 一亿零一万零一
```

代码输出顺序

```js
async function async1() {
  console.log("async1 start");
  await async2();
  console.log("async1 end");
}
async function async2() {
  console.log("async2");
}
console.log("script start");
setTimeout(function () {
  console.log("setTimeout");
}, 0);
async1();
new Promise(function (resolve) {
  console.log("promise1");
  resolve();
  console.log("promise2");
}).then(function () {
  console.log("promise3");
});
console.log("script end");
```

代码输出顺序

```js
async function async1() {
  console.log("1");
  await async2();
  console.log("2");
}

async function async2() {
  console.log("3");
}

console.log("4");

setTimeout(function () {
  console.log("5");
}, 0);

async1();

new Promise(function (resolve) {
  console.log("6");
  resolve();
}).then(function () {
  console.log("7");
});

console.log("8");
```

```js
setTimeout(function () {
  console.log(1);
}, 100);

new Promise(function (resolve) {
  console.log(2);
  resolve();
  console.log(3);
}).then(function () {
  console.log(4);
  new Promise((resove, reject) => {
    console.log(5);
    setTimeout(() => {
      console.log(6);
    }, 10);
  });
});
console.log(7);
console.log(8);
```

输出顺序

```js
function Foo() {
  Foo.a = function () {
    console.log(1);
  };
  this.a = function () {
    console.log(2);
  };
}

Foo.prototype.a = function () {
  console.log(3);
};

Foo.a = function () {
  console.log(4);
};

Foo.a();
let obj = new Foo();
obj.a();
Foo.a();
```

给几个数组, 可以通过数值找到对应的数组名称

```js
// 比如这个函数输入一个1，那么要求函数返回A
const A = [1, 2, 3];
const B = [4, 5, 6];
const C = [7, 8, 9];

function test(num) {}
```

两个字符串对比, 得出结论都做了什么操作, 比如插入或者删除

```js
pre = "abcde123";
now = "1abc123";

a前面插入了1, c后面删除了de;
```

sleep 函数
节流防抖

输出为什么

```js
var b = 10;
(function b() {
  b = 20;
  console.log(b);
})();
```

ES5 和 ES6 的继承? 这两种方式除了写法, 还有其他区别吗?

实现一个 EventEmitter

使用 Promise 实现一个异步流量控制的函数, 比如一共 10 个请求, 每个请求的快慢不同, 最多同时 3 个请求发出, 快的一个请求返回后, 就从剩下的 7 个请求里再找一个放进请求池里, 如此循环。

给一个字符串, 找到第一个不重复的字符，时间复杂度是多少?
ababcbdsa
abcdefg

实现 compose 函数, 类似于 koa 的中间件洋葱模型

```js
// 题目需求

let middleware = [];
middleware.push((next) => {
  console.log(1);
  next();
  console.log(1.1);
});
middleware.push((next) => {
  console.log(2);
  next();
  console.log(2.1);
});
middleware.push((next) => {
  console.log(3);
  next();
  console.log(3.1);
});

let fn = compose(middleware);
fn();

/*
1
2
3
3.1
2.1
1.1
*/

//实现compose函数
function compose(middlewares) {}
```

遇到退格字符就删除前面的字符, 遇到两个退格就删除两个字符

```js
// 比较含有退格的字符串，"<-"代表退格键，"<"和"-"均为正常字符
// 输入："a<-b<-", "c<-d<-"，结果：true，解释：都为""
// 输入："<-<-ab<-", "<-<-<-<-a"，结果：true，解释：都为"a"
// 输入："<-<ab<-c", "<<-<a<-<-c"，结果：false，解释："<ac" !== "c"

function fn(str1, str2) {}
```

```js
var name = "123";

var obj = {
  name: "456",
  print: function () {
    function a() {
      console.log(this.name);
    }
    a();
  },
};

obj.print(); // 123
```

实现一个函数, 可以间隔输出

```js
function createRepeat(fn, repeat, interval) {}

const fn = createRepeat(console.log, 3, 4);

fn("helloWorld"); // 每4秒输出一次helloWorld, 输出3次
```

深拷贝,需要手写一个深拷贝函数 deepClone，输入可以是任意 JS 数据类型

```js
const deepClone = (obj, m) => {};
```

好多请求, 耗时不同, 按照顺序输出, 尽可能保证快, 写一个函数.

```js
const promiseList = [
  new Promise((resolve) => {
    setTimeout(() => {
      resolve(3)
    }, 3000);
  }),
  new Promise((resolve) => {
    setTimeout(() => {
      resolve(2)
    }, 2000);
  }),
  new Promise((resolve) => {
    setTimeout(()=> {
      resolve(1)
    },  1000);
  }),
];

fn(promiseList);
```

一个数组的全排列

```js
输入一个数组 arr = [1,2,3]
输出全排列

[[1], [2], [3], [1, 2], [1, 3], ...., [1,2,3], [1,2,4] ....]
```

虚拟 dom 转真实 dom

```js
const vnode = {
  tag: "DIV",
  attrs: {
    id: "app",
  },
  children: [
    {
      tag: "SPAN",
      children: [
        {
          tag: "A",
          children: [],
        },
      ],
    },
    {
      tag: "SPAN",
      children: [
        {
          tag: "A",
          children: [],
        },
        {
          tag: "A",
          children: [],
        },
      ],
    },
  ],
};

function render(vnode) {}
```


call 基于 this 实现
apply 基于 this 实现
bind
compose
节流
防抖
深拷贝
函数科里化curry
观察者模式
发布订阅模式 EventEmitter
jsonp
Object.assign
解析url的参数对象
格式化数字每三位加逗号
数组去重
new
ES5实现类继承
任务调度 Scheduler
请求重试装饰器函数

https://juejin.cn/post/7142690757722243102?share_token=255a3067-2255-4469-ab75-09478994216a#heading-39
