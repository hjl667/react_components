const calculateDistance = (point1, point2) => {
    const dx = point1.x - point2.x;
    const dy = point1.y - point2.y;
    return Math.sqrt(dx * dx + dy * dy);
  };
  
  const usePath = ({ points, neighbors, start, end }) => {
    if (!start || !end) return { path: [], edges: [] };
  
    const findShortestPath = () => {
      const distances = {};
      const previous = {};
      const unvisited = new Set();
  
      points.forEach((point) => {
        const id = point.id;
        distances[id] = id === start ? 0 : Infinity;
        previous[id] = null;
        unvisited.add(id);
      });
  
      while (unvisited.size > 0) {
        let currentId = null;
        let smallestDistance = Infinity;
  
        for (const id of unvisited) {
          if (distances[id] < smallestDistance) {
            smallestDistance = distances[id];
            currentId = id;
          }
        }
  
        if (currentId === null || distances[currentId] === Infinity) break;
        if (currentId === end) break;
  
        unvisited.delete(currentId);
  
        const neighborIds = neighbors[currentId] || [];
        for (const neighborId of neighborIds) {
          const currentPoint = points.find((p) => p.id === currentId);
          const neighborPoint = points.find((p) => p.id === neighborId);
  
          if (!currentPoint || !neighborPoint) continue;
  
          const weight = calculateDistance(currentPoint, neighborPoint);
          const totalDistance = distances[currentId] + weight;
  
          if (totalDistance < distances[neighborId]) {
            distances[neighborId] = totalDistance;
            previous[neighborId] = currentId;
          }
        }
      }
  
      const path = [];
      let currentId = end;
  
      while (currentId !== null) {
        path.unshift(currentId);
        currentId = previous[currentId];
      }
  
      if (path.length === 0 || path[0] !== start) {
        return [];
      }
  
      return path;
    };
  
    const path = findShortestPath();
  
    const edges = [];
    for (let i = 0; i < path.length - 1; i++) {
      const startPin = points.find((p) => p.id === path[i]);
      const endPin = points.find((p) => p.id === path[i + 1]);
  
      if (startPin && endPin) {
        edges.push({
          start: startPin,
          end: endPin,
        });
      }
    }
  
    return { path, edges };
  };
  
  export default usePath;
  