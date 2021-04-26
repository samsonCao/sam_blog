/**
 * 冒泡排序
 * 原理：每循环一次，都会找出最大的放在最后一位
 * 第一次循环，找出最大的一的，放在最后一位
 * 第二次循环，找出剩下的最大的，放在倒数第二位
 * 第三次循环，找出剩下的最大的，放在倒数第三位
 * 直到最后一个最大的值在第一位
 * [12, 8, 24, 16, 1]
 * [8, 12, 16, 1, 24] // 第1轮，比较 5 - 1 次，每次都从0开始，j=0;
 * [8, 12, 1, 16, 24] // 第2轮，比较 5 - 1 - 1次，每次都从0开始，j=0;
 * [8, 1, 12, 16, 24] // 第3轮，比较 5 - 1 - 2次，每次都从0开始，j=0;
 * [1, 8, 12, 16, 24] // 第4轮，比较 5- 1 - 3次，每次都从0开始，j=0;
 */
function bubble(ary) {
  // 外层循环i控制比较的轮数，2个值比1轮，3个值比2轮，length-1
  for (let i = 0; i < ary.length - 1; i++) {
    // 内层循环控制每一轮比较的次数。
    // 每一轮比较后，最后一个一定是最大，因此比较  ary.length - 1 - i
    for(let j = 0; j < ary.length - 1 - i; j++) {
      // 如果前一项比后一项大，前一项和后一项交换位置
      if (ary[j] > ary[j+1]) {
        // 交换位置
        [ary[j+1], ary[j]] = [ary[j], ary[j+1]]
      }
    }
  }
  return ary;
}
// let ary = [12, 8, 24, 16, 1];
// console.log(bubble(ary));


/**
 * 插入排序
 * 类似抓牌，每次抓一张牌，和手里的牌比较，按大小顺序插入手中合适的位置
 * [12, 8, 24, 16, 1]
 * 第1次抓拍，从前往后 [12] 比0次
 * 第2次抓拍，从前往后 8 和 [12] 比较 [8, 12] 比1次
 * 第3次抓拍，从前往后 24 和 [8，12] 比较 [8, 12，24] 比2次，比到到的break
 * 第4次抓拍，从前往后 16 和 [8，12，24] 比较 [8，12，16，24] 比3次，比到到的break
 * 第5次抓拍，从前往后 1 和 [8，12，16，24] 比较 [1，8，12，16，24] 比4次，比到到的break
 */
function insert (ary) {
  // 准备一个新数组，放抓到的牌，先放一张牌进去
  const handle = [];
  handle.push(ary[0]);

  // 从第二项开始依次抓牌，一直把牌抓完
  for (let i = 1; i < ary.length; i++) {
    // A 是新抓的牌
    const tempA = ary[i];
    // 和handle手里的牌比较，从后向前比
    for (let j = handle.length; j >= 0; j--) {
      // 每一次要比较的牌
      const tempB = handle[j];
      // 抓到的牌大于这一次比较的牌，放在这一次比较的牌的后面 即 j + 1;
      if (tempA > tempB) {
        // 放在当前牌后面，j+1, 删除0个，插入手里的牌tempA
        handle.splice(j + 1, 0, tempA);
        break;
      }
      if (j === 0) {
        // 开头插入
        handle.unshift(tempA);
      }
    }
  }
  return handle;
}

// let ary = [12, 8, 24, 16, 1];
// console.log(insert(ary));

