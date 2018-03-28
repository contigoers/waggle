import { combineReducers } from 'redux';
import registrationModal from './registrationReducers';
import search from './searchReducers';
import dummyProfile from './dummyProfile';
import { loginModal, storeUser } from './loginReducers';
import searchSelections from './searchViewReducers';
import inquiryModal from './messagingReducers';

const rootReducer = combineReducers({
  registrationModal,
  search,
  profile: dummyProfile,
  loginModal,
  storeUser,
  searchSelections,
  inquiryModal,
});

export default rootReducer;
