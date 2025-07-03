import "./App.css";
import Dialog from "./components/Dialogue/Dialog";
import * as React from "react";

function App() {
  const [isVisible, setIsVisible] = React.useState();
  return (
    <>
      <button onClick={() => setIsVisible((prev) => !prev)}>open modal</button>
      <textarea></textarea>
    </>
  );
}

export default App;
