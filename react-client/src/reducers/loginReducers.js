import { TOGGLE_LOGIN_MODAL, STORE_USER_ID } from '../actions/loginActions';

const defaultState = {
  visible: false,
};

const loginModal = (state = defaultState, action) => {
  switch (action.type) {
    case TOGGLE_LOGIN_MODAL:
      return {
        visible: !state.visible,
      };
    default:
      return state;
  }
};

const storeUser = (state, action) => {
  switch (action.type) {
    case STORE_USER_ID:
      return state;
    default:
      return defaultState;
  }
};

export { loginModal, storeUser };
