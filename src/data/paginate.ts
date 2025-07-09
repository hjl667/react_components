// 8.5 分页处理
const paginate = <T>(array: T[], pageSize: number, pageNumber: number): T[] => {
  const startIndex = (pageNumber - 1) * pageSize;
  return array.slice(startIndex, startIndex + pageSize);
};

export default paginate;
