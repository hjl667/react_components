import { createContext, useContext } from "react";

const ScrollPositionContext = createContext();

export function ScrollPositionProvider({ children }) {
  const [scrollPositions, setScrollPositions] = useState({});

  const saveScrollPosition = useCallback((key) => {
    const position = window.pageYOffset || document.documentElement.scrollTop;
    setScrollPositions((prev) => ({
      ...prev,
      [key]: position,
    }));
  }, []);

  const restoreScrollPosition = useCallback(
    (key) => {
      const position = scrollPositions[key] || 0;
      window.scrollTo(0, position);
    },
    [scrollPositions]
  );

  const getScrollPosition = useCallback(
    (key) => {
      return scrollPositions[key] || 0;
    },
    [scrollPositions]
  );

  const clearScrollPosition = useCallback((key) => {
    setScrollPositions((prev) => {
      const newPositions = { ...prev };
      delete newPositions[key];
      return newPositions;
    });
  }, []);

  const clearAllScrollPositions = useCallback(() => {
    setScrollPositions({});
  }, []);

  const value = {
    scrollPositions,
    saveScrollPosition,
    restoreScrollPosition,
    getScrollPosition,
    clearScrollPosition,
    clearAllScrollPositions,
  };

  return (
    <ScrollPositionContext.Provider value={value}>
      {children}
    </ScrollPositionContext.Provider>
  );
}

export function useScrollPositionContext() {
  const context = useContext(ScrollPositionContext);
  if (!context) {
    throw new Error(
      "useScrollPositionContext must be used within ScrollPositionProvider"
    );
  }
  return context;
}

// 使用Context的hook
export function useScrollPositionWithContext(key) {
  const {
    saveScrollPosition,
    restoreScrollPosition,
    getScrollPosition,
    clearScrollPosition,
  } = useScrollPositionContext();

  const currentPosition = getScrollPosition(key);

  // 自动监听滚动
  useEffect(() => {
    const handleScroll = () => {
      saveScrollPosition(key);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [key, saveScrollPosition]);

  return {
    scrollPosition: currentPosition,
    saveScrollPosition: () => saveScrollPosition(key),
    restoreScrollPosition: () => restoreScrollPosition(key),
    clearScrollPosition: () => clearScrollPosition(key),
  };
}