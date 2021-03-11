#### 开发规范说明

##### 1. AMD(Asynchromous Module Definition - 异步模块定义)
AMD是RequireJS在推广过程中对模块定义的规范化产出，AMD是异步加载模块，推崇依赖前置。
```javascript 
define('module1', ['jquery'], ($) => {
  //do something...
});
```

##### 2. CMD(Common Module Definition - 公共模块定义)
CMD是SeaJS在推广过程中对模块定义的规范化产出，对于模块的依赖，CMD是延迟执行，推崇依赖就近。

如下代码，只有当真正执行到fun1方法时，才回去执行jquery。
```javascript 
define((require, exports, module) => {
  module.exports = {
    fun1: () => {
       var $ = require('jquery');
       return $('#test');
    }
  };
});
```
##### 3. Commonjs
CommonJS是服务端模块的规范，由于Node.js被广泛认知。

根据CommonJS规范，一个单独的文件就是一个模块。加载模块使用require方法，该方法读取一个文件并执行，最后返回文件内部的module.exports对象。

> CommonJS 加载模块是同步的，所以只有加载完成才能执行后面的操作。像Node.js主要用于服务器的编程，加载的模块文件一般都已经存在本地硬盘，所以加载起来比较快，不用考虑异步加载的方式，所以CommonJS规范比较适用。但如果是浏览器环境，要从服务器加载模块，这是就必须采用异步模式。所以就有了 AMD CMD 解决方案。
```javascript 
//file1.js
moudle.exports = {
  a: 1
};
 
//file2.js
var f1 = require('./file1');
var v = f1.a + 2;
module.exports ={
  v: v
};
```
##### 4. UMD(Universal Module Definition - 通用模块定义)
UMD是AMD和CommonJS的一个糅合。AMD是浏览器优先，异步加载；CommonJS是服务器优先，同步加载。

既然要通用，怎么办呢？那就先判断是否支持node.js的模块，存在就使用node.js；再判断是否支持AMD（define是否存在），存在则使用AMD的方式加载。这就是所谓的UMD
```javascript 
((root, factory) => {
  if (typeof define === 'function' && define.amd) {
    //AMD
    define(['jquery'], factory);
  } else if (typeof exports === 'object') {
    //CommonJS
    var $ = requie('jquery');
    module.exports = factory($);
  } else {
    //都不是，浏览器全局定义
    root.testModule = factory(root.jQuery);
  }
})(this, ($) => {
  //do something...  这里是真正的函数体
});
```
##### 5. ESM(ECMA Script Modules)
ESM是ES6中的模块化规范，在nodeJS新版本中可以直接使用，现在大部分浏览器也开始支持（在script标签上设置type="module"），

ES6 在语言标准的层面上，实现了模块功能，而且实现得相当简单，完全可以取代现有的 CommonJS 和 AMD 规范，成为浏览器和服务器通用的模块解决方案
```javascript 
// 写法一
export var m = 1;
// 写法二
var m = 1; export { m };
// 写法三
var n = 1; export { n as m };
// 写法四
var n = 1; export default n;
// 写法五
if (true) { import('./myModule.js').then(({ export1, export2 }) => { /* ... */ }); }
// 写法六
Promise.all([import('./module1.js'),
import('./module2.js'),
import('./module3.js')]).then(([module1, module2, module3]) => { /* ... */ });
```


#### 几种规范在开发npm包中的综合应用(以ant-design为例)

##### 1.UMD: ant-design dist文件下的 UMD 模块化规范
```javascript
(function webpackUniversalModuleDefinition(root, factory) {
  // commonjs 规范
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("moment"), require("react"), require("react-dom"));
  
  // amd 规范
	else if(typeof define === 'function' && define.amd)
		define(["moment", "react", "react-dom"], factory);
  // 另一种 commonjs 规范
	else if(typeof exports === 'object')
		exports["antd"] = factory(require("moment"), require("react"), require("react-dom"));
	else
  // 容错处理，把ant全局变量放在window上
		root["antd"] = factory(root["moment"], root["React"], root["ReactDOM"]);
})(window, function(__WEBPACK_EXTERNAL_MODULE_moment__, __WEBPACK_EXTERNAL_MODULE_react__, __WEBPACK_EXTERNAL_MODULE_react_dom__){
  return function() {
    // ....
  }
  // ....
}
```

##### 2.ESM: ant-design es 文件夹下的ES Modules 模块化规范，都在index.js文件下
```javascript 
export { default as Affix } from './affix';
export { default as Anchor } from './anchor';
export { default as AutoComplete } from './auto-complete';
export { default as Alert } from './alert';
// 省略若干组件引用...
export { default as Mention } from './mention';
export { default as Upload } from './upload';
export { default as version } from './version';
```


##### 3.ES5: ant-design lib 文件夹下的 ES5 模块化规范，都在index.js文件下
```javascript 
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "Affix", {
  enumerable: true,
  get: function get() {
    return _affix["default"];
  }
});

// 省略若干组件引用...

Object.defineProperty(exports, "version", {
  enumerable: true,
  get: function get() {
    return _version["default"];
  }
});
var _affix = _interopRequireDefault(require("./affix"));

// 省略若干组件引用...

var _version = _interopRequireDefault(require("./version"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/* @remove-on-es-build-begin */
// this file is not used if use https://github.com/ant-design/babel-plugin-import
var ENV = process.env.NODE_ENV;

if (ENV !== 'production' && ENV !== 'test' && typeof console !== 'undefined' && console.warn && // eslint-disable-line no-console
typeof window !== 'undefined') {
  // eslint-disable-next-line no-console
  console.warn('You are using a whole package of antd, ' + 'please use https://www.npmjs.com/package/babel-plugin-import to reduce app bundle size.');
}
```