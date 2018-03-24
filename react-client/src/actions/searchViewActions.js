const UPDATE_SEARCH_VIEW = 'UPDATE_SEARCH_VIEW';

const updateSearchView = payload =>
  (
    {
      type: UPDATE_SEARCH_VIEW,
      payload,
    }
  );

export { UPDATE_SEARCH_VIEW, updateSearchView };
