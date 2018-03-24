const TOGGLE_REGISTRATION_MODAL = 'TOGGLE_REGISTRATION_MODAL';
const UPDATE_REGISTRATION_MODAL_VIEW = 'UPDATE_MODAL_VIEW';

const toggleRegistrationModal = () => (
  {
    type: TOGGLE_REGISTRATION_MODAL,
  }
);

const updateModalView = id => (
  {
    type: UPDATE_REGISTRATION_MODAL_VIEW,
    id,
  }
);

export {
  TOGGLE_REGISTRATION_MODAL,
  toggleRegistrationModal,
  UPDATE_REGISTRATION_MODAL_VIEW,
  updateModalView,
};