/**
 * 快速排序--用到了递归思想，和分治思想
 *
 * 第一步，找出数组的中间项目middleValue，向下取整和向上取整都可以，
 * 第二步，从原数组中把这一项移除
 * 第三步，创建两个新数组，左数组和又数组，备用
 * 第四步，遍历剩下的数组的值，比中间项小的放在左数组，比中间项大的放在又数组
 * 第五步，合并，小数组 + 中间项 + 大数组
 * 第六步，递归，继续拆分小数组和大数组，重复第一步到第五步
 * 第七步，判断生成的左数组和右数组小于等于1项时，结束递归，返回数组
 *
 * [12,8,15,16,1,24]
 * 找中间15，生产新数组 [12,8,16,1,24]，创建两个新数组
 * 遍历新数组，比15大的放右边，比15小的放左边
 * [12,8,1] [16,24] 15 => [[12,8,1], 15, [16,24]]
 * 递归处理[12,8,1]
 * 8 [12, 1] => [1] 8 [12] => [[1], 8, [12]]
 * 递归处理[16,24]
 * 16 [24] => [] 16 [24] => [[], 16, [24]]
 * 最后concat， concat的值必然是数组内只有一项的值，或者是空数组0项
 */
function quick(ary) {
  // 结束递归的条件，数组只有1项，或者数组是0项
  if (ary.length <= 1) {
    return ary;
  }
  // 找到中间项的下标
  const middleIndex = Math.floor(ary.length / 2);
  // 从原数组中删除中间项，并且获取中间项的值
  const middleValue = ary.splice(middleIndex, 1)[0];

  const aryLeft = [];
  const aryRight = [];
  for (let i = 0; i < ary.length; i++) {
    let item = ary[i];
    // 大的放右边数组，小的放左边数组
    item > middleValue ? aryRight.push(item) : aryLeft.push(item);
  }
  // 左边+中间+右边。
  // 返回 值类型ary时 结束递归，出栈拼接。
  // 返回 函数类型执行体时，继续执行递归调用，暂存拼接逻辑
  return quick(aryLeft).concat(middleValue, quick(aryRight))
}
// let ary = [12,8,15,16,1,24];
// console.log(quick(ary));

/**
 * 选择排序
 * n个选出最小，放在第一位，第一位挪到原来最小的那个位置
 * n-1个选最小，放在第二位，第二位挪到原来最小的那个位置
 * 依次类推
 *
 * 原理：从数组中找到最小的，放在数组的起始位置，再找出第二小的放在第二个位置
 * 起始也是每次找出最小的放前面，和冒泡排序结果类似，冒泡是每次找到最大的放后面。
 * 过程不一样，
 * 冒泡排序是相邻的两两对比，然后依次交换位置，直到最大的排最后； 比较到一行最小才交换
 * 选择排序是从所有的找最小的，直接放在第一个位置，只有找够一轮才交换
 *
 * 先把第0项默认为最小值，和后面的所有项对比
 * 第一次从length -1找到最小的，和第0项交换，此时第0项最小
 * 第二次找到剩下length -1 - 1找到最小的，和第1项交换，此时第0，1项最小
 * 第3次找到剩下length -1 - 1 - 1找到最小的，和第2项交换，此时第0，1， 2项最小
 * 中间的某一次交换，肯定会把最大的交换到最后一个位置，因此只需length -1 次外层循环
 *
 * 内层循环排好序的不需再对比，因此是从第 i+1项开始对比
 */
function select(ary) {
  let minIndex;
  let temp;
  // 中间会有一次自动把最大值换到最后一个位置的过程，所以是length - 1 次。
  for(let i = 0; i < ary.length - 1; i++) {
    // 初始化假定i=0为最小值
    minIndex = i;

    // 遍历i后面的所有项，因为i不用和自身比
    for (let j = i+ 1; j < ary.length; j++) {

      // 获取上一次比较的最小值minValue
      const minValue = ary[minIndex];
      // 获取当前项的值
      const currentValue = ary[j];

      // 上一次的minValue和这一次的所有项比较，找出最小值
      if (currentValue < minValue) {
        minIndex = j;
        // 因为是找所有项的最小，不是找第1次出现的最小项
        // 所以此处不能break,只能每次都是从头找到尾
      }
    }
    // minIndex  换到 i位置去;
    // 把最小值存到temp
    temp = ary[minIndex];
    // 把当前i的大值赋给最小值的位置
    ary[minIndex] = ary[i];
    // 再把最小值放到当前i的位置
    ary[i] = temp;
  }
  return ary;
}

