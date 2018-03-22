const TOGGLE_REGISTRATION_MODAL = 'TOGGLE_REGISTRATION_MODAL';

<<<<<<< HEAD
const toggleRegistrationModal = ({ target: { id } }) => {
  console.log(id);
  return (
    {
      type: TOGGLE_REGISTRATION_MODAL,
      id,
    }
  );
};
=======
const toggleRegistrationModal = id => (
  {
    type: TOGGLE_REGISTRATION_MODAL,
    id,
  }
);
>>>>>>> 73da57d6995af79922e1163e74b3e74cbfa0f26e

export { TOGGLE_REGISTRATION_MODAL, toggleRegistrationModal };
