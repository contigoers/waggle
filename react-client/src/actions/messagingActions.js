import axios from 'axios';

const TOGGLE_INQUIRY_MODAL = 'TOGGLE_INQUIRY_MODAL';
const GET_CONTACTS = 'GET_CONTACTS';
const GET_MESSAGES = 'GET_MESSAGES';

const toggleInquiryModal = () => (
  {
    type: TOGGLE_INQUIRY_MODAL,
  }
);

const getContacts = async (userId) => {
  const { data } = await axios.get('/contacts/adopter', {params: { id: userId }});
  console.log('zyxwvu', data);
  return {
    type: GET_CONTACTS,
    data,
  };
};

const getMessages = async (userId, contactId) => {
  const messages = await axios.get('/messages/fetch', { userId, contactId });
  return {
    type: GET_MESSAGES,
    data: messages,
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
