const TOGGLE_LOGIN_MODAL = 'TOGGLE_LOGIN_MODAL';

const toggleLoginModal = user => (
  {
    type: TOGGLE_LOGIN_MODAL,
    user,
  }
);

export { TOGGLE_LOGIN_MODAL, toggleLoginModal };
