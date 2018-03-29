import { combineReducers } from 'redux';
import registrationModal from './registrationReducers';
import search from './searchReducers';
import { loginModal, storeUser } from './loginReducers';
import searchSelections from './searchViewReducers';
import { inquiryModal, fetchContacts, fetchMessages } from './messagingReducers';

const rootReducer = combineReducers({
  registrationModal,
  search,
  loginModal,
  storeUser,
  searchSelections,
  inquiryModal,
  fetchContacts,
  fetchMessages,
});

export default rootReducer;
