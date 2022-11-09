const filteArrByTitle = (arr, query) => {
  if (query === '') return;

  const normalizeQuery = query.toLowerCase();

  return arr.filter(el => el.title.toLowerCase().includes(normalizeQuery));
};

export default filteArrByTitle;
