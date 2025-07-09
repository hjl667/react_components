import { useState } from "react";
const Console = ({ deletePin, pins, addEdge, updateLabel }) => {
  const [edgeStart, setEdgeStart] = useState(1);
  const [edgeEnd, setEdgeEnd] = useState(1);

  const buttonStyles = {
    backgroundColor: "#4285F4",
    color: "white",
    border: "none",
    padding: "6px 12px",
    borderRadius: "4px",
    cursor: "pointer",
    fontWeight: "500",
    transition: "background-color 0.2s",
    minWidth: "70px",
  };

  const deleteButtonStyles = {
    ...buttonStyles,
    backgroundColor: "#F44336",
    padding: "4px 8px",
    minWidth: "60px",
  };

  const inputStyles = {
    padding: "4px 8px",
    borderRadius: "3px",
    border: "1px solid #ccc",
    width: "120px",
  };

  const selectStyles = {
    padding: "4px 8px",
    borderRadius: "3px",
    border: "1px solid #ccc",
    backgroundColor: "white",
  };

  const labelStyles = {
    display: "flex",
    alignItems: "center",
    fontWeight: "500",
    width: "30px",
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "15px",
        padding: "15px",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "8px",
          height: "200px",
          overflow: "auto",
          overflowX: "hidden",
          width: "100%",
          padding: "10px",
          backgroundColor: "white",
          borderRadius: "4px",
          border: "1px solid #eaeaea",
        }}
      >
        {pins.map((pin) => (
          <div
            key={pin.id}
            style={{
              display: "flex",
              gap: "10px",
              alignItems: "center",
              padding: "5px",
              borderBottom: "1px solid #f0f0f0",
            }}
          >
            <label style={labelStyles}>{pin.id}</label>
            <input
              style={inputStyles}
              onChange={(event) => updateLabel(pin.id, event.target.value)}
              value={pin.label}
              placeholder="Enter label"
            />
            <button
              style={deleteButtonStyles}
              onClick={() => deletePin(pin.id)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>

      <div
        style={{
          display: "flex",
          gap: "12px",
          alignItems: "center",
          padding: "10px",
          backgroundColor: "white",

          width: "100%",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
          <label style={{ fontWeight: "400" }}>Edge start</label>
          <select
            style={selectStyles}
            value={edgeStart}
            onChange={(event) => setEdgeStart(parseInt(event.target.value))}
          >
            {pins.map((pin) => (
              <option value={pin.id} key={pin.id}>
                {pin.label}
              </option>
            ))}
          </select>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
          <label style={{ fontWeight: "400" }}>Edge end</label>
          <select
            style={selectStyles}
            value={edgeEnd}
            onChange={(event) => setEdgeEnd(parseInt(event.target.value))}
          >
            {pins.map((pin) => (
              <option key={pin.id} value={pin.id}>
                {pin.label}
              </option>
            ))}
          </select>
        </div>
        <button
          style={{ ...buttonStyles, marginLeft: "auto" }}
          onClick={() => addEdge(edgeStart, edgeEnd)}
        >
          Add Edge
        </button>
      </div>
    </div>
  );
};

export default Console;
