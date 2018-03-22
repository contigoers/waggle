import { combineReducers } from 'redux';
import showMessage from './reducer_show-message';
import randomDogPic from './random-dog-pic';
import toggleRegistrationModal from './registrationReducers';
import dummyProfile from './dummyProfile';

const rootReducer = combineReducers({
  contents: showMessage,
  randomDogPic,
  registrationModal: toggleRegistrationModal,
  profile: dummyProfile,
});

export default rootReducer;
