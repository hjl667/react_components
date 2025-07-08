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
