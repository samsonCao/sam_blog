/**
 * 发布订阅模式又叫观察者模式，是一对多的关系。
 * 一个主题对象，多个观察者去监听这个主题对象
 * 主题对象变化，会通知所有观察者，让观察者收到消息自动更新
 * @type {{}}
 */

//主题对象
let Boss = {};

// 存放订阅者的回调函数，等待执行
Boss.clientList = [];

// 主题对象用来订阅观察者的事件，放在事件队列中
Boss.listen = function(key, fn) {

    // 如果当前观察者不存在，就创建一个和当前观察者相关的事件队列
    if (!this.clientList[key]) {
        this.clientList[key] = [];
    }

    // 如果观察者存在了，就把对应的事件放在事件队列中
    // todo 注意，这里会产生一个问题，this.clientList.length 始终是0 并不会随着push增加 知道什么原因的可以告诉我
    this.clientList[key].push(fn);
};

// 观察者被通知，触发回调函数
Boss.trigger = function() {

    // 获取被触发函数的第一个参数，这里用到了数组的shift方法。
    // arguments对象通过call方法劫持(借用)了数组的shift方法
    // 准确的说是把arguments对象放在了数组shift方法的作用于中执行一次
    // 通过shift方法获取了函数参数对象的第一个参数
    // 这里是下文中Boss.trigger('老王', '143平米');
    // Boss.trigger('老李', '1555平米'); 这两个函数的参数老王/老李
    // shift方法会去掉arguments的第一个参数老王
    const key = Array.prototype.shift.call(arguments);
    // 此时的arguments从('老王', '143平米')变成('143平米')
    // 此时的key变成老王

    // 对应老王listen的回调函数和老李listen的回调函数，可能有多个，是个数组
    const fns = this.clientList[key];

    if (!fns || !fns.length) {
        return;
    }

    // 循环数组，数组的每一项是注册回调函数
    for (let i = 0; i < fns.length; i++) {
        // 获取回到函数
        let fn = fns[i];
        // 函数执行，把当前函数通过apply方法放到Boss主题作用域中
        // 此时的arguments已经去掉了Boss.trigger的第一个参数,只留下143平米
        //
        console.log(arguments, 'arguments');
        // 这里执行的是下面的代码
        // function(msg) {
        // arguments是实参，msg是形参，
        //     console.log('老王订阅的户型' + msg);
        // })
        fn.apply(this, arguments);
    }
};
Boss.listen('老王', function(msg) {
    console.log('老王订阅的户型' + msg);
});
Boss.listen('老李', function(msg) {
    console.log('老李订阅的户型' + msg);
});
console.log(Boss, '12312');
console.log(Boss.clientList, '999');

Boss.trigger('老王', '143平米');
Boss.trigger('老李', '1555平米');
