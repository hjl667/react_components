class MyComponent {
  constructor(name) {
    this.name = name;
  }

  // 普通方法 - this 是动态绑定的
  regularMethod() {
    return `${this.name} called`;
  }

  // 箭头函数 - this 在定义时就确定了
  arrowMethod = () => {
    return `${this.name} called`;
  };

  setupTimer() {
    // 问题：this 会丢失
    setInterval(this.regularMethod, 1000);

    // 解决方案1：箭头函数
    setInterval(this.arrowMethod, 1000);

    // 解决方案2：bind
    setInterval(this.regularMethod.bind(this), 1000);
  }

  setupEventHandler() {
    // 问题：this 会丢失
    button.addEventListener("click", this.regularMethod);

    // 解决方案：箭头函数
    button.addEventListener("click", this.arrowMethod);
  }
}

for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 100);
}

for (let j = 0; j < 3; j++) {
  setTimeout(() => console.log(j), 100);
}
