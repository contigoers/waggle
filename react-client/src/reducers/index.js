import { combineReducers } from 'redux';
import registrationModal from './registrationReducers';
import search from './searchReducers';
import dummyProfile from './dummyProfile';
import searchQuery from './searchQueryUpdateReducers';
import { loginModal, storeUser } from './loginReducers';

const rootReducer = combineReducers({
  registrationModal,
  search,
  profile: dummyProfile,
  loginModal,
  searchQuery,
  storeUser,
});

export default rootReducer;
