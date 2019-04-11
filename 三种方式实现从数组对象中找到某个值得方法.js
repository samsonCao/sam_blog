const thisList = [
    {label: '橘子', value: 'juzi'},
    {label: '柿子', value: 'shizi'},
    {label: '苹果', value: 'pingguo'},
    {label: '柚子', value: 'youzi'},
];
// 目标 已知数组thisList, 已知value, 找出value对应的label值

/**
 * 方法1 数组遍历的方法查找
 * 10行代码
 */
const getLabelByValue = (list, value, label = 'label') => {
    list = list || [];
    let result;
    for(let i = 0; i < list.length; i++) {
        const item = list[i];
        if (item.value === value){
            result = item[label];
            break;
        }
    }
    return result;
};
console.log(getLabelByValue(thisList, 'pingguo')); // 苹果


/**
 * 方法2 结合数组的map方法和Map数据结构
 * 4行代码
 */
const getLabelByValue2 = (list, value, label = 'label') => {
    list = list || [];
    const mapList = list.map(item => [item.value, item[label]]);
    const map = new Map(mapList);
    return map.get(value);
};

console.log(getLabelByValue2(thisList, 'pingguo')); // 苹果


/**
 * 方法3 数组的find方法，参数是一个函数
 * 1行代码
 */
const getLabelByValue3 = (list, value, label = 'label') => {
    list = list || [];
    return list.find(item => item.value === value)[label];
};
console.log(getLabelByValue3(thisList, 'pingguo')); // 苹果
