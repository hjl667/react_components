import { useState, useEffect } from "react";

const Point = ({ x, y }) => {
  return (
    <div
      style={{
        position: "absolute",
        top: x,
        left: y,
        width: "5px",
        height: "5px",
        borderRadius: "50%",
        backgroundColor: "red",
      }}
    ></div>
  );
};

const Edge = ({ startX, startY, endX, endY, delta }) => {
  const [points, setPoints] = useState([]);
  const a = Math.abs((endY - startY) / (endX - startX));
  const b = endY - a * endX;

  useEffect(() => {
    const computeLine = (delta) => {
      let nextX = startX + parseInt(delta);
      const newPoints = [];
      while (nextX < endX) {
        let nextY = a * nextX + b;
        newPoints.push({ x: nextX, y: nextY });
        nextX += parseInt(delta);
      }
      setPoints(newPoints);
    };
    computeLine(delta);
  }, [delta]);

  return (
    <div>
      {points.map((point) => (
        <Point x={point.x} y={point.y} />
      ))}
    </div>
  );
};

export default Edge;
