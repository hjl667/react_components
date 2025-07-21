import React from 'react';
import { useEffect, useState } from 'react';

function ProgressBar({ shouldFill, onCompleted }) {
  const [startTransition, setStartTransition] =
    useState(false);

  // Start transition when the bar is no longer empty.
  useEffect(() => {
    if (shouldFill || startTransition) {
      return;
    }

    setStartTransition(true);
  }, [shouldFill]);

  return (
    <div className="bar">
      <div
        className={[
          'bar-contents',
          startTransition && 'bar-contents--filled',
        ]
          .filter(Boolean)
          .join(' ')}
        onTransitionEnd={() => {
          onCompleted();
        }}
      />
    </div>
  );
}

export default function App() {
  const [bars, setBars] = useState(0);
  const [numFilledUpBars, setNumFilledUpBars] = useState(0);

  return (
    <div className="wrapper">
      <div>
        <button
          onClick={() => {
            setBars(bars + 1);
          }}>
          Add
        </button>
      </div>
      <div className="bars">
        {Array(bars)
          .fill(null)
          .map((_, index) => (
            <ProgressBar
            shouldFill={index > numFilledUpBars}
              key={index}
              onCompleted={() => {
                setNumFilledUpBars(numFilledUpBars + 1);
              }}
            />
          ))}
      </div>
    </div>
  );
}
