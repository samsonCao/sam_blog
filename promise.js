const PENDING = "PENDING"; // 等待
const RESOLVED = "RESOLVED"; // 成功
const REJECTED = "REJECTED"; // 失败

// promise2 === x
// const p = new Promise((resolve, reject) => {}).then(() => {
//   return p
// })
const resolvePromise = (promise2, x, resolve, rejected) => {
  if (promise2 === x) {
    return rejected(
      new TypeError("Chaining cycle detected for promise #<Promise>")
    );
  }
  let called; // called 防止既调 resolve 又调 rejected
  // x是函数，说明x是promise。x是普通值，返回抛出给下个promise
  if ((typeof x === "object" && x !== null) || typeof x === "function") {
    try {
      let then = x.then;
      if (typeof then === "function") {
        then.call(
          x,
          (y) => {
            if (called) return;
            called = true;
            // 这个函数其实是 onfulfilled
            // 解决then里面再次返回promise的问题，递归循环执行
            // y是then里面的返回值，y可能是函数，也可能是普通值
            resolvePromise(promise2, y, resolve, rejected);
          },
          (r) => {
            if (called) return;
            called = true;
            // 这个函数其实是 onrejected
            rejected(r);
          }
        );
      } else {
        resolve(x);
      }
    } catch (error) {
      if (called) return;
      called = true;
      rejected(error);
    }
  } else {
    resolve(x);
  }
};

class Promise {
  constructor(executor) {
    this.status = PENDING;

    this.value = undefined; // 成功的值
    this.reason = undefined; // 失败原因

    this.onfulfilledCallbacks = []; // 成功回调
    this.onrejectedCallbacks = []; // 失败回调

    const resolved = (value) => {
      if (this.status === PENDING) {
        this.status = RESOLVED;
        this.value = value;
        this.onfulfilledCallbacks.forEach((fn) => fu());
      }
    };

    const rejected = (reason) => {
      if (this.status === PENDING) {
        this.status = REJECTED;
        this.reason = reason;
        this.onrejectedCallbacks.forEach((fn) => fu());
      }
    };

    try {
      executor(resolved, rejected);
    } catch (err) {
      rejected(e);
    }
  }

  // promise 必须有一个then方法，then 接收两个参数，分别是 promise 成功的回调 onFulfilled,
  // 和 promise 失败的回调 onRejected；「规范 Promise/A+ 2.2」

  //如果调用 then 时，promise 已经成功，则执行onFulfilled，参数是promise的value；
  // 如果调用 then 时，promise 已经失败，那么执行onRejected, 参数是promise的reason；
  // 如果 then 中抛出了异常，那么就会把这个异常作为参数，传递给下一个 then 的失败的回调onRejected；
  then(onfulfilled, onrejected) {
    // 如果then内部不传参数，补全一下
    onfulfilled =
      typeof onfulfilled === "function" ? onfulfilled : (value) => value;
    onrejected =
      typeof onrejected === "function"
        ? onrejected
        : (err) => {
            throw err;
          };

    // 为什么要try catch 为什么要setTimeout?

    // then链式调用，因此需要返回promise实例 // executor会立即执行，因此包裹后内部的方法也会立即执行
    let promise2 = new Promise((resolve, rejected) => {
      //  promise内部的executor方法是同步 直接执行
      if (this.status === RESOLVED) {
        // onFulfilled or onRejected must not be called until the execution context stack contains only platform code. [3.1].
        // Promise/A+ 2.2.4 --- setTimeout
        // 如果不用定时器，new Promise还没完成，此时拿到的promise2实例其实是会报错的，因为实例还没返回。
        setTimeout(() => {
          // 如果 then 中抛出了异常，那么就会把这个异常作为参数，传递给下一个 then 的失败的回调onRejected
          try {
            // this.value是上一个promise的结果。x是then方法中执行的结果，把x在下一个promise的resolve中执行，
            // 所以下一个then就接收到上一个then的结果了
            // x 可能是普通值，也可能是promise，因此需要包装处理一下
            let x = onfulfilled(this.value);
            resolvePromise(promise2, x, resolve, rejected);
          } catch (e) {
            rejected(e);
          }
        }, 0);
      }
      if (this.status === REJECTED) {
        setTimeout(() => {
          try {
            let x = onrejected(this.reason);
            resolvePromise(promise2, x, resolve, rejected);
          } catch (e) {
            rejected(e);
          }
        }, 0);
      }

      // promise内部的executor方法是异步，先订阅好
      if (this.status === PENDING) {
        this.onfulfilledCallbacks.push(() => {
          setTimeout(() => {
            try {
              let x = onfulfilled(this.value);
              resolvePromise(promise2, x, resolve, rejected);
            } catch (e) {
              rejected(e);
            }
          }, 0);
        });
        this.onrejectedCallbacks.push(() => {
          setTimeout(() => {
            try {
              let x = onrejected(this.reason);
              resolvePromise(promise2, x, resolve, rejected);
            } catch (e) {
              rejected(e);
            }
          }, 0);
        });
      }
    });
    return promise2;
  }

  // then catch finally可以在实例上调用
  // 类似 Promise.prototype.then
  // 类似 Promise.prototype.catch
  // 类似 Promise.prototype.finally

  //catch 用来捕获 promise 的异常，就相当于一个没有成功的 then
  catch(errorCallback) {
    // 类上的this 指向 Class 类本身
    return this.then(null, errorCallback);
  }

  // finally 表示不是最终的意思，而是无论如何都会执行的意思。
  // 如果返回一个 promise 会等待这个 promise 也执行完毕。如果返回的是成功的 promise，
  // 会采用上一次的结果；如果返回的是失败的 promise，会用这个失败的结果，传到 catch 中。
  finally(callback) {
    return this.then((value)=>{
      return Promise.resolve(callback()).then(()=>value)
    },(reason)=>{
      return Promise.resolve(callback()).then(()=>{throw reason})
    })  
  }

  // 加static只能在Promise类上调用，不能在实例上调用。比如 const p = new Promise(() => {})
  // p.resolve() 就会报错，因为实例p上拿不到这个方法
  // 只能通过 new Promise().resolve() 可以调用

  static resolve(data) {
    return new Promise((resolve) => {
      resolve(data);
    });
  }

  static reject(reason) {
    return new Promise((_, reject) => {
      reject(reason);
    });
  }

  // 全部返回再返回
  static all(values) {
    if (!Array.isArray(values)) {
      const type = typeof values;
      return new TypeError(`TypeError: ${type} ${values} is not iterable`);
    }
    return new Promise((resolve, reject) => {
      let resultArr = [];
      let orderIndex = 0;
      const processResultByKey = (res, i) => {
        resultArr[i] = res;
        if (orderIndex.length === resultArr.length) {
          resolve(resultArr);
        }
      };

      for (let i = 0; i < values.length; i++) {
        const value = values[i];
        // 数组是promise时，调用then,onFulfilled 返回时 resolve出结果
        if (value && typeof value.then === "function") {
          value.then((res) => {
            processResultByKey(res, i);
          }, reject);
        } else {
          processResultByKey(value, i);
        }
      }
    });
  }

  // 只要有一个结果返回就返回
  static race(values) {
    return new Promise((resolve, reject) => {
      for (let i = 0; i < values.length; i++) {
        const value = values[i];
        if (value && typeof value.then === "function") {
          value.then(resolve, reject);
        } else {
          resolve(value);
        }
      }
    });
  }
}

module.exports = Promise;
