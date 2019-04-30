#### 此文必定是超级长文，里面的方法会逐个实现，敬请期待......


### 1.call内部实现

1. call语法
```javascript
fun.call(thisArg, arg1, arg2, ...)
```

2. call含义

call()方法在使用一个指定的this值和若干个指定的参数值的前提下调用某个函数或方法然后执行该方法。

3. call体验
```javascript
var person = {
    name: 'sam',
    eat: function(){
        console.log('eating!');
        console.log(this.name);
        return 'eat';
    }
};

var another = {
	name: 'tom',
	drink: function(){
		console.log('drinking!');
		console.log(this.name);
		return 'drink'
	}
};

// eat函数在another的作用域中执行
// 因此返回eating, this.name指向的是another的name/tom
person.eat.call(another, '99', '88', '77'); // eating/tom/eat
```

4. call实现
```javascript
/**
* A.myCall(B) 做两件事
* 1.把A放在B的作用于中执行
* 2.并返回A的返回值
* 3.myCall可以接收多个参数，以逗号分隔
* 相当于作用于B劫持了函数A，获取了A的方法
* @param context
* @returns {any}
*/
Function.prototype.myCall = function (context) {

    // context是第一个参数，call中传入的对象即another
    // 让函数在这个对象中执行
    // 不传是window
    var callObj = context || window;

    // 新增属性fn, 让this指向这个fn
    // 此处执行的函数是eat,this就是指eat函数
    console.log(this, 'this');

    // 把eat函数放在callObj即another作用域中
    // 注意: 这里传递的只是eat函数的引用地址
    callObj.fn = this;

    var args = [];

    // 获取call中除了第一个参数的其它参数
    for(var i = 1, len = arguments.length; i < len; i++) {
        // 此处push的是arguments[i]的引用而不是arguments对应的值
        // 如果是push,arguments[i]就是把值放进去
        args.push('arguments[' + i + ']');
    }
    console.log(args); //["arguments[1]", "arguments[2]", "arguments[3]"]
    // 把数组参数拼接成字符串参数逗号分隔
    // 注意: 数组和字符串拼接会去掉数组的[], 例子: '3' + [1, 2] ==> "31,2"
    var str = 'callObj.fn(' + args +')';
    console.log(str); //callObj.fn(arguments[1],arguments[2],arguments[3])

    // 把要执行的函数eat放在another的作用于中执行
    // 把函数和参数转为字符串在eval中执行，如果有返回值就返回result
    var result = eval('callObj.fn(' + args +')');
    console.log(result); // eat

    // 删除在context参数上添加的属性fn
    delete callObj.fn;
    return result;
};

var person = {
    name: 'sam',
    eat: function(){
        console.log('eating!');
        console.log(this.name);
        return 'eat';
    }
};

var another = {
	name: 'tom',
	drink: function(){
		console.log('drinking!');
		console.log(this.name);
		return 'drink'
	}
};

// eat函数在another的作用域中执行
// 因此返回eating, this.name指向的是another的name/tom
person.eat.myCall(another, '99', '88', '77'); // eating/tom/eat
```

### 2.apply内部实现


1. apply语法
```javascript
func.apply(thisArg, [argsArray])
```

2. apply含义

apply() 方法调用一个具有给定this值的函数，以及作为一个数组（或类似数组对象）提供的参数。

3. apply体验
```javascript
var numbers = [5, 6, 2, 3, 7];
var min = Math.min.apply(null, numbers);

// 获取数组最小值
console.log(min); // 2
```

4. apply实现
```javascript
/**
* A.myCall(B, []) 做两件事
* 1.把A放在B的作用于中执行
* 2.并返回A的返回值
* 3.myApply可以接收2参数，第二个参数是数组
* 相当于作用于B劫持了函数A，获取了A的方法
* @param context
* @returns {any}
*/
Function.prototype.myApply = function (context, arr) {
	var applyObj = context || window;
	var result;
	applyObj.fn = this;
	if (!arr) { // 如果没有传入数组参数，则直接调用ctx.fn方法
		result = applyObj.fn()
	} else {
	    var args = [];
        for (var i = 0, len = arr.length; i < len; i++) {
            args.push('arr[' + i + ']');
        }
	    result = eval('applyObj.fn(' + args +')');
	}
	delete applyObj.fn;
	return result
};

var person = {
    name: 'sam',
    eat: function(args){
        console.log('eating!');
        console.log(this.name);
        return 'eat';
    }
};

var another = {
	name: 'tom',
	drink: function(){
		console.log('drinking!');
		console.log(this.name);
		return 'drink'
	}
};

person.eat.myApply(another, ['999', '888', 4]);
```
apply巧妙用例

1. 获取一个数组的最大值
```javascript
// apply内部会把array数组转为参数列表在max函数的作用域内执行
var max=Math.max.apply(null,array)
```

2. 数组合并
```javascript
var array = ['a', 'b'];
var elements = [0, 1, 2];
array.push.apply(array, elements);
console.info(array); // ["a", "b", 0, 1, 2]
```

