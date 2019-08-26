- createStore 创建 store 对象，包含 getState, dispatch, subscribe, replaceReducer

- reducer reducer 是一个计划函数，接收旧的 state 和 action，生成新的 state

- action action 是一个对象，必须包含 type 字段

- dispatch dispatch( action ) 触发 action，生成新的 state

- subscribe 实现订阅功能，每次触发 dispatch 的时候，会执行订阅函数

- combineReducers 多 reducer 合并成一个 reducer

- replaceReducer 替换 reducer 函数

- middleware 扩展 dispatch 函数！

- componse 把 [f1, f2, f3, f4] 转换成 f1(f2(f3(f4(...args)))) 用在中间件中的一个函数


参考： https://github.com/xiaomuzhu/front-end-interview/blob/master/docs/guide/redux.md
