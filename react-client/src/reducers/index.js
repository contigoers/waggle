import { combineReducers } from 'redux';
import showMessage from './reducer_show-message';

const rootReducer = combineReducers({
  contents: showMessage,
});

export default rootReducer;
