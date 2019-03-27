- 变量声明6中方法
    - let
    - const const定义的基本类型不能改变，但是定义的对象是可以通过修改对象属性等方法来改变的

        定义一个const对象的时候，我们说的常量其实是指针，就是const对象对应的堆内存指向是不变的，
        但是堆内存中的数据本身的大小或者属性是可变的
    - import命令
    - class命名
    - var命令
    - function命令
    - 结构赋值时把变量重置为另一个变量 变量a的值赋值给变量aaa
        ```
        const {a: aaa, b , c} = {a: '1', b: '2', cc: '3'}
        ```

    <font color="#006600">注意：</font>var声明的变量在window上，let const class 声明的变量不在window上，而是在块作用域（Script）上，其实就是在一个{}里面
    <font color="#006600">参考：</font> https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/30
- 顶层对象属性
    - 浏览器环境window,Node指的是global
- 变量结构赋值
    - 数组解构赋值
       ```
       let [, , third = ‘333'] = [‘1’, ‘2’, ‘'3]
       ```
    - 对象解构赋值
       ```
       const {a, b , c} = {a: '1', b: '2', cc: '3'}
       a => 1
       b => 2
       c => 3
       ```
    - 字符串解构赋值
      ```
       1. const [a, b, c, d, e] =‘hello’ => // abcde分别是hello
       2.  let {length: len} = ‘’hello => // hen是5
       ```
    - 数值和布尔值解释构赋值，等号右边是数值和布尔型会先转为对象
    - 函数参数解构赋值 function ([x, y]) { return x+y}
    - 解构不成功返回undefined
    - 可以设置默认值
    - 等号左边尽量不要使用圆括号
-  字符串扩展
    - 遍历字符串
        ```
        for(let codePoint of ‘foo’) { console.log(codePoint) } => ‘f’ ‘o’ ‘o'
        ```
    - includes,返回布尔值，是否找到参数字符串
        ```
        ‘Hello’.includes(‘H’) => true
        ```
    - startsWith,返回布尔值，参数字符串是否在原字符串头部
        ```
        ‘Hello’.startsWith(‘H’) => true
        ```
    - endsWith,返回布尔值，参数字符串是否在原字符串末尾
        ```
        ‘Hello’.endsWith(‘h’) => true
        ```
    - repeat,返回新字符串，表示将原字符串重复n次
        ```
        ‘hello’.repeat(2) => ‘hellohello’ 小数会被取整，负数和其它非数组会报错
        ```
    - padStart,在源字符串的开头补全字符
        ```
        ‘x’.padStart(5, ‘ab’) => ‘ababx’ // 用ab在x前面补全x,补全后的长度是5
        ```
    - padEnd, ，在源字符串的末尾补全字符
        ```
        ‘x’.padEnd(5, ‘ab’) => ‘xabab’ // 用ab在x后面补全x,补全后的长度是5
        ```
    - macthAll,返回一个正则表达式在当前字符串的所有匹配
    - 模板字符串 `xx ` 反引号，模板字符串中的变量 ${a}
