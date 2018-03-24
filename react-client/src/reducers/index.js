import { combineReducers } from 'redux';
import showMessage from './reducer_show-message';
import randomDogPic from './random-dog-pic';
import registrationModal from './registrationReducers';
import search from './searchReducers';
import dummyProfile from './dummyProfile';
import loginModal from './loginReducers';
import searchSelections from './searchViewReducers';

const rootReducer = combineReducers({
  contents: showMessage,
  randomDogPic,
  registrationModal,
  search,
  profile: dummyProfile,
  loginModal,
  searchSelections,
});

export default rootReducer;
