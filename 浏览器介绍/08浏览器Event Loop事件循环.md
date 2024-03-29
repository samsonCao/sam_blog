### 浏览器 Event Loop 大致流程

##### 代码执行顺序

1. JavaScript 属于宏任务（主线程），自上往下执行，直到执行完。
2. 执行微任务，中途遇到微任务放入队列尾部，继续执行，直至清空。
3. 执行宏任务，中途遇到宏任务放入队列尾部，继续执行，直到清空。
4. 宏任务执行过程中遇到微任务，会执行微任务

### 宏任务和微任务区别和由来

- 采纳 JSC 引擎的术语，我们把宿主(我们开发者)发起的任务称为宏观任务，把 JavaScript 引擎发起的任务称为微观任务。

- ES6 新增的 Promise 让 JS 任务新增了一个概念：microtask---微任务
- 因此 JS 中分为两种任务类型：macrotask 和 microtask，在 ECMAScript 中，microtask 称为 jobs，macrotask 可称为 task

- macrotask（又称之为宏任务）
  可以理解是每次执行栈执行的代码就是一个宏任务（包括每次从事件队列中获取一个事件回调并放到执行栈中执行）
  每一个 task 会从头到尾将这个任务执行完毕，不会执行其它
  浏览器为了能够使得 JS 内部 task 与 DOM 任务能够有序的执行，会在一个 task 执行结束后，在下一个 task 执行开始前，对页面进行重新渲

```
  大致看起来是这个样子的
（`task->渲染->task->渲染...`）
```

- microtask（又称为微任务）
  可以理解是在当前 task 执行结束后立即执行的任务
  也就是说，在当前 task 任务后，下一个 task 之前，在渲染之前
  所以它的响应速度相比 setTimeout（setTimeout 是 task）会更快，因为无需等渲染
  也就是说，在某一个 macrotask 执行完后，就会将在它执行期间产生的所有 microtask 都执行完毕

- 宏任务和微任务场景区分
  - macrotask 宏任务：script 主代码块，setTimeout，setInterval 等（事件队列中的每一个事件都是一个宏任务）
  - microtask 微任务：Promise，准确的说是 Promise.resolve().then()产生了微任务。process.nextTick 等
  - 在 node 环境下，process.nextTick 的优先级高于 Promise\_\_，也就是可以简单理解为：
    在宏任务结束后会先执行微任务队列中的 nextTickQueue 部分，然后才会执行微任务中的 Promise 部分

---

### 重点解释 Promise 和 setTimeout 产生宏任务和微任务的原因

因为 Promise 产生的是 JavaScript 引擎内部的微任务，

而 setTimeout 是浏览器 API，它产生宏任务。

---

总结下运行机制：

执行一个宏任务（栈中没有就从事件队列中获取）
执行过程中如果遇到微任务，就将它添加到微任务的任务队列中
宏任务执行完毕后，且 js 执行栈中为空，立即执行当前微任务队列中的所有微任务（依次执行）
当前宏任务执行完毕，开始检查渲染，然后 GUI 线程接管渲染
渲染完毕后，JS 线程继续接管，开始下一个宏任务（从事件队列中获取）

```javascript
大致看起来是这个样子的
（`整体代码script--->微任务如Promises(如果有)---渲染UI--->宏任务如setTimeout--->微任务如Promises(如果有)--->渲染UI...`）
```

学完上面的知识，来做一个简单的练习题吧

```javascript
//  尝试说出下面的输出顺序
setTimeout(function () {
  console.log("1");
});

new Promise(function (resolve) {
  console.log("2");
  resolve();
}).then(function () {
  console.log("3");
});

console.log("4");
```

正确答案： 2、4、3、1
过程解析

- 程序自上而下执行
- setTimeout 是宏任务，放入宏任务队列
- Promise 中的函数在主线程中，执行，输出 2
- Promise 的 then 是微任务，放入微任务队列
- console.log('4')在主线程中，输出 4
- 主线程执行完
- 去微任务队列中找有没有任务，找到 then 执行，输出 3
- 继续找微任务队列，没有微任务了，去找宏任务
- 找到宏任务 setTimeout 执行，输出 1 -继续找宏任务，没有宏任务了，程序终止

###### 再来看一个例子

```javascript
console.log("1"); // 1

Promise.resolve().then(() => console.log("2")); // 2

setTimeout(() => {
  console.log("3");
  Promise.resolve().then(() => console.log("4")); // 7
}, 0); // 3

Promise.resolve().then(() => console.log("5")); // 4

setTimeout(() => console.log("6"), 0); // 5

console.log("7"); // 6
```

正确答案： 1 7 2 5 3 4 6
过程解析

- 程序自上而下执行
- 1 主线程 console.log(1)---------------输出 1
- 2Promise 是微任务，放入微任务队列
- 3setTimeout 是宏任务，放入宏任务队列
- 4Promise 是微任务，放入微任务队列
- 5setTimeout 是宏任务，放入宏任务队列
- 6 主线程 console.log(7)--------------- 输出 7
- JS 主线程执行完毕
- 查找为微任务，找到 2、4
- 执行 2Promise --------------- 输出 2
- 执行 4Promise --------------- 输出 5
- 微任务执行完，去宏任务栈找宏任务
- 找到宏任务 3、5
- 执行宏任务 3 --------------- 输出 3
- 3 中有微任务 7，把 7 放入微任务队列
- 当前 3 宏任务执行完，去微任务队列中看有没有微任务，找到微任务 7
- 执行微任务 7 --------------- 输出 4
- 查看没有其它微任务，去找宏任务，找到宏任务 5
- 执行宏任务 5 --------------- 输出 6
- 再去找微任务，没有微任务
- 继续找宏任务，没有宏任务了，程序终止

### 通过一系列的实验，我们可以总结一下如何分析异步执行的顺序：

1. 首先我们分析有多少个宏任务；
2. 在每个宏任务中，分析有多少个微任务；
3. 根据调用次序，确定宏任务中的微任务执行次序；
4. 根据宏任务的触发规则和调用次序，确定宏任务的执行次序；
5. 确定整个顺序。

#### 写一个红路灯功能,我们现在要实现一个红绿灯，把一个圆形 div 按照绿色 3 秒，黄色 1 秒，红色 2 秒循环改变背景色，

```javascript
function sleep(duration) {
  return new Promise(function (resolve) {
    setTimeout(resolve, duration);
  });
}
async function changeColor(duration, color) {
  document.getElementById("traffic-light").style.background = color;
  await sleep(duration);
}
async function main() {
  while (true) {
    await changeColor(3000, "green");
    await changeColor(1000, "yellow");
    await changeColor(2000, "red");
  }
}
main();
```

async 函数返回一个 Promise 对象，可以使用 then 方法添加回调函数。当函数执行的时候，一旦遇到 await 就会先返回，等到异步操作完成，再接着执行函数体内后面的语句。

补充一下队列任务优先级：promise.Trick()>promise 的回调>async>setTimeout>setImmediate

参考： https://segmentfault.com/a/1190000012925872
参考： https://segmentfault.com/a/1190000018316444?utm_source=tag-newest
