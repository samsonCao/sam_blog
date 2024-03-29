- class 实现原理
- constructor 实现原理
- extend 实现原理
- super 实现原理

```javascript
// _classCallCheck
// 一个class就是通过创建并执行一个匿名函数，
// 在这个匿名函数中声明function Parent,最后返回Parent。
class Parent {
  constructor(a, b) {
    // Parent函数内的a,b是参数
    // 单纯的this.field1 = a;
    this.filed1 = a;

    // 单纯的const
    const aaa = 999;
  }

  // _defineProperty
  filed2 = 2;

  //_defineProperty
  func1 = function () {};

  //_createClass(Parent, [{}]
  render() {
    return 9;
  }
  thiscall() {
    console.log(b);
    return 8;
  }
  static fn() {
    console.log("static");
  }
}

//_inherits(Child, _Parent);
class Child extends Parent {
  //  function Child(a, b) {}
  constructor(a, b) {
    //_this = _possibleConstructorReturn(this, _getPrototypeOf(Child).call(this, a));
    super(a);

    this.filed3 = b;
  }
  // _classCallCheck(this, Child)

  //_defineProperty
  filed4 = 1;

  // _defineProperty
  func2 = function () {};
}
```

经过 babel 编译过的代码

```javascript
"use strict";

// 回调判断obj是symbol类型还是其他类型
function _typeof(obj) {
  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function _typeof(obj) {
      return typeof obj;
    };
  } else {
    _typeof = function _typeof(obj) {
      return obj &&
        typeof Symbol === "function" &&
        obj.constructor === Symbol &&
        obj !== Symbol.prototype
        ? "symbol"
        : typeof obj;
    };
  }
  return _typeof(obj);
}

// super实现原理
// object类型和function类型返回call, 其它类型如果有super返回自身
function _possibleConstructorReturn(self, call) {
  if (call && (_typeof(call) === "object" || typeof call === "function")) {
    return call;
  }
  return _assertThisInitialized(self);
}

// 寻找对象原型,读取一个对象的 prototype 对象
function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf
    ? Object.getPrototypeOf
    : function _getPrototypeOf(o) {
        return o.__proto__ || Object.getPrototypeOf(o);
      };
  return _getPrototypeOf(o);
}

// 检测是否调用super
function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError(
      "this hasn't been initialised - super() hasn't been called"
    );
  }
  return self;
}

// extends实现原理
// 子类的prototype增加constructor属性指向一个对象,
// 可以看出extend背后是通过js的原型链实现的。
// 其中在class b extends a中要将a传入b中。
function _inherits(subClass, superClass) {
  // 检测父类是否可继承，确保superClass为function
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }
  // subClass.prototype的[[prototype]]关联到superClass superClass.prototype
  // 使子类继承父类的属性，并且将constructor指向子类的构造函数
  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true,
    },
  });
  // 设置subclass的内置[[prototype]]与superClass相关联
  if (superClass) _setPrototypeOf(subClass, superClass);
}

// 子类的__proto__指向父类构造函数
function _setPrototypeOf(o, p) {
  _setPrototypeOf =
    Object.setPrototypeOf ||
    function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };
  return _setPrototypeOf(o, p);
}

// 检测左边的是右边的实例，说明是new出来的
function _instanceof(left, right) {
  if (
    right != null &&
    typeof Symbol !== "undefined" &&
    right[Symbol.hasInstance]
  ) {
    return right[Symbol.hasInstance](left);
  } else {
    return left instanceof right;
  }
}

//类型检测，检测对象是否是new出来的
function _classCallCheck(instance, Constructor) {
  if (!_instanceof(instance, Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

// 给对象添加属性
function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

// class实现原理
// 创建类基本属性和静态属性此处是Parent添加方法render...
// function _createClass(目标对象, 共有方法数组, 私有方法数组) {}
function _createClass(Constructor, protoProps, staticProps) {
  // 共有方法prototype原型对象上
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);

  // 私有方法写在了类上只有通过类才可以调用，实例化对象无法调用
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

// 设置属性
function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true,
    });
  } else {
    obj[key] = value;
  }
  return obj;
}

// _classCallCheck
var Parent =
  /*#__PURE__*/
  (function () {
    function Parent(a, b) {
      _classCallCheck(this, Parent);

      _defineProperty(this, "filed2", 2);

      _defineProperty(this, "func1", function () {});

      // Parent函数内的a,b是参数
      // 单纯的this.field1 = a;
      this.filed1 = a; // 单纯的const

      var aaa = 999;
    } // _defineProperty

    //_createClass(Parent, [{}]
    _createClass(
      Parent,
      [
        {
          key: "render",
          value: function render() {
            return 9;
          },
        },
        {
          key: "thiscall",
          value: function thiscall() {
            console.log(b);
            return 8;
          },
        },
      ],
      [
        {
          key: "fn",
          value: function fn() {
            console.log("static");
          },
        },
      ]
    );

    return Parent;
  })(); //_inherits(Child, _Parent);

var Child =
  /*#__PURE__*/
  (function (_Parent) {
    _inherits(Child, _Parent);

    //  function Child(a, b) {}
    // constructor实现原理
    function Child(a, b) {
      var _this;

      _classCallCheck(this, Child);

      //_this = _possibleConstructorReturn(this, _getPrototypeOf(Child).call(this, a));
      _this = _possibleConstructorReturn(
        this,
        _getPrototypeOf(Child).call(this, a)
      );

      _defineProperty(_assertThisInitialized(_this), "filed4", 1);

      _defineProperty(_assertThisInitialized(_this), "func2", function () {});

      _this.filed3 = b;
      return _this;
    } // _classCallCheck(this, Child)
    //_defineProperty

    return Child;
  })(Parent);
```
