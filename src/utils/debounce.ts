//最后一次触发后delay时间执行
const debounce = (fn, delay = 300) => {
  let timer = null;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
};

//第一次触发的时候立即执行，但是后面再触发，就要等最后一次触发的delay时间后执行
const debounce = (fn, delay = 300) => {
  let timer = null;
  return function (...args) {
    const callNow = !timer;
    clearTimeout(timer);
    timer = setTimeout(() => {
      timer = null;
      fn(...args);
    }, delay);
    if (callNow) fn(...args);
  };
};

//如果传进来的是一个箭头函数，就不需要绑定this
const throttle = (fn, delay = 500) => {
  let lastExeTime = 0;
  return function (...args) {
    const now = Date.now();
    if (now - lastExeTime >= delay) {
      lastExeTime = now;
      fn(...args);
    }
  };
};

//可以通过options来解构获得配置参数
function throttleAdvanced(fn, delay = 300, options = {}) {
  let lastExecTime = 0;
  let timer = null;

  // 默认选项
  const { leading = true, trailing = true } = options;

  return function (...args) {
    const now = Date.now();
    const timeSinceLastExec = now - lastExecTime;

    // 清除之前的定时器
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }

    // 首次执行或间隔时间已满足
    if (leading && (lastExecTime === 0 || timeSinceLastExec >= delay)) {
      lastExecTime = now;
      fn.apply(this, args);
    }
    // 设置trailing执行
    else if (trailing) {
      timer = setTimeout(() => {
        lastExecTime = Date.now();
        timer = null;
        fn.apply(this, args);
      }, delay - timeSinceLastExec);
    }
  };
}
