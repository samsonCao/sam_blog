function Person() {
    this.age = 0;
    setTimeout(() => {
        // 箭头函数不绑定this，此处的this是在Person对象中执行的，
        // 会捕获执行上下文Person中的this，因此指向的是Person对象
        console.log(this);
    }, 3000)
}
var p = new Person();

function Person2() {
    this.age = 0;
    setTimeout(function () {
        // 普通函数绑定this,此时的this指向全局对象Window
        console.log(this)
    }, 3000)
}
var p = new Person2();
