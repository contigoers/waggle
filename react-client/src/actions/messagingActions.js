import axios from 'axios';

const TOGGLE_INQUIRY_MODAL = 'TOGGLE_INQUIRY_MODAL';
const GET_CONTACTS = 'GET_CONTACTS';
const GET_MESSAGES = 'GET_MESSAGES';

const toggleInquiryModal = () => (
  {
    type: TOGGLE_INQUIRY_MODAL,
  }
);

const getContacts = async (userId, type) => {
  let someData;
  if (type === 'adopter') {
    someData = await axios.get('/contacts/adopter', { params: { id: userId } });
  } else {
    someData = await axios.get('/contacts/org', { params: { id: userId } });
  }
  return {
    type: GET_CONTACTS,
    someData,
  };
};

const getMessages = async (userId, contactId) => {
  const { data } = await axios.get('/messages/fetch', { params: { userId, contactId } });
  return {
    type: GET_MESSAGES,
    data,
  };
};

export {
  TOGGLE_INQUIRY_MODAL,
  toggleInquiryModal,
  GET_CONTACTS,
  getContacts,
  GET_MESSAGES,
  getMessages,
};
