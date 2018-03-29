import { handleActions } from 'redux-actions';

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
  favorites: [],
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
  GET_FAVORITES: (state, action) => ({ ...state, favorites: action.data }),
}, initialState);