let ary = [12,8,15,16,1,24];
console.log(select(ary));

// 递归求和,递归有两种return，一种返回值，一种返回表达式。
// 返回表达式是入栈的操作，会暂存。
// 返回值时表示入栈结束了，要出栈，完成表达式的计算。
function sumAll(n) {
  if (n <= 1) {
    return 1;
  }
  return n + sumAll(n - 1)
}
// console.log(sumAll(10))

// 实现call => func.call(objB, arg1, arg2, arg3)
Function.prototype.myCall = function (context) {
  // 劫持的作用域
  const currentContext = context || window;
  // 当前执行的函数fn,因为this是执行时的函数作用域
  currentContext.fn = this;
  // 函数fn的参数
  const args = [...arguments].slice(1);
  // 调用函数
  const result = currentContext.fn(...args);
  delete currentContext.fn;
  return result;
};

// 实现apply => func.apply(objB, args)
Function.prototype.myApply = function (context) {
  const currentContext = context || window;
  let result;
  // this就是实际执行的函数，赋值给fn,最终执行fn
  currentContext.fn = this;
  // 有参数传参执行，没参数，直接执行
  if (arguments[1]) {
    result = context.fn(...arguments[1]);
  } else {
    result = context.fn();
  }
  delete currentContext.fn;
  return result;
};

// 实现bind => func.bind(objB, args)
Function.prototype.myBind = function (context) {
  // 当前执行的函数fn,因为this是执行时的函数作用域
  const fn = this;
  // 获取除context以外的所有参数，bind执行时的args参数
  const args = [...arguments].slice(1);
  return function Fn() {
    // 函数func具体执行时的参数 arguments
    const funcArgs = args.concat(...arguments);
    return fn.apply(context, funcArgs)
  }
};

// 实现一个new => var person = myNew(Person,'xiaoming',18)
function myNew() {
  //获取所有参数[].slice.call(arguments), 也可用Array.from
  const allArgs = Array.from(arguments);
  const thatFunc = allArgs.shift(); // 获取构造函数，此处是Person
  if (typeof thatFunc !== "function") {
    throw new Error("should be function");
  }
  const obj = {};
  // 实例指向了Person构造函数的原型，返回实例
  obj.__proto__ = thatFunc.prototype;
  thatFunc.apply(obj, allArgs);
  return obj;
}

// 实现一个create函数，是一个干净的对象，没有prototype toString等方法
// Object.create(proto，[propertiesObject])
function create(obj, propertiesObject) {
  function F() {};
  F.prototype = obj;
  // new完之后返回对象字面量{},
  // objF.__proto__ = F.prototype = obj
  const objF = new F();
  Object.defineProperties(objF, propertiesObject);
  return objF;
}

// 实现一个instance_of => 实例的__proto__ 可以指向 构造函数的prototype
function instance_of(left, right) {
  left = Object.getPrototypeOf(left);
  while(true) {
    if (left == null) {
      return false;
    } else if (left === right.prototype) {
      return true
    } else {
      // 即left.__proto__.__proto__.__proto__...
      left = Object.getPrototypeOf(left);
    }
  }
}

// 实现JSON.stringify 忽略 实现定时器忽略

// 实现数组的 reduce 方法 => reduce(func(prev, item, index, ary), initValue);
Array.prototype.myReduce = function(callback) {
  console.log(this, 'this是要被处理的数组');
  // 格式化传入的值，null, undefined时返回空对象
  const formatObj = Object(this);
  // 非数字转为0，如 undefined ||null 'string' >>> 0 => 0
  const length = formatObj.length >>> 0;
  let index = 0; // 下标从0开始
  let value; // 计算的值
  if (arguments.length >= 2) {
    value = arguments[1]; // 有第二个参数时，第二个参数为初始值
  } else {
    // index不合法时的特殊处理，直到index是formatObj的成员
    while (index < length && !(index in formatObj)) {
      index++;
    }
    // 没有第二个参数时，第一个值设置为初始值
    // 并让index + 1，然后传给下面的while callback
    value = formatObj[index++];
  }
  while (index < length) {
    if (index in formatObj) {
      // 用while 重复调用callback执行callback,
      // 每次callback返回的value其实即为上一次的和prev
      value = callback(value, formatObj[index], index, formatObj)
    }
    index++;
  }
  return value;
}

