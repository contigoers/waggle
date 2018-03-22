const UPDATE_SEARCH_QUERY = 'UPDATE_SEARCH_QUERY';

const updateSearchQuery = (id, value, checked) =>
  (
    {
      type: UPDATE_SEARCH_QUERY,
      id,
      value,
      checked,
    }
  );

export { UPDATE_SEARCH_QUERY, updateSearchQuery };
