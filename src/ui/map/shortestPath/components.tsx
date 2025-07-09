export const Line = ({ startPin, endPin, color, zIndex }) => {
  return (
    <div>
      <svg
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
          zIndex: { zIndex },
        }}
      >
        <line
          x1={startPin.x}
          y1={startPin.y}
          x2={endPin.x}
          y2={endPin.y}
          stroke={color}
          stroke-width="2"
        />
      </svg>
    </div>
  );
};

export const Pin = ({
  selectedPins,
  position,
  handleSelectPin,
  handleStartDragging,
}) => {
  const showLabel = true;

  return (
    <div
      onClick={(event) => handleSelectPin(event, position)}
      onMouseDown={(event) => handleStartDragging(event, parseInt(position.id))}
    >
      <svg
        width="16"
        height="16"
        style={{
          overflow: "visible",
          position: "absolute",
          left: `${position.x - 8}px`,
          top: `${position.y - 8}px`,
          cursor: "pointer",
        }}
      >
        <circle
          cx="8"
          cy="8"
          r="8"
          fill={selectedPins.includes(position.id) ? "blue" : "red"}
          stroke="white"
          strokeWidth="2"
        />
        {showLabel && (
          <text
            x="20"
            y="8"
            fontSize="12"
            fill="black"
            alignmentBaseline="middle"
            pointerEvents="none"
          >
            {position.label}
          </text>
        )}
      </svg>
    </div>
  );
};
