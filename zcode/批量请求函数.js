// 模拟请求
function request(url) {
  return new Promise((resolve) => {
    const time = Math.random() * 1000;
    setTimeout(() => resolve(url), time);
  });
}
async function multiRequest(urls, maxNum) {
  let data = urls.map((url, index) => ({ index, url })); // 因为最终要按照顺序输出，所以给每个url追加一个index属性，用于记录在数组中的位置，确保按序输出
  let result = []; // 存放结果的数组
  // 巧用Array.from, length是开辟的数组长度，这个可以控制最大的并发数量。后面回调方法用于存放异步请求的函数
  let promises = Array.from({ length: Math.min(maxNum, data.length) }, () =>
    getChain(data, result)
  );
  console.log(promises, "promises======");
  // 利用Promise.all并发执行异步函数
  await Promise.all(promises);
  // 通过函数参数接收最终的一个结果
  return result;
}

async function getChain(data, res = []) {
  console.log(data, "ddd======");
  // 利用队列的思想，一个个pop出来执行，只要urls还有，就继续执行
  while (data.length) {
    let one = data.pop();
    try {
      let urlRes = await request(one.url);
      // 结果按照索引顺序存储
      res[one.index] = urlRes;
    } catch (e) {
      res[one.index] = e;
    }
  }
}
// 调用
const urls = [
  "www.example1.com",
  "www.example2.com",
  "www.example3.com",
  "www.example4.com",
  "www.example5.com",
];
// multiRequest(urls, 5).then((finalRes) => {
//   console.log("done", finalRes);
// });

// 数组扁平化
// console.log(flatter([1, 2, [1, [2, 3, [4, 5, [6]]]]]));

const flatter = (arr, depth = 0, index = 1) => {
  console.log(index, "depth");
  return arr.reduce((res, curr) => {
    // console.log(res, "pppp");
    return Array.isArray(curr)
      ? res.concat(flatter(curr, depth, index += 1))
      : res.concat(curr);
  }, []);
};

const res = flatter([1, 2, [1, [2, 3, [4, 5, [6]]]]], 5);
console.log(res, "res");