// 手动实现数组map方法 a = [].map((item, index, arr) => {
//  return xxx
// })
function myMap(callback) {
  const newArr = [];
  const that = this;
  for(let i = 0; i < that.length; i++) {
    newArr.push(callback(that[i], i, that))
  }
  return newArr;
}

// 数组扁平化
const flatten = (list) => {
  return list.reduce((prevAry, item) => {
    return prevAry.concat(
      Array.isArray(item) ?
        flatten(item) : item
    );
  }, [])
};
// 数组扁平化2
const flatAry = (list) => {
  let res = [];
  for(let i = 0; i < list.length; i++) {
    if (Array.isArray(list[i])) {
      res = res.concat(flatAry(list[i]))
    } else {
      res.push(list[i])
    }
  }
  return res;
}

// 对象扁平化 { a.b.c = 1, m.n = 2 }
const objectFlat = (obj = {}) => {
  const res = {};
  function flat(item, preKey = '') {
    Object.entries(item).forEach(([key, value]) => {
      const newKey = preKey ? `${preKey}.${key}` : key;
      if (value && typeof value === 'object') {
        flat(value, newKey)
      } else {
        res[newKey] = value;
      }
    })
  }
  return res;
}

// 数组去重1 无法去重空对象{}
const unique1 = (list) => {
  return Array.from(new Set(list));
}
// 数组去重2 filter方法
const unique2 = (list) => {
  return list.filter((item, index, arr) => {
    console.log(arr.indexOf(item), index, item);
    // 当前这一项第一次出现在数组中的位置应该和index一致，
    // 如果不一致，说明当前item不是第一次出现，需要被删掉，返回false
    return arr.indexOf(item) === index;
  });
}
// 数组去重3 reduce方法
const unique3 = (list) => {
  return list.reduce((prev, cur) => {
    return prev.includes(cur) ? prev : prev.concat(cur)
  }, []);
};

// 函数组合 => f1(f2(f3(a))) => compose(f1, f2, f3)(a);
// compose 返回的是函数表达式   // return (...args) => f1(f2(f3(...args)))
function compose(...funcs) {
  if (funcs.length === 0) {
    return arg => arg
  }

  if (funcs.length === 1) {
    return funcs[0]
  }
  // 第一次 f1(f2)
  // 第二次，f1(f2)里面再嵌套b即f3() => f1(f2(f3(a)))
  return funcs.reduce((a, b) => {
    // 上一次的a(b(...args))值会作为下一次的...args值传进去叠加
    return (...args) => {
      // 1, 4 输出两次。
      // 因为return函数时，只存值执行过程
      // return 值时才作为参数传递，
      console.log(args)
      return a(b(...args))
    }
  })
}
const f1 = (a) => a + 1;
const f2 = (a) => a + 2;
const f3 = (a) => a + 3;
compose(f1, f2, f3)(1);  // => f1(f2(f3(1)))

// 函数柯里化 curry(sum)(1,2)(3,4)(5)
// 柯里化只是收集参数，收集的参数等于传入的fn的参数时就执行fn并返回执行的值
const curry = (fn, arr = []) => {
  // 实际执行函数sum的参数个数
  const len = fn.length;
  // 返回高阶函数,即curry(sum)每次执行后的函数
  // 所以接收的参数args为(1,2) 依次为(3,4),依次为(5)
  return function (...args) {
    // 收集递归保存的参数arr, 收集每次传进来的参数args.
    const concatValue = [...arr, ...args];
    if (concatValue.length < len) {
      // fn没变，一直都是sum，递归变的是参数，是个参数收集的过程
      return curry(fn, concatValue)
    } else {
      // 收集的参数个数等于fn的参数个数，执行fn,传参为收集的参数
      // 收集的参数concatValue最终为 1,2,3,4,5
      return fn(...concatValue);
    }
  }
}
const sum = (a,b,c,d,e) => a+b+c+d+e;
let r = curry(sum)(1,2)(3,4)(5);
console.log(r);

