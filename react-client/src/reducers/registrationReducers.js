import { TOGGLE_REGISTRATION_MODAL } from '../actions/registrationActions';

const defaultState = {
  org: false,
  adopter: false,
};

const toggleRegistrationModal = (state = defaultState, action) => {
  switch (action.type) {
    case TOGGLE_REGISTRATION_MODAL:
      return {
        ...state,
        [action.id]: !state[action.id],
      };
    default:
      return state;
  }
};

export default toggleRegistrationModal;
