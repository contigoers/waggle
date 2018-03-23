import { combineReducers } from 'redux';
import showMessage from './reducer_show-message';
import randomDogPic from './random-dog-pic';
import registrationModal from './registrationReducers';
import searchQuery from './searchReducers';
import dummyProfile from './dummyProfile';
import loginModal from './loginReducers';

const rootReducer = combineReducers({
  contents: showMessage,
  randomDogPic,
  registrationModal,
  searchQuery,
  profile: dummyProfile,
  loginModal,
});

export default rootReducer;