// 深拷贝
function deepClone(obj) {
  // 边界处理 regexp date
  if (obj instanceof RegExp) return new RegExp(obj);
  if (obj instanceof Date) return new Date(obj);
  // 结束的判断  null 非object 返回自身，如string number bool undefined
  if (obj == null || typeof obj !== 'object') return obj;

  // 处理对象 数组或者object, new 构造函数生产新数组或者对象
  const newObj = new obj.constructor();
  for(let key in obj) {
    if (obj.hasOwnProperty(key)) {
      newObj[key] = deepClone(obj[key])
    }
  }
  return newObj;
}

// 写一个延时执行的睡眠函数
const sleep = (n) => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve();
    }, n)
  })
};

// 防抖-- 事件触发n秒后再执行函数，n秒内再触发重新计算。
// 只执行最后一次触发的， 返回的是个函数
// dom.onmousemove = debounce(count, 1000)
function debounce(func, wait) {
  let timer;
  // debounce调用时执行返回的函数this指向调用的地方即this
  return function () {
    // 获取的是onmousemove的this
    const context = this;
    // 获取的是onmousemove的参数
    const args = arguments;
    // onmousemove时会高频触发return函数，每次都清空定时器
    // 只有最后一次的定时器被保留了，因此停了之后执行func
    clearTimeout(timer);
    timer = setTimeout(() => {
      // 把 onmousemove 的 this 指向func,
      // 把 onmousemove 的 arguments 给func
      func.apply(context, args)
    }, wait);
  }
}
// 节流--每次隔n秒执行一次，稀释执行的频率
// dom.onmousemove = debounce(count, 1000)
function throttle(func, wait) {
  let oldTime = 0;
  return function () {
    const context = this;
    const args = arguments;
    let now = new Date().valueOf();
    if (now - oldTime > wait) {
      func.apply(context, args);
      oldTime = now;
    }
  }
}
function throttle2(func, wait) {
  let timer;
  return function () {
    const context = this;
    const args = arguments;
    // 第一次触发，timer null 执行了
    // 再次触发，timer有值了，进不来。
    if (!timer) {
      // wait秒后，timer执行了，timer置为null,
      timer = setTimeout(() => {
        func.apply(context, args);
        timer = null;
      }, wait)
    }
  }
}

// 发布订阅模式 一对多。一个调度中心多个事件订阅或发布
class EventEmitter {
  constructor() {
    this.events = {};
  }
  // 实现订阅
  on(type, callBack) {
   if (!this.events[type]) {
     this.events[type] = [];
   }
   this.events[type].push(callBack)
  }
  // 实现触发
  emit(type, args) {
    if (this.events.type) {
      this.events[type].forEach(callBack => {
        callBack(args);
      })
    }
  }
  // 清除订阅的事件
  remove(type, callback) {
    if (!this.events.type) return;
    this.events[type] = this.events[type].filter(
      (item) => item !== callback)
  }
  removeAll(type) {
    if (this.events[type]) {
      this.events[type] = [];
    }
  }
}

// 手写ajax 可演化为promise形式的ajax
function ajax({method, url, data}) {
  let xhr = new XMLHttpRequest();
  xhr.open(method, url);
  xhr.send(data);
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      console.log(xhr.responseText);
    }
  }
}

