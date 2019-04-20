- 基本类型（值类型或者原始类型）： Number、Boolean、String、NULL、Undefined以及ES6的Symbol

- 引用类型：Object、Array、Function、Date等

- 在内存中的位置不同

- 基本类型： 占用空间固定，保存在栈中；

- 引用类型：占用空间不固定，保存在堆中；

>栈（stack）为自动分配的内存空间，它由系统自动释放；使用一级缓存，被调用时通常处于存储空间中，调用后被立即释放。

>堆（heap）则是动态分配的内存，大小不定也不会自动释放。使用二级缓存，生命周期与虚拟机的GC算法有关
当一个方法执行时，每个方法都会建立自己的内存栈，在这个方法内定义的变量将会逐个放入这块栈内存里，随着方法的执行结束，这个方法的内存栈也将自然销毁了。因此，所有在方法中定义的变量都是放在栈内存中的；栈中存储的是基础变量以及一些对象的引用变量，基础变量的值是存储在栈中，而引用变量存储在栈中的是指向堆中的数组或者对象的地址，这就是为何修改引用类型总会影响到其他指向这个地址的引用变量。
当我们在程序中创建一个对象时，这个对象将被保存到运行时数据区中，以便反复利用（因为对象的创建成本通常较大），这个运行时数据区就是堆内存。堆内存中的对象不会随方法的结束而销毁，即使方法结束后，这个对象还可能被另一个引用变量所引用（方法的参数传递时很常见），则这个对象依然不会被销毁，只有当一个对象没有任何引用变量引用它时，系统的垃圾回收机制才会在核实的时候回收它。

- 赋值、浅拷贝、深拷贝
对于基本类型值，赋值、浅拷贝、深拷贝时都是复制基本类型的值给新的变量，之后二个变量之间操作不在相互影响。
对于引用类型值，
赋值后二个变量指向同一个地址，一个变量改变时，另一个也同样改变；
浅拷贝后得到一个新的变量，这个与之前的已经不是指向同一个变量，改变时不会使原数据中的基本类型一同改变，但会改变会原数据中的引用类型数据
深拷贝后得到的是一个新的变量，她的改变不会影响元数据
和原数据是否指向同一对象

- 浅拷贝
数组常用的浅拷贝方法有slice,concat,Array.from() ,以及es6的析构
对象常用的浅拷贝方法Object.assign(),es6析构

我们自己实现一个浅拷贝

```javascript
var shallowCopy = function(obj) {
    // 只拷贝对象
    if (typeof obj !== 'object') return;

    // 根据obj的类型判断是新建一个数组还是对象
    var newObj = obj instanceof Array ? [] : {};
    // 遍历obj，并且判断是obj的属性才拷贝
    for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
            newObj[key] = obj[key];
        }
    }
    return newObj;
}
```

- 深拷贝
比较简单粗暴的的做法是使用JSON.parse(JSON.stringify(obj))
MDN文档的描述有句话写的很清楚：
undefined、任意的函数以及 symbol 值，在序列化过程中会被忽略（出现在非数组对象的属性值中时）或者被转换成 null（出现在数组中时）。
但是在平时的开发中JSON.parse(JSON.stringify(obj))已经满足90%的使用场景了。
下面我们自己来实现一个

```javascript
var deepCopy = function(obj) {
    if (typeof obj !== 'object') return;
    var newObj = obj instanceof Array ? [] : {};
    for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
            newObj[key] = typeof obj[key] === 'object' ? deepCopy(obj[key]) : obj[key];
        }
    }
    return newObj;
}
```
- 参数的传递
所有的函数参数都是按值传递。也就是说把函数外面的值赋值给函数内部的参数，就和把一个值从一个变量赋值给另一个一样；

基本类型
```javascript
var a = 2;
function add(x) {
 return x = x + 2;
}
var result = add(a);
console.log(a, result); // 2 4
```

引用类型
```javascript
function setName(obj) {
  obj.name = 'laowang';
  console.log(obj); //laowang
  obj = new Object();
  obj.name = 'Tom';
  console.log(obj); //Tom
}
var person = new Object();
setName(person);
console.log(person.name); //laowang
```
很多人错误地以为在局部作用域中修改的对象在全局作用域中反映出来就是说明参数是按引用传递的。
但是通过上面的例子可以看出如果person是按引用传递的最终的person.name应该是Tom。
实际上，当定义 obj = new Object()时，此时的obj是一个新的局部变量，和函数括号内形参obj已经不是同一个东西了
这是一个局部变量了。而这个变量会在函数执行结束后销毁)

Object.prototype.toString.call([]).slice(8, -1)有兴趣的同学可以看一下这个是干什么的
5、总结

