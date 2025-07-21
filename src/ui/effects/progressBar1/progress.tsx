import React from "react";
import { useEffect, useState, useRef } from "react";
import './styles.css';

function ProgressBar({value=50}) {
  const percentage = value/100;
  const progressBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if(progressBarRef.current){
      progressBarRef.current.classList.add('bar-contents--filled');
      progressBarRef.current.style.transform = `scaleX(${percentage})`
    }
  },[]);

  return (
    <div className="bar">
      <div
        className="bar-contents"
        ref={progressBarRef}
      />
    </div>
  );
}

const ProgressBarContainer = () => {
  const [bars, setBars] = useState(0);

  return (
    <div className="wrapper">
      <div>
        <button
          onClick={() => {
            setBars(bars + 1);
          }}
        >
          Add
        </button>
      </div>
      <div className="bars">
        {Array(bars)
          .fill(null)
          .map((_, index) => (
            <ProgressBar key={index} />
          ))}
      </div>
    </div>
  );
}

export default ProgressBarContainer;