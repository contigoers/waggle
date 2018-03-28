import axios from 'axios';

const UPDATE_SEARCH_QUERY = 'UPDATE_SEARCH_QUERY';
const SEARCH_DOGS = 'SEARCH_DOGS';
const GET_FAVORITES = 'GET_FAVORITES';

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
  const { data } = await axios.post('/searchOrgDogs', searchObject);
  return {
    type: SEARCH_DOGS,
    data: data.dogsAndOrgs,
  };
};

const getRandomDog = async () => {
  const { data } = await axios.get('/randomDog');
  return {
    type: SEARCH_DOGS,
    data: data.dogsAndOrgs,
  };
};

const getOrgDogs = async (orgObject) => {
  const { data } = await axios.get('/orgInfo', orgObject);
  return {
    type: SEARCH_DOGS,
    data: data.orgDogs,
  };
};

const getFavorites = async (adopterObject) => {
  const { data } = await axios.get('/adopterInfo', adopterObject);
  return {
    type: GET_FAVORITES,
    data: data.adopterFavoriteDogs,
  };
};

const addFavorite = async (favoritesObject) => {
  const { data } = await axios.post('/favoriteDog', favoritesObject);
  return {
    type: GET_FAVORITES,
    data: data.faveDogs,
  };
};

const removeFavorite = async (favoritesObject) => {
  const { data } = await axios.post('/favoriteDog/remove', favoritesObject);
  return {
    type: GET_FAVORITES,
    data: data.faveDogs,
  };
};

export {
  UPDATE_SEARCH_QUERY, updateSearchQuery, SEARCH_DOGS, dogsSearch,
  GET_FAVORITES, getFavorites, addFavorite, removeFavorite, getOrgDogs,
  getRandomDog,
};