// 手写promise
const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';
function myPromise(fn) {
  const self = this;
  self.state = PENDING;
  self.value = null;
  self.reason = null;
  self.onFulFilledCallbacks = [];
  self.onRejectedCallbacks = [];

  function resolve(value) {
    if (self.state === PENDING) {
      self.state = FULFILLED;
      self.value = value;
      // 具体执行的是 then中注册的resolve方法
      // const x = onFulfilled(self.value); => then方法的第一个函数
      // self.resolvePromise(promise2, x, resolve, reject) => 把x reject 出来
      self.onFulFilledCallbacks.forEach(fulfilledCallback => fulfilledCallback())
    }
  };

  function reject (reason) {
    if (self.state === PENDING) {
      self.state = REJECTED;
      self.reason = reason;
    }
    // 具体执行的是 then中注册的reject方法
    self.onRejectedCallbacks.forEach(rejectedCallback => rejectedCallback())
  };

  try {
    fn(resolve, reject);
    console.log(self,'s-promise')
  } catch (e) {
    reject(e)
  }
}

myPromise.prototype.then = function(onFulfilled, onRejected) {
  let self = this;
  let promise2 = null;
  console.log(self, 's2');

  // 如果then方法链式调用，非函数的，构造函数把上一个value往下传
  onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value;
  onRejected = typeof onRejected === 'function' ? onRejected : error => { throw error };

  promise2 = new myPromise((resolve, reject) => {
    // 注册过程 prise是微任务，所以 push进去的函数可以被setTimeout包裹，模拟微任务
    if (self.state === PENDING) {
      self.onFulFilledCallbacks.push(() => {
        queueMicrotask(() => {
          try {
            // 注册 then方法的第一个参数，入参是value,返回x。返回的值最终会被resolve出去
            const x = onFulfilled(self.value);
            // 此处是为了注册一个resolve或者resolve函数
            self.resolvePromise(promise2, x, resolve, reject)
          } catch (e) {
            reject(e)
          }
        })
      })
      self.onRejectedCallbacks.push(() => {
        queueMicrotask(() => {
          try {
            // 注册 then方法的第二个参数，入参是 reason,返回x
            const x = onRejected(self.reason);
            // 此处是为了注册一个resolve或者resolve函数
            self.resolvePromise(promise2, x, resolve, reject)
          } catch (e) {
            reject(e)
          }
        })
      })
    }

    // 执行x
    if (self.state === FULFILLED) {
      queueMicrotask(() => {
        try {
          // 执行 then方法的第1个参数，入参是value,返回x
          const x = onFulfilled(self.value);
          // 此处是为了注册一个resolve或者resolve函数
          self.resolvePromise(promise2, x, resolve, reject)
        } catch (e) {
          reject(e)
        }
      })
    }
    if (self.state === REJECTED) {
      queueMicrotask(() => {
        try {
          // 执行 then方法的第二个参数，入参是 reason,返回x
          const x = onRejected(self.reason);
          // 此处是为了注册一个resolve或者resolve函数
          self.resolvePromise(promise2, x, resolve, reject)
        } catch (e) {
          reject(e)
        }
      })
    }
  });
  return promise2;
};

myPromise.prototype.resolvePromise = function (promise2, x, resolve, reject) {
  let self = this;
  let called = false; // 防止多次调用

  if (promise2 === x ) {
    return reject(new TypeError('循环引用'))
  }

  const xType = Object.prototype.toString.call(x);

  if (x !== null && (xType === '[object Object]' || xType === '[object Function]')) {
    try {
      let then = x.then;
      // then是函数类型 循环调用then
      if (typeof then === 'function') {
        const res = (y) => {
          if (called) {
            return;
          }
          called = true;
          self.resolvePromise(promise2, y, resolve, reject)
        };
        const rej = (reason) => {
          if (called) {
            return;
          }
          called = true;
          reject(reason)
        };
        // 循环执行then方法传 。此处有循环调用，直到成功的类型为基本类型，然后resolve出去。
        then.call(x, res, rej)
      } else {
        if (called) {
          return;
        }
        called = true;
        // 非函数类型，说明结束了，直接resolve
        resolve(x)
      }
    } catch (e) {
      reject(e)
    }
  } else {
    // 普通值，直接抛出去
    resolve(x)
  }
}

