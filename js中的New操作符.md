###### new 操作符的基本过程


1.创建一个新的空对象。

2.将构造函数的作用域赋给它（即this指向它）。

3.新对象增加构造函数的基本方法和属性。

4.返回新对象


    ```
    var obj = new Base();

    var obj = {};  // 创建了一个空对象obj
    obj.__proto__ = Base.prototype; // 将这个空对象的__proto__成员指向了Base函数对象prototype成员对象
    Base.call(obj); //Base函数对象的this指针替换成obj，然后再调用Base函数，于是我们就给obj对象赋值了一个id成员变量，这个成员变量的值是”base”，
    ```

* 注意： 返回的是新对象
* 学习了上面的知识，我们来看一个简单的例子
```
var a = new String('123')
var b = new String('123')
console.log( a == b ) // false

因为new关键词创造的a和b变量都是对象，是引用类型，各自创建了自己的堆内存
因此a 和 b的指向完全不是同一个地址，当然不相等
```


