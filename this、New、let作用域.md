```
// 1.
var a = 11
function test () {
    this.a = 22
    let b = function () {
        console.log(this.a)
    }
    b()
}
var x = new test()  =>  11
x.a  =>  22
// 用到new说明有函数被当作构造函数来调用了。
// new会返回一个对象，
// 像这里var x = new test()的变量x就指向这个返回出来的对象，
// new在返回对象之前会把函数壳里面的代码拿出来执行一遍
// 但是，此时壳被剥去了，构造函数里面的函数执行环境自然就变了
// b()暴露给了这会儿在外面的执行环境（控制台的话是window）
// 此时的this执行window,因此this.a 输出 11

// 2.
var a = 11
function test () {
    this.a = 22
    let b = function () {
        console.log(this.a)
    }
    b()
}
var x = test()  =>  22 // 此时的x是undefined;
x.a  =>  Uncaught TypeError: Cannot read property 'a' of undefined

// 3.
var a = 11
function test () {
    this.a = 22
    let b = () => {
        console.log(this.a)
    }
    b()
}
var x = new test() =>   22 // 此时的c是对象test-- {a: 2}
x.a  =>  22

// 4.
var a = 11
function test () {
    this.a = 22
    let b = () => {
        console.log(a)  // 此处的a是全局作用域var a = 11
    }
    b()
}
var x = new test()  =>   11
x.a  =>  22
```