// 寄生组合式继承
function Parent(name) {
  this.name = name;
}
function Child (name, age) {
  // 借用父类的构造函数继承父类属性
  Parent.call(this, name);
  this.age = age;
}
// 原型链继承来继承方法
function InheritProperty(child, parent) {
  const middleType = Object.create(parent.prototype); //创建对象
  middleType.constructor = child;  //增强对象
  child.prototype = middleType; //指定对象
}
InheritProperty(Child, Parent);

// 模拟实现es6的 extend
function myExtend(child, parent) {
  child.prototype = Object.create(parent.prototype, {
    constructor:  {
      value: child,
      enumerable: false,
      writable: true,
      configurable: true,
    }
  })
  child.__proto__ = parent;
}

// 为数字添加分号
function formatMoney(num) {
  const numList = String(num).split('.');
  const listFirst = numList[0].split('').reverse();
  const tempFirst = [];
  if (listFirst) {
    // 12345 => [5,4,3,2,1]
    listFirst.forEach((item, index) => {
      if (index % 3 === 0 && index !== 0) {
        tempFirst.push(',')
      }
      tempFirst.push(item)
    })
    tempFirst.reverse();
  }
  if (numList[1].length) {
    return tempFirst.join('').concat('.', numList[1])
  } else {
    return tempFirst.join('')
  }
}

// 数字转人民币符号分隔
function format2(num) {
  // 第一个replace获取.之前的数字，第二个replace后向断言会回溯，从后向前数3个加,
  return num.toString().replace(/\d/, function (res1) {
    return res1.replace(/(?=(\d{3})+$)/g, function ($1) {
      return $1 + ','
    })
  })
}

// 判断一个字符串出现的最多次数
function getMaxCountString(str) {
  const list = str.split('');
  const tempObject = {};
  list.map(item => {
    if (!tempObject[item]) {
      tempObject[item] = 1;
    } else {
      tempObject[item] = tempObject[item] + 1;
    }
  })
  let num = 0;
  let resKey = null;
  for (let key in tempObject) {
    if (tempObject[key] > num) {
      num = tempObject[key];
      resKey = key;
    }
  }
  return resKey + '出现了:' +num + '次';
}

// 统计出现次数最多的数组里面的数字
function getMaxCountFormArray(list) {
  const temp = {};
  let numMax = 1;
  let itemMax = '';
  for(let i = 0; i < list.length; i++) {
    const value = list[i];
    if (!temp[value]) {
      temp[value] = 1;
    } else {
      temp[value]++;
    }
    if (numMax < temp[value]) {
      numMax = temp[value];
      itemMax = value;
    }
  }
  if (!itemMax) {
    return  '没有最多出现次数的值'
  }
  return itemMax + '出现了:' +numMax + '次';
}

// 手写一个js的数据结构Map
class MyMap {
  constructor() {
    this.size = 0;
    this.data = {};
  }
  set(key, value) {
    this.data[key] = value;
    this.size = this.size + 1;
  }
  get(key) {
    return this.data[key]
  }
  size() {
    return this.size;
  }
  has(key) {
    if (this.data[key]) {
      return true;
    }
    return false;
  }
  delete(key) {
    delete this.data[key];
    this.size = this.size - 1;
  }
  clear() {
    this.data = {};
    this.size = 0;
  }
}

// 数组的随机排序
function randomList(list) {
  const result = [];
  while (list.length > 0) {
    const randomIndex = Math.floor(Math.random() * list.length);
    result.push(list[randomIndex]);
    list.splice(randomIndex, 1);
  }
  return result;
}

// 实现一个深度优先
const node = {
  key: 1,
  children: [
    {
      key: 2,
      children: [
        {
          key: 3,
          children: []
        },
        {
          key: 4,
          children: []
        }
      ]
    },
    {
      key: 5,
      children: [
        {
          key: 6,
          children: []
        },
        {
          key: 7,
          children: []
        }
      ]
    }
  ]
}