- 数值的扩展
    -  Number.isFinite(15) => true 检查一个数值是否为有限，即不是Infinity
    -  Number.isNaN(NaN) => true 检查一个值是否为NaN
    -  Number.parseInt(’12.34’) => 12  数字或者字符串取整操作，四舍五入 。全局方法转到Number上，使语言更加模块化
    -  Number.parseFloat(’12.34a’) => 12.34 浮点数操作 。 全局方法转到Number上，使语言更加模块化
    -  Number.isInteger(25.1) => false  || Number.isInteger(25.0) => true || Number.isInteger(25) => true  整数和浮点数采用同样的存储方法，所以25和25.0被视为同一个值
    -  Math.trunc(4.9) => 4 去除小数部分返回整数 -0.123 => 0 || -4.9 => -4
         - 非数字会先转用Number方法转为数字
         - 空值和无法截取整数的值返回NaN
    -  Math.sign() 判断一个数字是整数还是负数还是0
        - 参数为正数，返回+1；
        - 参数为负数，返回-1；
        - 参数为 0，返回0；
        - 参数为-0，返回-0;
        - 其他值，返回NaN。
    -  Math的对数方法
        - Math.expm1(x)返回 ex - 1，即Math.exp(x) - 1。
        - Math.log1p(x)方法返回1 + x的自然对数，即Math.log(1 + x)。如果x小于-1，返回NaN。
        - Math.log10(x)返回以 10 为底的x的对数。如果x小于 0，则返回 NaN。
        - Math.log2(x)返回以 2 为底的x的对数。如果x小于 0，则返回 NaN。
    -  Math 6 个双曲函数方法。
        - Math.sinh(x) 返回x的双曲正弦（hyperbolic sine）
        - Math.cosh(x) 返回x的双曲余弦（hyperbolic cosine）
        - Math.tanh(x) 返回x的双曲正切（hyperbolic tangent）
        - Math.asinh(x) 返回x的反双曲正弦（inverse hyperbolic sine）
        - Math.acosh(x) 返回x的反双曲余弦（inverse hyperbolic cosine）
        - Math.atanh(x) 返回x的反双曲正切（inverse hyperbolic tangent）
    - 指数运算符 指数运算符（**）。
            ```
            2 ** 3 =8
            2 ** 3 ** 2 = 512 => 相当于 2 ** (3 ** 2) => 2 ** 9 = 512'
            ```
- 函数的扩展
    - 为函数的参数指定默认值， 直接写在参数的后面 = xxx
        ```
        function log(x, y = 'World') {
          console.log(x, y);
        }
        ```
    - 参数变量是默认声明的，所以不能用let或const再次声明。
        ```
        function foo(x = 5) {
          let x = 1; // error
          const x = 2; // error
        }
        ```
    - 函数内部的形参不能重名
    - rest 参数  rest 参数（形式为...变量名），用于获取函数的多余参数，这样就不需要使用arguments对象了。rest 参数搭配的变量是一个数组，该变量将多余的参数放入数组中。
        ```
        function add(...values) {
          let sum =
          for (var val of values) {
            sum += val;

          return sum;

        add(2, 5, 3) // 10
        ```
    - name 属性
        ```
        var f = function ()
        // ES5
        f.name //
        // ES6
        f.name // "f"
        ```
    - 箭头函数 返回值不是语句是可以直接箭头返回
        ```
        var f = v =>
        // 等同于
        var f = function (v) {
          return v;
        };
        ```
    - 箭头函数多个参数或者不需要参数的情况。返回值是语句表达式时用大括号抱起来-{}
        ```
        var f = () => 5;
        // 等同于
        var f = function () { return 5
        var sum = (num1, num2) => num1 + num2;
        // 等同于
        var sum = function(num1, num2) {
          return num1 + num2;
        };
        ```
    - 箭头函数的注
        （1）函数体内的this对象，就是`定义时`所在的对象，而不是使用时所在的
        （2）不可以当作构造函数，也就是说，不可以使用new命令，否则会抛出一个
        （3）不可以使用arguments对象，该对象在函数体内不存在。如果要用，可以用 rest 参数
        （4）不可以使用yield命令，因此箭头函数不能用作 Generator
        上面四点中，第一点尤其值得注意。this对象的指向是可变的，但是在箭头函数中，它是固定的。
    - 双冒号运算符 双冒号左边是一个对象，右边是一个函数。该运算符会自动将左边的对象，作为上下文环境（即this对象），绑定到右边的函数上面。
        ```
        foo::bar;
        // 等同于
        bar.bind(fo
        foo::bar(...arguments);
        // 等同于
        bar.apply(foo, argument
        const hasOwnProperty = Object.prototype.hasOwnProperty;
        function hasOwn(obj, key) {
          return obj::hasOwnProperty(key);
        }
        ```
