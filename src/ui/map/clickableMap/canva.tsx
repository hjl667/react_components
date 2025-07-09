import { useState, useRef, useEffect } from "react";
import Edge from "./Edge";

const ClickableMap = () => {
  const [markers, setMarkers] = useState([]);
  const [recX, setRecX] = useState(0);
  const [recY, setRecY] = useState(0);
  const recRef = useRef(null);

  useEffect(() => {
    if (recRef.current) {
      const rectangle = recRef.current.getBoundingClientRect();
      setRecX(rectangle.left);
      setRecY(rectangle.top);
    }
  }, []);

  const handleMapClick = (event) => {
    const marker = {
      id: Date.now(),
      x: event.clientX - recX,
      y: event.clientY - recY,
    };
    setMarkers((prev) => [...prev, marker]);
  };

  const removeMarker = (id) => {
    const newMarkers = markers.filter((marker) => marker.id !== id);
    setMarkers(newMarkers);
  };

  return (
    <div
      className="rectangleContainer"
      ref={recRef}
      style={{
        width: "600px",
        height: "500px",
        border: "1px, solid, black",
        position: "relative",
        background: "lightgrey",
      }}
      onClick={(event) => handleMapClick(event)}
    >
      {markers.map((marker) => (
        <div
          style={{
            position: "absolute",
            width: "8px",
            height: "8px",
            backgroundColor: "black",
            color: "white",
            borderRadius: "50%",
            top: marker.y,
            left: marker.x,
            cursor: "pointer",
          }}
          onClick={(event) => {
            event.stopPropagation();
            removeMarker(marker.id);
          }}
        >
          {`x: ${marker.x} y: ${marker.y}`}
        </div>
      ))}
      {markers.length === 2 && (
        <Edge
          startX={markers[0].y}
          startY={markers[0].x}
          endX={markers[1].y}
          endY={markers[1].x}
          delta={1}
        />
      )}
    </div>
  );
};

export default ClickableMap;
