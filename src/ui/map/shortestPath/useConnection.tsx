import { useState, useEffect } from "react";

const useConnections = ({ pins, neighbors }) => {
  const [connections, setConnections] = useState([]);

  useEffect(() => {
    const generateEdges = () => {
      const newEdges = [];
      const processedPairs = new Set();

      Object.entries(neighbors).forEach(([pinId, neighborIds]) => {
        const startPin = pins.find((pin) => pin.id === parseInt(pinId));

        if (startPin) {
          neighborIds.forEach((neighborId) => {
            const endPin = pins.find((pin) => pin.id === neighborId);

            if (endPin) {
              const pairKey = [parseInt(pinId), neighborId].sort().join("-");

              if (!processedPairs.has(pairKey)) {
                processedPairs.add(pairKey);
                newEdges.push({
                  startPin,
                  endPin,
                });
              }
            }
          });
        }
      });

      return newEdges;
    };


    setConnections(generateEdges());
  }, [pins, neighbors]);

  return {connections};
};

export default useConnections;