- 数组的扩展
    - 扩展运算符
        ```
        console.log(...[1, 2, 3])
        // 1 2 3

        console.log(1, ...[2, 3, 4], 5)
        // 1 2 3 4 5

        [...document.querySelectorAll('div')]
        // [<div>, <div>, <div>]
        ```
        - 用来合并数组
            ```
            [...arr1, ...arr2, ...arr3]
            ```
        - 用来复制数组 不是指针的指向改变，而是生成新数组，但是是浅拷贝，成员如果是对象，某个属性修改时新数组也会随之修改
            ```
            const a1 = [1, 2];
            // 写法一
            const a2 = [...a1];
            // 写法二
            const [...a2] = a1;
            ```
        - Map 和 Set 结构，Generator 函数
          ```
          let map = new Map([
            [1, 'one'],
            [2, 'two'],
            [3, 'three'],
          ]);

          let arr = [...map.keys()]; // [1, 2, 3]
          ```
    - Array.from(),将类数组对象和可遍历的对象转为正正的数组，例如dom对象
        ```
        let arrayLike = {
            '0': 'a',
            '1': 'b',
            '2': 'c',
            length: 3
        };

        // ES5的写法
        var arr1 = [].slice.call(arrayLike); // ['a', 'b', 'c']

        // ES6的写法
        let arr2 = Array.from(arrayLike); // ['a', 'b', 'c']
        ```

    - Array.of() 用于将一组值，转换为数组
        ```
        Array.of(3, 11, 8) // [3,11,8]
        Array.of(3) // [3]
        Array.of(3).length // 1
        Array.of() // []生成数组的新方法
        Array.of(undefined) // [undefined]
        ```
    - 数组实例的 copyWithin()
    - 数组实例的 find()
        找出第一个符合条件的数组成员。它的参数是一个回调函数，所有数组成员依次执行该回调函数，直到找出第一个返回值为true的成员，然后返回该成员。如果没有符合条件的成员，则返回undefined。
        ```
        [1, 5, 10, 15].find(function(value, index, arr) {
          return value > 9;
        }) // 10
        ```
    - 数组实例的findIndex()
        数组实例的findIndex方法的用法与find方法非常类似，返回第一个符合条件的数组成员的位置，如果所有成员都不符合条件，则返回-1。
        ```
        [1, 5, 10, 15].findIndex(function(value, index, arr) {
          return value > 9;
        }) // 2
        ```
    - 数组实例的 fill()
        使用给定值，填充一个数组。
        ```
        ['a', 'b', 'c'].fill(7)
        // [7, 7, 7]

        new Array(3).fill(7)
        // [7, 7, 7]
        ```
    - 数组实例的 entries()，keys() 和 values()都是用来遍历数组的
        keys()是对键名的遍历、values()是对键值的遍历，entries()是对键值对的遍历。
    - 数组实例的 includes()
        返回一个布尔值，表示某个数组是否包含给定的值，与字符串的includes方法类似。
        ```
        [1, 2, 3].includes(2)     // true
        [1, 2, 3].includes(4)     // false
        [1, 2, NaN].includes(NaN) // true
        ```
    - 数组实例的 flat()，flatMap()
        用于将嵌套的数组“拉平”，变成一维的数组。该方法返回一个新数组，对原数据没有影响。
        ```
        [1, 2, [3, 4]].flat()
        // [1, 2, 3, 4]
        ```
        flat()默认只会“拉平”一层，如果想要“拉平”多层的嵌套数组，可以将flat()方法的参数写成一个整数，表示想要拉平的层数，默认为1。
        ```
        1, 2, [3, [4, 5]]].flat()
        // [1, 2, 3, [4, 5]]

        [1, 2, [3, [4, 5]]].flat(2)
        // [1, 2, 3, 4, 5]
        ```
        如果不管有多少层嵌套，都要转成一维数组，可以用Infinity关键字作为参数。
        ```
        [1, [2, [3]]].flat(Infinity)
        // [1, 2, 3]
        ```
        如果原数组有空位，flat()方法会跳过空位。
        ```
        [1, 2, , 4, 5].flat()
        // [1, 2, 4, 5]
        ```
        flatMap()方法对原数组的每个成员执行一个函数（相当于执行Array.prototype.map()），然后对返回值组成的数组执行flat()方法。该方法返回一个新数组，不改变原数组。
        ```
        / 相当于 [[2, 4], [3, 6], [4, 8]].flat()
        [2, 3, 4].flatMap((x) => [x, x * 2])
        // [2, 4, 3, 6, 4, 8]
        ```
    - 数组的空位， ES6数组空位会转为undefined
