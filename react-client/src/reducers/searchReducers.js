import { handleActions } from 'redux-actions';
import { uniq } from 'lodash';

const initialState = {
  breed: [],
  gender: [],
  age: [],
  size: [],
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
}, initialState);
