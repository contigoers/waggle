import { combineReducers } from 'redux';
import registrationModal from './registrationReducers';
import search from './searchReducers';
import { loginModal, storeUser } from './loginReducers';
import { inquiryModal, fetchContacts, fetchMessages } from './messagingReducers';
import editModal from './editReducers';

const appReducer = combineReducers({
  registrationModal,
  search,
  loginModal,
  storeUser,
  inquiryModal,
  fetchContacts,
  fetchMessages,
  editModal,
});

const rootReducer = (state, action) => {
  if (action.type === 'LOGOUT') {
    return appReducer(undefined, action);
  }
  return appReducer(state, action);
};

export default rootReducer;
