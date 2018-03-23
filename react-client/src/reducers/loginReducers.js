import { TOGGLE_LOGIN_MODAL } from '../actions/loginActions';

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

export default loginModal;
