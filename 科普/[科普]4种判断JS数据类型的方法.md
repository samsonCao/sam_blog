### 判断js数据类型的几种方法，包含所有数据类型


### 1. prototype.toString方法

1. 在 JavaScript 中，没有任何方法可以更改私有的 Class 属性，

2. 因此 Object.prototype.toString 是可以准确识别对象对应的基本类型的方法，

它比instanceof 更加准确。

```javascript
Object.prototype.toString.call(new Date());         // '[object Date]'
Object.prototype.toString.call([]);                 // '[object Array]'
Object.prototype.toString.call(new RegExp());       // '[object RegExp]'
Object.prototype.toString.call({});                 // '[object Object]'
Object.prototype.toString.call(123);                // '[object Number]'
Object.prototype.toString.call('121');              // '[object String]'
Object.prototype.toString.call(function xxx(){});   //[object Function]'
Object.prototype.toString.call(null);               // '[object Null]'
Object.prototype.toString.call(undefined);          // '[object Undefined]'
Object.prototype.toString.call(true);               //'[object Boolean]'
Object.prototype.toString.call(document.getElementsByTagName('body')); `
Object.prototype.toString.call([]).slice(8, -1) // 'Array'
```

```javascript
[object HTMLCollection]'html节点类型 此处是判断对象是不是dom

```

```javascript
function args(a,b) {
         let args = arguments;
         let type = Object.prototype.toString.call(args)
         console.log(type)
     }
     args(1,2)
     // [object Arguments]函数参数类型对象
```

> 除此之外还有很多种object对应的数据类型，这里列出返回的数据结构，但是不一一举例，有兴趣的同学可以自己查询含义

```javascript
[object Error]
[object Map]
[object Set]
[object Symbol]
[object WeakMap]
[object ArrayBuffer]
[object DataView]
[object Float32Array]
[object Float64Array]
[object Int8Array]
[object Int32Array]
[object Uint8Array]
[object Uint8ClampedArray]
[object Uint16Array]
[object Uint32Array]
```
实例化方法可参考 new Float64Array()

官方文档请参考

<https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Int8Array#%E8%AF%AD%E6%B3%95>

### 2. typeof 方法

1. typeof 操作符是确定一个变量是字符串、数值、布尔值，还是 undefined 的最佳工具。

2. 如果变量的值是一个对象或 null，则 typeof 操作符会像下面例子中所示的那样返回"object":

```javascript
// 可以准确判断5种基本数据类型
typeof undefined === 'undefined';
typeof true === 'bollean'
typeof 123 === 'number'
typeof '121' === 'string'
typeof  Symbol("foo") === 'Symbol'

// 判断null 居然是object
typeof null === 'object'; // 怪胎

// 可以准确判断function类型
typeof function xxx(){} === 'function'

typeof {} === 'object'
typeof [] === 'object'
typeof new Date === 'object'
typeof new RegExp() === 'object' // safari5之前的和Chrome7之前的正则返回function
```

### 3. instanceof方法, 左侧的对象是右侧类的实例，则返回true

1. 前提是右边必须是对象Object类型或者是Object衍生的子类，要不然会报错

2. 确定一个值是哪种引用类型可以使用 instanceof 操作符。

3. a instanceof B ， 即a的原型链上是否存在B构造函数

```javascript
[] instanceof Array
new Date() instanceof Date
new RegExp() instanceof RegExp
(function xxx(){}) instanceof Function({}) instanceof Object

1 instanceof Number // false    因为1不是对像，它并不是 Number 构造函数构造出来的实例对象

new Number(5) instanceof Number // true

undefined instanceof Object // false,undefined不是Object的实例
undefined instanceof undefined // Right-hand side of 'instanceof' is not an object

null instanceof Object // false null不是Object的实例
null instanceof null // Right-hand side of 'instanceof' is not an object
```

### 4. constructor方法,慎用

1. undefined、null、数字number,没有constructor属性，会报错

2. Symbol的constructor是Function

3. constructor 返回的是构造函数本身，一般使用它来判断类型的情况并不多见。

```javascript
[].constructor === Array
new Date().constructor === Date
(function xxx(){}).constructor === Function
({}).constructor === Object
'3'.constructor === String
true.constructor === Boolean
Symbol.constructor === Function // 特殊symbol是function类型

undefined.constructor 报错：VM3185:1 Uncaught TypeError: Cannot read property 'constructor' of undefined
null.constructor //报错VM3119:1 Uncaught TypeError: Cannot read property 'constructor' of null
3.constructor // 报错：Uncaught SyntaxError: Invalid or unexpected token
```
