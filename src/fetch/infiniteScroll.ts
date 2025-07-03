import { useState, useEffect, useCallback, useRef } from "react";

// 基础的无限滚动 Hook
function useInfiniteScroll(apiEndpoint, options = {}) {
  const {
    pageSize = 20,
    threshold = 200, // 距离底部多少像素时触发加载
    enabled = true,
  } = options;

  // 状态管理
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(0);

  // refs
  const observerRef = useRef();
  const abortControllerRef = useRef();

  // 加载下一页的函数
  const loadMore = useCallback(async () => {
    if (loading || !hasMore || !enabled) return;

    // 取消之前的请求
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    const controller = new AbortController();
    abortControllerRef.current = controller;

    setLoading(true);
    setError(null);

    try {
      const nextPage = page + 1;
      console.log(`🌐 Hook 加载第 ${nextPage} 页...`);

      const response = await fetch(
        `${apiEndpoint}?page=${nextPage}&size=${pageSize}`,
        { signal: controller.signal }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();

      setData((prevData) => [...prevData, ...result.data]);
      setPage(nextPage);
      setHasMore(result.pagination.hasNext);

      console.log(
        `✅ Hook 加载完成: 第 ${nextPage} 页，${result.data.length} 条数据`
      );
    } catch (err) {
      if (err.name !== "AbortError") {
        console.error("❌ 加载失败:", err);
        setError(err);
      }
    } finally {
      setLoading(false);
    }
  }, [apiEndpoint, pageSize, page, loading, hasMore, enabled]);

  // 重置函数
  const reset = useCallback(() => {
    setData([]);
    setPage(0);
    setHasMore(true);
    setError(null);
    setLoading(false);
  }, []);

  // 手动触发加载
  const refresh = useCallback(() => {
    reset();
    // 在下一个 tick 触发加载，确保状态已重置
    setTimeout(loadMore, 0);
  }, [reset, loadMore]);

  // Intersection Observer for scroll detection
  const lastElementRef = useCallback(
    (node) => {
      if (loading) return;

      if (observerRef.current) {
        observerRef.current.disconnect();
      }

      observerRef.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && hasMore) {
            console.log("📜 滚动到底部，触发加载");
            loadMore();
          }
        },
        {
          rootMargin: `${threshold}px`,
        }
      );

      if (node) {
        observerRef.current.observe(node);
      }
    },
    [loading, hasMore, loadMore, threshold]
  );

  useEffect(() => {
    if (enabled && data.length === 0 && !loading) {
      loadMore();
    }
  }, [enabled, data.length, loading, loadMore]);

  useEffect(() => {
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  return {
    data,
    loading,
    error,
    hasMore,
    loadMore,
    reset,
    refresh,
    lastElementRef, // 用于绑定到最后一个元素
  };
}
