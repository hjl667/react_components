import { useState } from "react";
import "./styles.css";

const CalculatorUI = ({ display, buttons, handleClick }) => {
  return (
    <div style={{ width: "250px", border: "1px solid black", padding: "10px" }}>
      <div>{display}</div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "10px",
        }}
      >
        {buttons.map((button, index) => (
          <button
            onClick={(event) => handleClick(event)}
            className={`${button === "0" ? "zero" : ""} ${
              ["x", "-", "+", "="].includes(button) ? "orange" : ""
            }`}
            value={button}
            key={index}
          >
            {button}
          </button>
        ))}
      </div>
    </div>
  );
};

const Calculator = () => {
  const buttons = [
    "7",
    "8",
    "9",
    "x",
    "4",
    "5",
    "6",
    "-",
    "1",
    "2",
    "3",
    "+",
    "0",
    ".",
    "=",
  ];

  const [overwrite, setOverwrite] = useState(true);
  const [display, setDisplay] = useState(0);
  const [prev, setPrev] = useState(0);
  const [operator, setOperator] = useState("");

  const handleClick = (event) => {
    const btnValue = event.target.value;
    if (!isNaN(btnValue)) {
      const digit = parseInt(btnValue);
      if (overwrite) {
        setDisplay(btnValue);
        setOverwrite(false);
      } else {
        setDisplay((prev) => prev * 10 + digit);
      }
    } else {
      console.log("not a number");
      if (btnValue !== "=") {
        setOperator(btnValue);
        setOverwrite(true);
        setPrev(display);
      } else {
        console.log("is equal");
        if (operator === "+") {
          setDisplay(prev + display);
        } else if (operator === "-") {
          setDisplay(prev - display);
        } else if (operator === "x") {
          setDisplay(prev * display);
        } else if (operator === ".") {
        } else {
          alert("Invalid input");
        }
      }
    }
  };

  return (
    <div>
      <CalculatorUI
        display={display}
        buttons={buttons}
        handleClick={handleClick}
      />
    </div>
  );
};

export default Calculator;
