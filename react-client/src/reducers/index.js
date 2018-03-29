import { combineReducers } from 'redux';
import registrationModal from './registrationReducers';
import search from './searchReducers';
import searchQuery from './searchQueryUpdateReducers';
import { loginModal, storeUser } from './loginReducers';
import { inquiryModal, fetchContacts, fetchMessages } from './messagingReducers';

const appReducer = combineReducers({
  registrationModal,
  search,
  loginModal,
  searchQuery,
  storeUser,
  inquiryModal,
  fetchContacts,
  fetchMessages,
});

const rootReducer = (state, action) => {
  if (action.type === 'LOGOUT') {
    return appReducer(undefined, action);
  }
  return appReducer(state, action);
};

export default rootReducer;
