 // 获取上一次的数据
function usePrevious(newValue) {
  const pre = useRef();
  const cur = useRef();
  pre.current = cur.current;
  cur.current = newValue;
  return pre;
}

// 防抖 hook
function useDebounce(fn, delay) {
  const ref = useRef(fn);

  let timer;
  ref.current = function() {
    const context = this;
    const args = arguments;
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(context, args);
    }, delay) 

  }
  return ref.current;
}