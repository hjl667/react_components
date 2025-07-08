// 8.5 分页处理
const paginate = (array, pageSize, pageNumber) => {
  const startIndex = (pageNumber - 1) * pageSize;
  return array.slice(startIndex, startIndex + pageSize);
};
