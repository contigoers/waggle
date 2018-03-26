import { handleActions } from 'redux-actions';
import { uniq } from 'lodash';

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
    if (action.checked) {
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
  GET_FAVORITES: (state, action) => ({ ...state, favorites: action.data }),
}, initialState);
