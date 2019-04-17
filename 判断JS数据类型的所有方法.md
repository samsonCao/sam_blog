# judge-js-dataType
判断js数据类型的几种方法，包含所有数据类型


### 一、prototype.toString方法
```
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
```
```
[object HTMLCollection]'html节点类型 此处是判断对象是不是dom

```

```function args(a,b) {
         let args = arguments;
         let type = Object.prototype.toString.call(args)
         console.log(type)
     }
     args(1,2)
     // [object Arguments]函数参数类型对象
```

#### 除此之外还有很多种object对应的数据类型，这里列出返回的数据结构，但是不一一举例，有兴趣的同学可以自己查询含义
```
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

https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Int8Array#%E8%AF%AD%E6%B3%95




### 二、typeof 方法
typeof 操作符是确定一个变量是字符串、数值、布尔值，还是 undefined 的最佳工具。
如果变 量的值是一个对象或 null，则 typeof 操作符会像下面例子中所示的那样返回"object":
```
typeof undefined === 'undefined';
typeof 123 === 'number'
typeof '121' === 'string'
typeof true === 'bollean'

typeof null === 'object';
typeof {} === 'object'
typeof function xxx(){} === 'function'
typeof [] === 'object'
typeof new Date === 'object'
typeof new RegExp() === 'object' // safari5之前的和Chrome7之前的正则返回function
```

### 三、instanceof 方法 前提是已知是对象 要不然会报错
确定一个值是哪种引用类型可以使用 instanceof 操作符。
```
[] instanceof Array
new Date() instanceof Date
new RegExp() instanceof RegExp
(function xxx(){}) instanceof Function({}) instanceof Object
```

### 四、constructor方法 前提是已知是对象 要不然会报错
```
[].constructor === Array
new Date().constructor === Date
(function xxx(){}).constructor === Function
({}).constructor === Object
```
