const UPDATES_SEARCH_QUERY = 'UPDATES_SEARCH_QUERY';

const updatesSearchQuery = (values, filterType) =>
  (
    {
      type: UPDATES_SEARCH_QUERY,
      values,
      filterType,
    }
  );

export { UPDATES_SEARCH_QUERY, updatesSearchQuery };
