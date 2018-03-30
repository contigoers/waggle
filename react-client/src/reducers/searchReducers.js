import { handleActions } from 'redux-actions';
import { isEmpty } from 'lodash';

const initialState = {
  breed: [],
  gender: [],
  lifestage: [],
  size: [],
  mix: [],
  neutered: [],
  diet: [],
  medical: [],
  energy: [],
  results: {},
  favorites: {},
};

export default handleActions({
  UPDATE_SEARCH_QUERY: (state, { filterType, values }) => {
    if (filterType === 'breed' || filterType === 'lifestage' ||
      filterType === 'size' || filterType === 'energy') {
      return {
        ...state,
        [filterType]: values,
      };
    } else if (filterType === 'gender' || filterType === 'mix' || filterType === 'neutered' ||
      filterType === 'diet' || filterType === 'medical') {
      if (values === undefined) {
        return {
          ...state,
          [filterType]: [],
        };
      }
      return {
        ...state,
        [filterType]: [values],
      };
    }
    return state;
  },
  SEARCH_DOGS: (state, action) => ({ ...state, results: action.data }),
  GET_FAVORITES: (state, action) => {
    if (!isEmpty(state.results)) {
      return {
        ...state,
        favorites: action.data,
      };
    }

    return {
      ...state,
      favorites: action.data,
      results: {
        dogs: action.data.favoriteDogs,
        orgs: action.orgs,
      },
    };
  },
  UPDATE_FAVORITES: (state, { data }) => (
    {
      ...state,
      favorites: {
        ...state.favorites,
        favoriteDogs: data,
      },
    }
  ),
  UPDATE_ADOPTED_STATUS: (state, { dog }) => (
    {
      ...state,
      results: {
        ...state.results,
        [dog.id]: dog,
      },
    }
  ),
}, initialState);
