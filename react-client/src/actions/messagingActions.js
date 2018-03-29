const TOGGLE_INQUIRY_MODAL = 'TOGGLE_INQUIRY_MODAL';
const GET_CONTACTS = 'GET_CONTACTS';
const GET_MESSAGES = 'GET_MESSAGES';

const toggleInquiryModal = () => (
  {
    type: TOGGLE_INQUIRY_MODAL,
  }
);

const getContacts = () => (
  {
    type: GET_CONTACTS,
  }
);

const getMessages = () => (
  {
    type: GET_MESSAGES,
  }
);

export {
  TOGGLE_INQUIRY_MODAL,
  toggleInquiryModal,
  GET_CONTACTS,
  getContacts,
  GET_MESSAGES,
  getMessages,
};
