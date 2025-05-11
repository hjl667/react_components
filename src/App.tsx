import "./App.css";
import Dialog from "./Dialogue/Dialog";
import * as React from "react";

function App() {
  const [isVisible, setIsVisible] = React.useState();
  return (
    <>
      <button onClick={() => setIsVisible((prev) => !prev)}>open modal</button>
      <Dialog isVisible={isVisible} setIsVisible={setIsVisible}>
        <div>
          我看到了问题所在。在你的代码中，textarea 的高度设置为 height:
          "100%"，但它的父容器 .modal-content 没有明确的高度，所以 textarea
          无法正确展开。另外，你设置了 .modal-content 的 max-height:
          60vh，这会限制其最大高度。 我来解释一下为什么 modal 没有随着 textarea
          内容增加而变长，并提供解决方案。
        </div>
      </Dialog>
    </>
  );
}

export default App;
