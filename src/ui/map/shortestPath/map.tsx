import { useState, useEffect, useRef } from "react";
import usePath from "./usePath";
import MapView from "./mapView";
import Console from "./console";
import usePosition from "./usePosition";
import useDrag from "./useDrag";
import useConnections from "./useConnections";

const MapContainer = () => {
  const [pins, setPins] = useState([
    { id: 1, x: 100, y: 250, label: "Electronics" },
    { id: 2, x: 200, y: 150, label: "Groceries" },
    { id: 3, x: 50, y: 50, label: "Clothes" },
    { id: 4, x: 380, y: 200, label: "Food" },
    { id: 5, x: 280, y: 80, label: "Vegie" },
    { id: 6, x: 20, y: 150, label: "Meat" },
  ]);

  const uniqueId = useRef();
  const mapRef = useRef(null);
  const mapContainerRef = useRef(null);
  const [edges, setEdges] = useState([]);
  const [start, setStart] = useState(1);
  const [end, setEnd] = useState(1);
  const [selectedPins, setSelectedPins] = useState([]);
  const [zoom, setZoom] = useState(1);
  const [mapTop, setMapTop] = useState();
  const [mapLeft, setMapLeft] = useState();

  const [neighbors, setNeighbors] = useState({
    1: [3],
    2: [4],
    3: [5],
    4: [1],
    5: [4],
    6: [1],
  });

  const { connections } = useConnections({ pins, neighbors });

  const { viewport, scrollPosition } = usePosition({ mapContainerRef });
  const { scrollLeft, scrollTop } = scrollPosition;
  const { isDragging, handleStartDragging } = useDrag({
    mapTop,
    mapLeft,
    zoom,
    setPins,
    pins,
    scrollLeft,
    scrollTop,
  });

  const handleZoom = (delta) => {
    setZoom((prev) => Math.max(0.5, Math.min(2, prev + delta)));
  };

  useEffect(() => {
    uniqueId.current = pins.length + 1;
  }, []);

  useEffect(() => {
    if (mapRef.current) {
      const mapRect = mapRef.current.getBoundingClientRect();
      setMapTop(mapRect.top);
      setMapLeft(mapRect.left);
    }
  }, [mapRef, zoom, viewport]);

  useEffect(() => {
    setSelectedPins([]);
    if (start !== null && end !== null) {
      const { path, edges } = usePath({
        points: pins,
        neighbors: neighbors,
        start: start,
        end: end,
      });
      setSelectedPins([...path]);
      setEdges(edges);
    }
  }, [start, end, neighbors, pins]);

  const handleClick = (event) => {
    if (!isDragging) {
      const relativeX = (event.clientX - mapLeft + scrollLeft) / zoom;
      const relativeY = (event.clientY - mapTop + scrollTop) / zoom;
      const newPin = {
        id: uniqueId.current,
        x: relativeX,
        y: relativeY,
        label: "To be edited",
      };
      uniqueId.current += 1;
      setPins([...pins, newPin]);
    }
  };

  const updateLabel = (id, newLabel) => {
    const pinsCopy = pins.map((pin) => {
      if (pin.id !== id) {
        return pin;
      } else {
        return {
          ...pin,
          label: newLabel,
        };
      }
    });
    setPins(pinsCopy);
  };

  const deletePin = (id) => {
    const pinToDelete = pins.find((pin) => pin.id === id);
    if (!pinToDelete) return;

    const newNeighbors = {};

    for (const [nodeId, nodeNeighbors] of Object.entries(neighbors)) {
      if (nodeId === id.toString()) {
        continue;
      } else {
        newNeighbors[nodeId] = nodeNeighbors.filter(
          (neighborId) => neighborId.toString() !== id.toString()
        );
      }
    }

    setNeighbors(newNeighbors);

    const filteredPins = pins.filter((pin) => pin.id !== id);
    setPins(filteredPins);
  };

  const handleSelectPin = (event, position) => {
    if (!isDragging) {
      event.stopPropagation();
      if (!selectedPins) return;
      if (selectedPins.includes(position.id)) {
        setSelectedPins((prev) => prev.filter((id) => id !== position.id));
      } else {
        setSelectedPins((prev) => [...prev, position.id]);
      }
    }
  };

  const addEdge = (edgeStart, edgeEnd) => {
    const neighborsCopy = { ...neighbors };
    if (!neighborsCopy[edgeStart].includes(edgeEnd)) {
      neighborsCopy[edgeStart].push(edgeEnd);
    }
    console.log(neighborsCopy);
    setNeighbors(neighborsCopy);
  };

  return (
    <div
      style={{
        display: "flex",
        alignContent: "center",
        justifyContent: "center",
        marginTop: "30px",
        gap: "30px",
      }}
    >
      <MapView
        connections={connections}
        mapContainerRef={mapContainerRef}
        handleClick={handleClick}
        pins={pins}
        handleSelectPin={handleSelectPin}
        edges={edges}
        setStart={setStart}
        setEnd={setEnd}
        handleZoom={handleZoom}
        mapRef={mapRef}
        zoom={zoom}
        selectedPins={selectedPins}
        start={start}
        end={end}
        handleStartDragging={handleStartDragging}
      />
      <Console
        deletePin={deletePin}
        pins={pins}
        updateLabel={updateLabel}
        addEdge={addEdge}
      />
    </div>
  );
};

export default MapContainer;
