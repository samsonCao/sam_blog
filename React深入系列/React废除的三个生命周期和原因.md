在 React 16.3 中，为下面三个生命周期钩子加上了 UNSAFE 标记:

UNSAFE_componentWillMount
UNSAFE_componentWillReceiveProps
UNSAFE_componentWillUpdate
新增了下面两个生命周期方法:

static getDerivedStateFromProps
getSnapshotBeforeUpdate


1. **为何移除 componentWillMount**

为在 React 未来的版本中，异步渲染机制可能会导致单个组件实例可以多次调用该方法。

很多开发者目前会将事件绑定、异步请求等写在 componentWillMount 中，一旦异步渲染时 componentWillMount 被多次调用，

将会导致：

进行重复的时间监听，无法正常取消重复的 Listener，更有可能导致内存泄漏

发出重复的异步网络请求，导致 IO 资源被浪费

在服务端渲染时，componentWillMount 会被调用，但是会因忽略异步获取的数据而浪费 IO 资源

现在，React 推荐将原本在 componentWillMount 中的网络请求移到 componentDidMount 中。

2. **为何移除 componentWillReceiveProps**

会引起死循环 

只要父组件引起了你的组件的重新render，你的组件就会触发componentWillReceiveProps方法，
即使你组件接收的props没有发生任何变化。

用getDerivedStateFromProps 与 componentDidUpdate一起将会替换掉所有的 componentWillReceiveProps。

3. **为何移除 componentWillUpdate**

异步渲染等机制的到来，render 过程可以被分割成多次完成，还可以被暂停甚至回溯，

这导致 componentWillUpdate 和 componentDidUpdate 执行前后可能会间隔很长时间，

足够使用户进行交互操作更改当前组件的状态，这样可能会导致难以追踪的 BUG。

因此用getSnapShotBeforeUpdate
    

