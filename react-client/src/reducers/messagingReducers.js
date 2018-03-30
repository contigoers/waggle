import { TOGGLE_INQUIRY_MODAL, GET_CONTACTS, GET_MESSAGES } from '../actions/messagingActions';

const inquiryModal = (state = { visible: false }, { type }) => {
  switch (type) {
    case TOGGLE_INQUIRY_MODAL:
      return {
        ...state,
        visible: !state.visible,
      };
    default:
      return state;
  }
};

const fetchContacts = (state = { contacts: null }, action) => {
  switch (action.type) {
    case GET_CONTACTS:
      return {
        ...state,
        contacts: action.users,
      };
    default:
      return state;
  }
};

const fetchMessages = (state = { messages: null }, action) => {
  switch (action.type) {
    case GET_MESSAGES:
      return {
        ...state,
        messages: action.messages,
      };
    default:
      return state;
  }
};

export { inquiryModal, fetchContacts, fetchMessages };
