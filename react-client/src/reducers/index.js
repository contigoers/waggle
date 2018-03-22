import { combineReducers } from 'redux';
import showMessage from './reducer_show-message';
import randomDogPic from './random-dog-pic';
import toggleRegistrationModal from './registrationReducers';
import searchQuery from './searchReducers';
import dummyProfile from './dummyProfile';

const rootReducer = combineReducers({
  contents: showMessage,
  randomDogPic,
  registrationModal: toggleRegistrationModal,
  searchQuery,
  profile: dummyProfile,
});

export default rootReducer;
