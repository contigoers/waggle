const TOGGLE_REGISTRATION_MODAL = 'TOGGLE_REGISTRATION_MODAL';

const toggleRegistrationModal = ({ target: { id } }) => (
  {
    type: TOGGLE_REGISTRATION_MODAL,
    id,
  }
);

export { TOGGLE_REGISTRATION_MODAL, toggleRegistrationModal };
