import { Line, Pin } from "./components";

const MapView = ({
  connections,
  mapContainerRef,
  handleClick,
  pins,
  handleSelectPin,
  edges,
  setStart,
  setEnd,
  handleZoom,
  mapRef,
  zoom,
  selectedPins,
  start,
  end,
  handleStartDragging,
}) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          width: "500px",
          height: "300px",
          backgroundColor: "#f0f0f0",
          overflow: "auto",
          borderRadius: "4px",
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
        }}
        ref={mapContainerRef}
      >
        <div
          style={{
            position: "relative",
            width: zoom > 1 ? `${500 * zoom}px` : "400px",
            height: zoom > 1 ? `${300 * zoom}px` : "300px",
            backgroundColor: "#f0f0f0",
            transform: `scale(${zoom})`,
            transformOrigin: "0 0",
          }}
          ref={mapRef}
          onClick={(event) => handleClick(event)}
        >
          {pins.map((pin) => (
            <Pin
              key={pin.id}
              selectedPins={selectedPins}
              position={pin}
              handleSelectPin={handleSelectPin}
              handleStartDragging={handleStartDragging}
            />
          ))}
          {connections.map((connection, index) => (
            <Line
              key={index}
              startPin={connection.startPin}
              endPin={connection.endPin}
              color={"white"}
              zIndex={1}
            />
          ))}
          {edges.map((edge, index) => (
            <Line
              key={index}
              startPin={edge.start}
              endPin={edge.end}
              color={"black"}
              zIndex={10}
            />
          ))}
        </div>
      </div>
      <div style={{ marginTop: "10px" }}>
        <label>start: </label>
        <select
          value={start}
          onChange={(event) => {
            setStart(parseInt(event.target.value));
          }}
          style={{
            padding: "4px 8px",
            borderRadius: "3px",
            border: "1px solid #ccc",
            marginRight: "10px",
          }}
        >
          {pins.map((pin) => (
            <option key={pin.id} value={pin.id}>
              {pin.label}
            </option>
          ))}
        </select>
        <label> end: </label>
        <select
          style={{
            padding: "4px 8px",
            borderRadius: "3px",
            border: "1px solid #ccc",
            marginRight: "10px",
          }}
          value={end}
          onChange={(event) => setEnd(parseInt(event.target.value))}
        >
          {pins.map((pin) => (
            <option key={pin.id} value={pin.id}>
              {pin.label}
            </option>
          ))}
        </select>
      </div>
      <div style={{ marginTop: "20px", display: "flex", gap: "10px" }}>
        <button
          style={{
            backgroundColor: "#4285F4",
            color: "white",
            border: "none",
            padding: "8px 16px",
            borderRadius: "4px",
            cursor: "pointer",
            fontWeight: "500",
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
          }}
          onClick={() => handleZoom(0.1)}
        >
          Zoom in
        </button>
        <button
          style={{
            backgroundColor: "#4285F4",
            color: "white",
            border: "none",
            padding: "8px 16px",
            borderRadius: "4px",
            cursor: "pointer",
            fontWeight: "500",
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
          }}
          onClick={() => handleZoom(-0.1)}
        >
          Zoom out
        </button>
      </div>
    </div>
  );
};

export default MapView;
