import { TOGGLE_LOGIN_MODAL, STORE_USER_ID } from '../actions/loginActions';

const loginModal = (state = { visible: null }, action) => {
  switch (action.type) {
    case TOGGLE_LOGIN_MODAL:
      return {
        visible: !state.visible,
      };
    default:
      return state;
  }
};

const storeUser = (state = { user: null }, action) => {
  switch (action.type) {
    case STORE_USER_ID:
      return {
        ...state,
        user: action.user,
      };
    default:
      return state;
  }
};

export { loginModal, storeUser };
