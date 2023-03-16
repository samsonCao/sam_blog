// 给对象随机字符串
function symbolKey(obj) {
  const unique = "00" + Math.random();
  if (obj.hasOwnProperty(unique)) {
    arguments.callee(obj);
  }
  return unique;
}

// 前置知识，为什么this可以获取调用call的函数，因为this执行函数执行时的作用域

// call someFunc.call(thisArg, arg1, arg2, ...)
Function.prototype.myCall = function (context) {
  var context = context || window;

  var fn = symbolKey(context);
  var args = arguments;
  context[fn] = this;
  if (arguments.length === 0 || arguments.length === 1) {
    return context[fn]();
  }
  var fnStr = "context[fn](";
  for (var i = 1; i < arguments.length; i++) {
    if (arguments.length === i + 1) {
      fnStr += arguments[i];
    } else {
      fnStr += args[i] + ",";
    }
  }
  fnStr += ")";
  var result = eval(fnStr);
  delete context[fn];
  return result;
};

Function.prototype.myApply = function (context) {
  var context = context || window;

  var fn = symbolKey(context);
  var args = arguments[1];
  context[fn] = this;
  if (!args) {
    return context[fn]();
  }
  var fnStr = "context[fn](";
  for (var i = 0; i < args.length; i++) {
    if (args.length === i + 1) {
      fnStr += args[i];
    } else {
      fnStr += args[i] + ",";
    }
  }
  fnStr += ")";
  var result = eval(fnStr);
  delete context[fn];
  return result;
};

// bind  function.bind(thisArg[, arg1[, arg2[, ...]]])
/**
 * bind() 方法会创建一个新函数，
 * 当这个新函数被调用时，它的 this 值是传递给 bind() 的第一个参数,
 * 它的参数是 bind() 的其他参数和其原本的参数，
 * bind返回的绑定函数也能使用new操作符创建对象：
 * 这种行为就像把原函数当成构造器。
 * 提供的this值被忽略，同时调用时的参数被提供给模拟函数。。
 * @param {*} context
 * @returns
 */
//简单模拟bind函数
Function.prototype.bind = function (context) {
  var originFunc = this;
  // F.bind(obj, args....) 获取参数args
  var args = Array.prototype.slice.myCall(arguments, 1);
  var F = function () {};
  F.prototype = originFunc.prototype;
  var bound = function () {
    // F.bind(obj, args....)(innerArgs...) // 获取内部参数
    var innerArgs = Array.prototype.slice.myCall(arguments);
    var finalArgs = args.concat(innerArgs);
    return originFunc.myApply(
      this instanceof F ? this : context || this,
      finalArgs
    );
  };
  bound.prototype = new F();
  return bound;
};

// new

function myNew() {
  var args = Array.prototype.slice.call(arguments);
  // 获取并从原数组中删除第一项
  var constructorFunc = args.shift();
  if (typeof constructorFunc !== "function") {
    throw new Error("should be function");
  }
  var obj = {};
  //
  obj.__proto__ = constructorFunc.prototype;
  constructorFunc.apply(obj, args);
  return obj;
}