// 广度优先
function BFS(node) {
  const list = [node];
  while (list.length > 0) {
    // 正序压栈，从栈底出。
    // [1] => 出1
    // [5,2] => 出2
    // [4,3,5] => 出5
    // [7,6,4,3] => 出3
    // [7,6,4] => 出4
    // [7,6] => 出6
    // [7] => 出7
    const currentNode = list.shift();
    if (currentNode.children) {
      for(let i = 0; i < currentNode.children.length; i++) {
        // 正向压栈
        list.push(currentNode.children[i]);
      }
    }
  }
}

// 深度优先
function DFS(node) {
  const list = [node];
  while (list.length > 0) {
    // 反序压栈，从栈顶出
    // [1] => 出1
    // [2,5] => 出2
    // [3,4,5] => 出3
    // [4,5] => 出4
    // [5] => 出5
    // [6,7] => 出6
    // [7] => 出7
    const currentNode = list.pop();
    if (currentNode.children) {
      for(let i = currentNode.children.length - 1; i >= 0; i--) {
        // 反向压栈
        list.push(currentNode.children[i])
      }
    }
  }
}

function DFSLoop(node) {
  const list = [];
  if (!node.children) {
    list.push(node.key);
  }
  if (node.children) {
    DFSLoop(node.children);
  }
}

console.log(DFSLoop, 'DFSLoop')


// 监听指定元素是否在视口区
const elementIsVisibleInViewport = (el, partiallyVisible = false) => {
  const { top, left, bottom, right } = el.getBoundingClientRect();
  const { innerHeight, innerWidth } = window;
  if (partiallyVisible) {
    return (
      (top > 0 && top < innerHeight) ||
      (bottom > 0 && bottom < innerHeight)
    ) && (
      (left > 0 && left < innerWidth)
      || (right > 0 && right < innerWidth))
  } else {
    return top >= 0 && left >= 0 && bottom <= innerHeight && right <= innerWidth
  }
};

// 封装滚动到页面顶部
const scrollToTop = () => {
  const top = document.documentElement.scrollTop ||
    document.body.scrollTop;
  if (top > 0) {
    // 不可见的元素不会发生重绘和回流，每一帧集中操作dom，性能比较好
    window.requestAnimationFrame(scrollToTop);
    // 每次让top减少 1/8,
    window.scrollTo(0, top - top/8)
  }
};

// 确认父元素包含子元素
const elementContains = (parent, child) => {
  return parent !== child && parent.contains(child)
};

// 获取当前页面（或者元素）的滚动位置
const getScrollPosition = (el = window) => {
  // 所有浏览器，除了 IE9 及更早版本
  const hasPageOffset = el.pageXOffset !== undefined;
  return {
    // IE9 及更早版本 scrollLeft  scrollTop
    x: hasPageOffset ? el.pageXOffset : el.scrollLeft,
    y: hasPageOffset ? el.pageYOffset : el.scrollTop,
  }
};

// 长列表渲染防止爱卡顿用的时间切片方案
// requestAnimationFrame + DocumentFragment
function renderList() {
  const ul = document.getElementById('ul')
  const total = 1000;
  const pageSize = 20;
  function loop(curTotal, curIndex) {
    if (curTotal <= 0) return;
    const pageCount = Math.min(curTotal,  pageSize);
    window.requestAnimationFrame(function () {
      let fragment = document.createDocumentFragment();
      for(let i = 0; i < pageCount; i++) {
        const li = document.createElement('li');
        li.innerText = 'li';
        fragment.appendChild(li)
      }
      ul.appendChild(fragment)
      loop(curTotal - pageCount, curIndex + pageCount)
    })
  }
  loop(total, 0);
}

// 设置rem
function setRem() {
  let doc = document.documentElement;
  let width = doc.getBoundingClientRect().width;
  let rem = width / 75;
  doc.style.fontSize = rem +'px';
}

























