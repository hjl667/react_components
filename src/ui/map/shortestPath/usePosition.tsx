import { useState, useEffect } from "react";

const usePosition = ({ mapContainerRef }) => {
  const [viewport, setViewport] = useState(window.innerWidth);
  const [scrollPosition, setScrollPosition] = useState({
    scrollLeft: 0,
    scrollTop: 0,
  });

  useEffect(() => {
    const handleViewportChange = () => {
      setViewport(window.innerWidth);
    };
    window.addEventListener("resize", handleViewportChange);
    return () => removeEventListener("resize", handleViewportChange);
  }, []);

  useEffect(() => {
    if (!mapContainerRef || !mapContainerRef.current) {
      return;
    }

    const handleScroll = () => {
      if (mapContainerRef.current) {
        setScrollPosition({
          scrollLeft: mapContainerRef.current.scrollLeft,
          scrollTop: mapContainerRef.current.scrollTop,
        });
      }
    };

    const scrollContainer = mapContainerRef.current;
    scrollContainer.addEventListener("scroll", handleScroll);

    setScrollPosition({
      scrollLeft: scrollContainer.scrollLeft,
      scrollTop: scrollContainer.scrollTop,
    });

    return () => {
      if (scrollContainer) {
        scrollContainer.removeEventListener("scroll", handleScroll);
      }
    };
  }, [mapContainerRef]);

  return { viewport, scrollPosition };
};

export default usePosition;
