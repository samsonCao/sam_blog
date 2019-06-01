占位

https://github.com/mqyqingfeng/Blog/blob/master/articles/%E6%B7%B1%E5%85%A5%E7%B3%BB%E5%88%97%E6%96%87%E7%AB%A0/JavaScript%E6%B7%B1%E5%85%A5%E4%B9%8B%E7%BB%A7%E6%89%BF%E7%9A%84%E5%A4%9A%E7%A7%8D%E6%96%B9%E5%BC%8F%E5%92%8C%E4%BC%98%E7%BC%BA%E7%82%B9.md

一句话总结各种继承思想

1. 原型链继承

SubType.prototype = new SuperType();

2. 借用构造函数继承

SubType{SuperType.call(this, 'sam');}

3. 组合继承
SubType{SuperType.call(this, 'sam');}

SubType.prototype = new SuperType();

SubType.prototype.constructor = SubType;

4. 原型式继承
function F(){}

F.prototype = o;

return new F();

var person1 = Object.create(o);


