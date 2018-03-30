import { handleActions } from 'redux-actions';
import { uniq, isEmpty } from 'lodash';

const initialState = {
  breed: [],
  male: [],
  lifestage: [],
  size: [],
  results: {},
  favorites: {},
};

export default handleActions({
  UPDATE_SEARCH_QUERY: (state, action) => {
    if (action.id === 'breed') {
      return {
        ...state,
        [action.id]: [action.value],
      };
    } else if (action.value === 'default') {
      return {
        ...state,
        [action.id]: [],
      };
    } else if (action.checked) {
      return {
        ...state,
        [action.id]: uniq([...state[action.id], action.value]),
      };
    }
    return {
      ...state,
      [action.id]: [...state[action.id]].filter(element => element !== action.value),
    };
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
}, initialState);