`注意：call()方法的作用和 apply() 方法类似，区别就是call()方法接受的是参数列表，而apply()方法接受的是一个参数数组。`

重要参考：https://www.zhihu.com/question/35787390

### 3.bind内部实现

1. bind语法
```javascript
function.bind(thisArg[, arg1[, arg2[, ...]]])
```

2. bind含义

bind()方法创建一个新的函数，在调用时设置this关键字为提供的值。并在调用新函数时，将给定参数列表作为原函数的参数序列的前若干项。
`注意bind和call、apply不同的是返回值是个新函数，并没有执行`

3. bind体验
```javascript
var module = {
  x: 42,
  getX: function() {
    return this.x;
  }
}

var unboundGetX = module.getX;
// window下面是没有x属性的，因此unboundGetX在window执行上下文执行时输出undefined
console.log(unboundGetX()); // undefined

// 让unboundGetX在module的作用域下执行，this.x就是module作用域下的x=> 42
var boundGetX = unboundGetX.bind(module);
console.log(boundGetX()); // 42
```

4. bind实现
```javascript
var module = {
  x: 42,
  getX: function() {
    return this.x;
  }
}

Function.prototype.myBind = function (context) {
    // 此处的context是module对象

    if (typeof this !== "function") {
      throw new Error("Function.prototype.bind - what is trying to be bound is not callable");
    }

    // 此处的this是getX函数
    var self = this;
    // 去掉第一个参数thisArg之后的剩余参数,组成一个数组[arg2,arg3,arg4....]
    var args = Array.prototype.slice.call(arguments, 1);

    // 函数声明的方式创建一个函数，
    var samFunc = function () {};

    var samBound = function () {
        /**
        * 此处的this是samBound执行上下文中的this,self是myBind执行作用域中的this
        *
        * 1.当作为构造函数(new出来有自己的作用域)时，this指向实例samBound{}，
          self指向绑定函数module.getX{},

        * 2.当作为普通函数时，this 指向 window,因为samBound最终是在window的作用域下执行的，
          self指向绑定函数module.getX{}，此时结果为 false，当结果为 false 的时候，this 指向绑定的 context。
        */

        // instanceof判断一个实例this是否属于某种类型self
        console.log(this, 'samBound-this')
        console.log(self, 'samBound-self')
        console.log(this instanceof self, 'istrue');
        console.log(context, 'context')

        // 返回绑定函数执行的结果
        return self.apply(this instanceof self ? this : context, args.concat(Array.prototype.slice.call(arguments)));
    }

    /**
    * 下面这段代码是精华
    * 使用了原型模式继承用
    * 把绑定函数this的prototype赋值给声明函数samFunc的prototype，
    * 实例new samFunc()可以继承samFunc.prototype中的值
    * 也就是继承self.prototype中的值
    * 也就是继承getX中的值
    */


    samFunc.prototype = self.prototype;
    samBound.prototype = new samFunc();
    /**
    * samBound的prototype指向了samFunc的实例，继承了samFunc的prototype中的方法
    * samFunc的prototype指向了self.prototype，继承了self.prototype的方法，而self就是执行时的getX
    * 通过new samFunc把self和samBound关联起来，同时又不至于共享prototype的属性和方法
    */

    /**
    * 两行代码合成一行会出问题
    * samBound.prototype = self.prototype;
    */

    // 返回构造函数bind
    return samBound;

}

var boundGetX = module.getX.myBind(module, '1', '2');
console.log(boundGetX()); // 42

/**
* samFunc.prototype = self.prototype;
* samBound.prototype = new samFunc();
* 两行代码合成一行会出问题
* samBound.prototype = self.prototype;
*/
// boundGetX.prototype.value = '1';
// console.log(module.getX.prototype.value) // '1'
```


### 4.new操作符内部实现

new 操作符的基本过程

1.创建一个新的空对象。

2.将构造函数的作用域赋给它（即this指向它）。

3.新对象增加构造函数的基本方法和属性。

4.返回新对象


    ```javascript
    var obj = new Base();

    var obj = {};  // 创建了一个空对象obj
    obj.__proto__ = Base.prototype; // 将这个空对象的__proto__成员指向了Base函数对象prototype成员对象
    Base.call(obj); //Base函数对象的this指针替换成obj，然后再调用Base函数，于是我们就给obj对象赋值了一个id成员变量，这个成员变量的值是”base”，
    ```

> 注意：返回的是新对象

```javascript
var a = new String('123')
var b = new String('123')
console.log( a == b ) // false

// 因为new关键词创造的a和b变量都是对象，是引用类型，各自创建了自己的堆内存
// 因此a 和 b的指向完全不是同一个地址，当然不相等
```

instanceof的内部实现

JSON.stringify/JSON.parse内部实现

使用setTimeout实现setInterval

class构造以及集成的低层实现

Set内部实现

Promise内部实现

async/await内部实现

Symbol类型实现

深拷贝内部实现

树形结构数组改为一级结构实现

函数防抖实现

函数节流实现

使用Promise实现串行






