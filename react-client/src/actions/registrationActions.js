const TOGGLE_REGISTRATION_MODAL = 'TOGGLE_REGISTRATION_MODAL';

const toggleRegistrationModal = id => (
  {
    type: TOGGLE_REGISTRATION_MODAL,
    id,
  }
);

export { TOGGLE_REGISTRATION_MODAL, toggleRegistrationModal };
