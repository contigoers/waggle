import { TOGGLE_REGISTRATION_MODAL, UPDATE_REGISTRATION_MODAL_VIEW } from '../actions/registrationActions';

const defaultState = {
  org: false,
  adopter: false,
  landing: false,
};

const registrationModal = (state = defaultState, action) => {
  switch (action.type) {
    case TOGGLE_REGISTRATION_MODAL:
      return !state.landing ?
        {
          ...state,
          landing: !state.landing,
        } :
        defaultState;
    case UPDATE_REGISTRATION_MODAL_VIEW:
      return {
        ...state,
        [action.id]: !state[action.id],
      };
    default:
      return state;
  }
};

export default registrationModal;
