import axios from 'axios';

const UPDATE_SEARCH_QUERY = 'UPDATE_SEARCH_QUERY';
const SEARCH_DOGS = 'SEARCH_DOGS';

const updateSearchQuery = (id, value, checked) =>
  (
    {
      type: UPDATE_SEARCH_QUERY,
      id,
      value,
      checked,
    }
  );

const dogsSearch = async (searchObject) => {
  const { data } = await axios.post('/searchOrgDogsTest', searchObject);
  return {
    type: SEARCH_DOGS,
    data,
  };
};

export { UPDATE_SEARCH_QUERY, updateSearchQuery, SEARCH_DOGS, dogsSearch };
