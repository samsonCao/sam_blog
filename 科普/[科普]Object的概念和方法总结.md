说明：

这篇文字并不是严格的科普文章，而是我参照MDN对Object的api总结，是我对对象原生属性和方法的总结，帮我建立自己的知识体系。

如果说此有价值的话，价值在于分享一种学习方法

了解一个事物的基本步骤是

###### 1. 基本概念是什么

    就是下面官方定义的概念

###### 2. 概念的内涵和外延是什么

    内涵和外延其实就是对应的api,MDN上的方法和属性不包括删除的大概有35，

    这里也不会全部列举，可以去看`[MDN Object](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object)`

###### 3. 这个概念有什么用，解决了什么问题

    JS是面向对象的语言，整个JS代码在浏览器对象上运行，JS中一切都是对象

###### 4. 为什么会有这个东西

    对象是一种思维方式，是一种描述事物行为和属性的思维方式，没有对象就没有JS编程语言。

###### 5. 它和生态中的其他东西有什么联系

    JS对象和从CSS对象还有DOM对象，共同组成了web标准中的结构层(HTML)、表现出(CSS)、行为层(JavaScript)

#### 什么是JavaScript中的对象

ECMA-262 把对象定义为:“无序属性的集合，其属性可以包含基本值、对象或者函数。

> 严格来讲，这就相当于说对象是一组没有特定顺序的值。对象的每个属性或方法都有一个名字，而每个名字都映射 到一个值。
正因为这样(以及其他将要讨论的原因)，我们可以把 ECMAScript 的对象想象成散列表:无 非就是一组名值对，
其中值可以是数据或函数。

#### 创建对象的方法

##### 1. new Object

下面例子将一个空的Object对象存到o中
```javascript
var o = new Object();
var o = new Object(undefined);
var o = new Object(null);

```
##### 2. Object.create

    Object.create(proto, [propertiesObject]) 有两个参数

- proto

    新创建对象的原型对象。

- propertiesObject

    可选。如果没有指定为 undefined，则是要添加到新创建对象的可枚举属性
    （即其自身定义的属性，而不是其原型链上的枚举属性）对象的属性描述符以及相应的属性名称。
    这些属性对应Object.defineProperties()的第二个参数。

下面例子将一个空的Object对象存到o中
```javascript
var o1 = new Object();
at Function.create (<anonymous>)
at <anonymous>:1:16

var o = Object.create(undefined);
var o1 = new Object(null);
```

