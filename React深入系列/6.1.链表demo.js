class Update {
  constructor(payload) {
    this.payload = payload; // 数据 可以是函数或者对象
    this.nextUpdate = null; // 指针
  }
}

class UpdateQueue {
  constructor() {
    this.baseState = null;
    this.firstUpdate = null;
    this.lastUpdate = null;
  }

  enqueueUpdate(update) {
    if (this.firstUpdate == null) {
      this.firstUpdate = this.lastUpdate = update;
    } else {
      // 上一个update实例的nextUpdate指针指向下一个update
      this.lastUpdate.nextUpdate = update;
      // 更新下一个update
      this.lastUpdate = update;
    }
  }

  forceUpdate() {
    let currentState = this.baseState || {};
    let currentUpdate = this.firstUpdate;
    while (currentUpdate) {
      // 函数时把函数的实际参数 currentState 传进去
      let nextState = typeof currentUpdate.payload === 'function' ? 
        currentUpdate.payload(currentState) : currentUpdate.payload;
      currentState = {...currentState, ...nextState};
      currentUpdate = currentUpdate.nextUpdate;
    }
    this.firstUpdate = this.lastUpdate = null
    this.baseState = currentState;
    return currentState;
  }
}

const queue = new UpdateQueue();

queue.enqueueUpdate(new Update({ name: 'sam' }));
queue.enqueueUpdate(new Update({ number: 0 }));
queue.enqueueUpdate(new Update(state => ({ number: state.number + 1 })));
queue.enqueueUpdate(new Update(state => ({ number: state.number + 1 })));

queue.forceUpdate();
console.log(queue);

console.log(queue.baseState);
