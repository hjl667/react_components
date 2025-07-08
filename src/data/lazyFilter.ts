//function* 定义了一个generator
//predicate是一个条件判断函数
//generator是iterable的，可以提前break。

function* lazyFilter(array, predicate) {
  for (const item of array) {
    if (predicate(item)) {
      yield item;
    }
  }
}