- 返回一个新对象，带着指定的原型对象和属性
```javascript

const person = {
  isHuman: false
};

const me = Object.create(person);

me.isHuman = true; // inherited properties can be overwritten

person.isHuman; // false依旧是false

```
![create实现继承图解](https://github.com/samsonCao/sam_blog/blob/master/Image/create.png)

通过上图可以看出，这是一种实现继承的方式,继承的person在新对象me的__proto__属性中

- 实现继承的完整实例
```javasript
// Shape - 父类(superclass)
function Shape() {
  this.x = 0;
  this.y = 0;
}

// 父类的方法
Shape.prototype.move = function(x, y) {
  this.x += x;
  this.y += y;
  console.info('Shape moved.');
};

// Rectangle - 子类(subclass)
function Rectangle() {
  Shape.call(this); // call super constructor.
}

// 子类续承父类
Rectangle.prototype = Object.create(Shape.prototype);
Rectangle.prototype.constructor = Rectangle;

var rect = new Rectangle();

console.log('Is rect an instance of Rectangle?',
  rect instanceof Rectangle); // true
console.log('Is rect an instance of Shape?',
  rect instanceof Shape); // true
rect.move(1, 1); // Outputs, 'Shape moved.'
```

##### 3. 对象字面量方法

```JavaScript
 var o = {};
```

#### 对象的属性

- Object.prototype 对象的原型对象
    prototype对象下有三个特有的属性
    - writable 控制是否可读写修改
    - enumerable 是否是可枚举的属性,false时无法通过for...in, Object.keys, JSON.stringify方法取到这些属性
    - configurable false时不可以修改，不可以删除，主要控制是否可以删除

- Object.prototype.constructor 表示构造函数的引用
```javascript
var o = {};
o.constructor === Object; // true

var a = new Array;
a.constructor === Array // true

var n = new Number(3);
n.constructor === Number; // true

// 核心案例
function Tree(name) {
   this.name = name;
}
var theTree = new Tree("Redwood");
console.log(theTree.constructor)
// 打印出来是个字符串Tree函数
// ƒ Tree(name) {
//    this.name = name;
// }

theTree.constructor === Tree; // true

```

#### 对象的方法

- Object.assign(target, ...source) // 把多个对象合并到target对象中，返回合并后的对象
    - 后面对象的属性会覆盖前面相同的属性
    - 只拷贝可枚举属性（enumerable）到目标对象
    - 继承属性和不可枚举属性是不能拷贝的
    - String类型和 Symbol 类型的属性都会被拷贝
    - 不会跳过那些值为 null 或 undefined 的源对象。
    - 注意： 目标对象自身会被改变为合并后的对象
    ```javascript
    Object.assign({}, 'abc', null, true, undefined, 10, Symbol('foo'));

    // { "0": "a", "1": "b", "2": "c" };
    // 1. 'abc'字符串被拆开了
    // 2. null 被忽略了
    // 3. true 布尔类型被忽略了
    // 4. undefined 被忽略了
    // 5. 10 数字被忽略了
    // 6. Symbol类型被忽略了

    // 手动实现assign
    if (typeof Object.assign != 'function') {
      // Must be writable: true, enumerable: false, configurable: true
      Object.defineProperty(Object, "assign", {
        value: function assign(target, varArgs) { // .length of function is 2
          'use strict';
          if (target == null) { // TypeError if undefined or null
            throw new TypeError('Cannot convert undefined or null to object');
          }

          let to = Object(target);

          // 其实很简单，核心代码就是for循环
          for (var index = 1; index < arguments.length; index++) {
            var nextSource = arguments[index];

            // 跳过 undefined or null 这样的数据类型
            if (nextSource != null) {
                // 必须得是对象类型的，其它基本类型无法用in 操作符遍历
              for (let nextKey in nextSource) {
                // Avoid bugs when hasOwnProperty is shadowed，
                // 返回一个布尔值，指示对象自身属性中是否具有指定的属性
                // 必须是可枚举的属性
                if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
                  to[nextKey] = nextSource[nextKey];
                }
              }
            }
          }
          return to;
        },
        writable: true,
        configurable: true
      });
    }
    ```
- Object.create(proto, [propertiesObject]); // 以原型对象为基准，创建新的对象

- Object.defineProperties(obj, props) 方法直接在一个对象上定义新的属性或修改现有属性，并返回该对象。
    props是个对象，有以下可描述的属性
    - value: 任意有效的JS类型，其值就是obj对应的属性值
    - configurable，true. 属性可改变可删除
    - enumerable,true. 枚举属性时可以被枚举
    - writable, false.属性值可以被改变
    - get()方法, undefined.该属性的getter函数
    - set()方法, undefined.该属性的setter函数
    ```javascript
    var obj = {};
    Object.defineProperties(obj, {
      'property1': {
        value: true,
        writable: true
      },
      'property2': {
        value: 'Hello',
        writable: false
      }
      // etc. etc.
    });
    // {property1: true, property2: "Hello"}
    ```
- Object.defineProperty(obj, prop, descriptor) //在一个对象上定义一个新属性，或者修改一个对象的现有属性， 并返回这个对象。
    descriptor是个对象，有以下属性
    - value: 任意有效的JS类型，其值就是obj对应的属性值
    - configurable，true. 属性可改变可删除
    - enumerable,true. 枚举属性时可以被枚举
    - writable, false.属性值可以被改变
    - get()方法, undefined.该属性的getter函数
    - set()方法, undefined.该属性的setter函数
    ```javascript
    Object.defineProperty(obj, "key", {
      value: "static",
      enumerable: false,
      configurable: false,
      writable: false,
      get: function(){
          return value;
      },
      set: function(newValue){
          value = 'newValue';
      },
    });
    ```
- Object.entries(obj); // 参数是一个给定的可枚举属性的对象，返回可枚举属性的`键值对`组成的数组

    键值对组成的对象
    ```javascript
    const obj = { foo: 'bar', baz: 42 };
    console.log(Object.entries(obj)); //[ ['foo', 'bar'], ['baz', 42] ]

    数字自带排序功能
    ```javascript
    //2， 7，100排序
    const anObj = { 100: 'a', 2: 'b', 7: 'c' };
    console.log(Object.entries(anObj)); // [ ['2', 'b'], ['7', 'c'], ['100', 'a'] ]
    ```

    create创建的属性默认不可枚举，无法通过entries获取
    ```JavaScript
    var myObj = Object.create({}, {
      getFoo: {
        value: function () { return this.foo; }
      }
    });
    myObj.foo = 1;
    console.log(Object.entries(myObj)); // console: ['foo', 1]
    ```

    object对象转为Map类型
    ```javascript
    var obj = { foo: "bar", baz: 42 };
    var map = new Map(Object.entries(obj));
    console.log(map); // Map { foo: "bar", baz: 42 }
    ```

- Object.keys(obj); // 参数是一个给定的可枚举属性的对象，返回可枚举属性的`键名`组成的数组
    for...in也可以遍历属性，但是遍历的属性包括原型链的属性
    ```javascript
    var colors = ['red', 'green', 'blue'];
    // 扩展Array.prototype
    Array.prototype.demo = function () {};

    for (var i in colors) {
      console.log(i); // 0 1 2 demo, demo是原型链的属性，因此也被遍历了
    }
    Object.keys(colors) // 0 1 2
    ```
    自带排序功能
    ```javascript
    var anObj = { 100: 'a', 2: 'b', 7: 'c' };
    console.log(Object.keys(anObj)); // console: ['2', '7', '100']
    ```
    create创建的属性默认不可枚举，无法通过keys获取
    ```JavaScript
    var myObj = Object.create({}, {
      getFoo: {
        value: function () { return this.foo; }
      }
    });
    myObj.foo = 1;
    console.log(Object.keys(myObj)); // console: ['foo']
    ```

- object.toString(); 返回一个表示该对象的字符串

    ```javascript
    var o = new Object();
    o.toString(); // returns [object Object]
    ```
    精确校验对象类型的方法来源
    ```javascript
    var toString = Object.prototype.toString;

    toString.call(new Date); // [object Date]
    toString.call(new String); // [object String]
    toString.call(Math); // [object Math]

    //Since JavaScript 1.8.5
    toString.call(undefined); // [object Undefined]
    toString.call(null); // [object Null]
    ```

其它方法请参考MDN: [MDN Object](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object)

