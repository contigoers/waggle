const TOGGLE_LOGIN_MODAL = 'TOGGLE_LOGIN_MODAL';
const STORE_USER_ID = 'STORE_USER_ID';

const toggleLoginModal = () => (
  {
    type: TOGGLE_LOGIN_MODAL,
  }
);

const storeUserId = ({ user }) => (
  {
    type: STORE_USER_ID,
    user,
  }
);

export { TOGGLE_LOGIN_MODAL, toggleLoginModal, STORE_USER_ID, storeUserId };
