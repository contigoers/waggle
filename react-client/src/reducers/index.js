import { combineReducers } from 'redux';
import showMessage from './reducer_show-message';
import randomDogPic from './random-dog-pic';
import toggleRegistrationModal from './registrationReducers';

const rootReducer = combineReducers({
  contents: showMessage,
  randomDogPic,
  registrationModal: toggleRegistrationModal,
});

export default rootReducer;