- 对象的扩展
    - 属性的遍历5种方法
        （1）for...in

            for...in循环遍历对象自身的和继承的可枚举属性（不含 Symbol 属性）。

        （2）Object.keys(obj)

            Object.keys返回一个数组，包括对象自身的（不含继承的）所有可枚举属性（不含 Symbol 属性）的键名。

        （3）Object.getOwnPropertyNames(obj)

            Object.getOwnPropertyNames返回一个数组，包含对象自身的所有属性（不含 Symbol 属性，但是包括不可枚举属性）的键名。

        （4）Object.getOwnPropertySymbols(obj)

            Object.getOwnPropertySymbols返回一个数组，包含对象自身的所有 Symbol 属性的键名。

        （5）Reflect.ownKeys(obj)

            Reflect.ownKeys返回一个数组，包含对象自身的所有键名，不管键名是 Symbol 或字符串，也不管是否可枚举。

        以上的 5 种方法遍历对象的键名，都遵守同样的属性遍历的次序规则。

        首先遍历所有数值键，按照数值升序排列。
        其次遍历所有字符串键，按照加入时间升序排列。
        最后遍历所有 Symbol 键，按照加入时间升序排列。
    - super关键字
        this关键字总是指向函数所在的当前对象，ES6 又新增了另一个类似的关键字super，指向当前对象的原型对象。
        super关键字表示原型对象时，只能用在对象的方法之中，用在其他地方都会报错。
    - 对象的扩展运算符 ...
        解构赋值
        拷贝当前对象
        合并两个或者多个对象，扩展运算符等同于使用Object.assign()方法。
        合并两个对象时，后面的属性会把前面的属性覆盖掉
    - 对象的新增方法
        - Object.is() 用来比较两个值是否严格相等，与严格比较运算符（===）的行为基本一致。
            ```
            Object.is(+0, -0) // false
            Object.is(NaN, NaN) // true
            Object.is('foo', 'foo') // true
            Object.is({}, {}) // false
            ```
        - Object.assign() 用于对象的合并，将源对象（source）的所有可枚举属性，复制到目标对象（target）。
            ```
            Object.assign(target, source1, source2);
            ```
        - Object.getOwnPropertyDescriptors() 返回指定对象所有自身属性（非继承属性）的描述对象。
            该方法的引入目的，主要是为了解决Object.assign()无法正确拷贝get属性和set属性的问题。
            这时，Object.getOwnPropertyDescriptors()方法配合Object.defineProperties()方法，就可以实现正确拷贝。
            ```
            const source = {
              set foo(value) {
                console.log(value);
              }
            };

            const target2 = {};
            Object.defineProperties(target2, Object.getOwnPropertyDescriptors(source));
            Object.getOwnPropertyDescriptor(target2, 'foo')
            // { get: undefined,
            //   set: [Function: set foo],
            //   enumerable: true,
            //   configurable: true }
            ```
        - __proto__属性，
        - Object.setPrototypeOf()
        - Object.getPrototypeOf()
        - Object.keys()  -> ES5的语法，返回数组，成员参数是对象自身可比案例的属性键名
        - Object.values()
            方法返回一个数组，成员是参数对象自身的（不含继承的）所有可遍历（enumerable）属性的键值。
        - Object.entries()
            方法返回一个数组，成员是参数对象自身的（不含继承的）所有可遍历（enumerable）属性的键值对数组。
        - Object.fromEntries()
        Object.fromEntries()方法是Object.entries()的逆操作，用于将一个键值对数组转为对象。
- Set 和 Map数据结构
- Promise对象
- async函数
- Class的基本用法
- Class的继承

参考文章： https://juejin.im/post/5c6234f16fb9a049a81fcca5













