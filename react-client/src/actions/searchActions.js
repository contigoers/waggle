import axios from 'axios';

const UPDATE_SEARCH_QUERY = 'UPDATE_SEARCH_QUERY';
const SEARCH_DOGS = 'SEARCH_DOGS';
const GET_FAVORITES = 'GET_FAVORITES';
const UPDATE_FAVORITES = 'UPDATE_FAVORITES';
const UPDATE_ADOPTED_STATUS = 'UPDATE_ADOPTED_STATUS';

const updateSearchQuery = (values, filterType) =>
  (
    {
      type: UPDATE_SEARCH_QUERY,
      values,
      filterType,
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
    orgs: data.orgs,
  };
};

const addFavorite = async (favoritesObject) => {
  const { data } = await axios.post('/favoriteDog', favoritesObject);
  return {
    type: UPDATE_FAVORITES,
    data: data.adopterFavoriteDogs,
  };
};

const removeFavorite = async (favoritesObject) => {
  const { data } = await axios.post('/favoriteDog/remove', favoritesObject);
  return {
    type: UPDATE_FAVORITES,
    data: data.adopterFavoriteDogs,
  };
};

const markAdopted = async (dogId) => {
  const { data } = await axios.patch('/adopted', { dogId });
  return {
    type: UPDATE_ADOPTED_STATUS,
    dog: data.dog,
  };
};

const unmarkAdopted = async (dogId) => {
  const { data } = await axios.patch('/adopted/remove', { dogId });
  return {
    type: UPDATE_ADOPTED_STATUS,
    dog: data.dog,
  };
};

export {
  UPDATE_SEARCH_QUERY,
  updateSearchQuery,
  SEARCH_DOGS,
  dogsSearch,
  GET_FAVORITES,
  getFavorites,
  UPDATE_FAVORITES,
  addFavorite,
  removeFavorite,
  getOrgDogs,
  getRandomDog,
  UPDATE_ADOPTED_STATUS,
  markAdopted,
  unmarkAdopted,
};
