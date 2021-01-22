
> for key in xxx  遍历键名
> for value of xxx  遍历键值
#### for...in遍历键名  主要为遍历对象设计
> 不适用于遍历数组

- 数组的键名是数字，但是for...in循环是以字符串作为键名“0”、“1”、“2”等等。
- for...in循环不仅遍历数字键名，还会遍历手动添加的其他键，甚至包括原型链上的键。
- 某些情况下，for...in循环会以任意顺序遍历键名。

#### for...of遍历键值
- 一个数据结构只要部署了Symbol.iterator属性，就被视为具有 iterator 接口，
就可以用for...of循环遍历它的成员。也就是说，
for...of循环内部调用的是数据结构的Symbol.iterator方法。

##### 优点
- 有着同for...in一样的简洁语法，但是没有for...in那些缺点。
- 不同于forEach方法，它可以与break、continue和return配合使用。
- 提供了遍历所有数据结构的统一操作接口。

##### 使用场景
- for...of循环可以使用的范围包括数组、
    - Set 和 Map 结构、
    - 某些类似数组的对象（比如arguments对象、DOM NodeList 对象）、
    - 后文的 Generator 对象，
    - 以及字符串。`注意不包括对象`

