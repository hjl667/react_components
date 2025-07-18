import { useState } from "react";
import "./styles.css";
import React from "react";

interface CalculatorProps {
  display: number;
  buttons: string[];
  handleClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const Calculator: React.FC<CalculatorProps> = ({display, buttons, handleClick}) => {
  return (
    <div className="calculator">
      <div className="calculator-display">{display}</div>
      <div className="calculator-buttons">
        {
          buttons.map((button, index)=>
            <button className={`calculator-button ${button == '=' ? 'equal-button' : ''}`} onClick={(e)=>handleClick(e)} key={index} value={button}>
              {button}
              </button>)
        }
      </div>
    </div>
  )
}

const CalculatorContainer = () => {
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

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const btnValue = (event.target as HTMLButtonElement).value;
    if (!isNaN(Number(btnValue))) {
      const digit = parseInt(btnValue);
      if (overwrite) {
        setDisplay(Number(btnValue));
        setOverwrite(false);
      } else {
        setDisplay((prev) => prev * 10 + digit);
      }
    } else {
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
    <Calculator
      display={display}
      buttons={buttons}
      handleClick={handleClick}
      />
  );  
};

export default CalculatorContainer;
