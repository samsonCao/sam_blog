/**
 * Composes single-argument functions from right to left. The rightmost
 * function can take multiple arguments as it provides the signature for
 * the resulting composite function.
 *
 * @param {...Function} funcs The functions to compose.
 * @returns {Function} A function obtained by composing the argument functions
 * from right to left. For example, compose(f, g, h) is identical to doing
 * (...args) => f(g(h(...args))).
 */

export default function compose(...funcs) {
  if (funcs.length === 0) {
    return arg => arg
  }

  if (funcs.length === 1) {
    return funcs[0]
  }

  return funcs.reduce((a, b) => (...args) => a(b(...args)))

  // 把 [f1, f2, f3, f4] 转换成 f1(f2(f3(f4(...args))))
  // 用非箭头函数的写法实现如下：遍历
  // funcs = [f1, f2, f3, f4]
  // return funcs.reduce(function(a, b) {
  //   return function(...args) {
  //     return a(b(...args))
  //   }
  // })

  // 第几轮循环       a的值                   b的值           返回值
  // 1              f1                     f2          f1(f2(...args))
  // 2              f1(f2(...args))        f3          f1(f2(f3(...args)))
  // 3              f1(f2(f3(...args)))    f4          f1(f2(f3(f4(...args))))
}
