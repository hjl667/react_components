//把一个需要传callback function的老式的异步函数，变成return 一个promise的形式。

function doAThing(
  error: boolean,
  callback: (message: string | null, err?: string) => void
): void {
  if (error) {
    return callback(null, "Ooops!");
  } else {
    callback("Hello Apple");
  }
}

const doAThingPromisified = (error: boolean): Promise<string> => {
  return new Promise((resolve, reject) => {
    doAThing(error, (message, err) => {
      if (err) {
        reject(err);
      } else {
        resolve(message as string);
      }
    });
  });
};

const promisify = (func) => {
  return function (...args) {
    return new Promise((resolve, reject) => {
      func(...args, (message, error) => {
        if (error) {
          reject(error);
        } else {
          resolve(message);
        }
      });
    });
  };
};

doAThing(false, (message, err) => {
  if (err) {
    console.log(err);
  } else {
    console.log(message);
  }
});

doAThingPromisified(false)
  .then((value) => console.log(value))
  .catch((error) => console.log(error));
