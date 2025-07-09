import { useState, useEffect } from "react";

const useDrag = ({
  mapTop,
  mapLeft,
  zoom,
  setPins,
  pins,
  scrollLeft,
  scrollTop,
}) => {
  const [draggingPin, setDraggingPin] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const handleStartDragging = (event, id) => {
    event.stopPropagation();
    setDraggingPin(id);
    setIsDragging(true);
  };

  const handleMouseMove = (event) => {
    const relativeX = (event.clientX - mapLeft + scrollLeft) / zoom;
    const relativeY = (event.clientY - mapTop + scrollTop) / zoom;
    updatePosition(draggingPin, relativeX, relativeY);
  };

  const stopDragging = () => {
    setDraggingPin(null);
    setTimeout(() => setIsDragging(false), 500);
  };

  const updatePosition = (id, relativeX, relativeY) => {
    const pinsCopy = pins.map((pin) => {
      if (pin.id !== id) {
        return pin;
      } else {
        return {
          ...pin,
          x: relativeX,
          y: relativeY,
        };
      }
    });
    setPins(pinsCopy);
  };

  useEffect(() => {
    if (draggingPin) {
      console.log(draggingPin);
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", stopDragging);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", stopDragging);
    };
  }, [draggingPin]);

  return {
    isDragging,
    draggingPin,
    handleStartDragging,
    handleMouseMove,
    stopDragging,
    updatePosition,
  };
};

export default useDrag;
