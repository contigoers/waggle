import { combineReducers } from 'redux';
import showMessage from './reducer_show-message';
import randomDogPic from './random-dog-pic';
import toggleRegistrationModal from './registrationReducers';
import searchQuery from './searchReducers';

const rootReducer = combineReducers({
  contents: showMessage,
  randomDogPic,
  registrationModal: toggleRegistrationModal,
  searchQuery,
});

export default rootReducer;
