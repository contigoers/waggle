import { TOGGLE_REGISTRATION_MODAL } from '../actions/registrationActions';

const defaultState = {
  org: false,
  adopter: false,
  current: null,
};

const toggleRegistrationModal = (state, action) => {
  switch (action.type) {
    case TOGGLE_REGISTRATION_MODAL:
      if (action.id) {
        return Object.assign({}, state, { [action.id]: true, current: action.id });
      }
      return Object.assign({}, state, { [state.current]: false, current: undefined });
    default:
      return defaultState;
  }
};

export { toggleRegistrationModal };
