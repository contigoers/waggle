import { combineReducers } from 'redux';
import registrationModal from './registrationReducers';
import search from './searchReducers';
import { loginModal, storeUser } from './loginReducers';
import searchSelections from './searchViewReducers';
import inquiryModal from './messagingReducers';

const rootReducer = combineReducers({
  registrationModal,
  search,
  loginModal,
  storeUser,
  searchSelections,
  inquiryModal,
});

export default rootReducer;
