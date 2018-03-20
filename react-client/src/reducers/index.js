import { combineReducers } from 'redux';
import showMessage from './reducer_show-message';
import randomDogPic from './random-dog-pic';

const rootReducer = combineReducers({
  contents: showMessage,
  randomDogPic,
});

export default rootReducer;
