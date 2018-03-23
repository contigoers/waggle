import { UPDATE_RANDOM_PIC } from '../actions/actionCreators';

export default (state = null, action) => {
  switch (action.type) {
    case UPDATE_RANDOM_PIC:
      return action.payload;
    default:
      return state;
  }
};
