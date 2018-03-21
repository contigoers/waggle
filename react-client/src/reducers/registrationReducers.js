import { TOGGLE_REGISTRATION_MODAL } from '../actions/registrationActions';

const defaultState = {
  org: false,
  adopter: false,
};

const toggleRegistrationModal = (state, action) => {
  switch (action.type) {
    case TOGGLE_REGISTRATION_MODAL:
      if (action.id) {
        return {
          ...state,
          [action.id]: true,
        };
      }
      return defaultState;
    default:
      return defaultState;
  }
};

export default toggleRegistrationModal;
