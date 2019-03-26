// 已知 List 和 values, 通过values的值，从List中找到对应的label值，生成新的数组['A', 'B', 'D']

```
const List = [
    {
        label: 'A',
        value: '1'
    },
    {
        label: 'B',
        value: '2'
    },
    {
        label: 'C',
        value: '3'
    },
    {
        label: 'D',
        value: '4'
    }];

const values = ['1', '2', '4'];

// 方法一、书写方便，但是计算量会稍微大一点
const result = List
    .filter(item => { if (values.includes(item.value)) { return item; } })
    .map(item => item.label);

// 方法二、书写复杂，但是map的计算效率会更快
const map = new Map();
List.forEach(item => {
    map.set(item.value, item.label);
});
const res = values.map(item => {
    return map.get(item);
});
```
