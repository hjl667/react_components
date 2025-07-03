const processUsersAsync = async (userIds) => {
  const promises = userIds.map((id) => fetch(`/api/users/${id}`));
  const responses = await Promise.all(promises);
  return Promise.all(responses.map((res) => res.json()));
};