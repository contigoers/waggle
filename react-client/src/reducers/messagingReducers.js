import { TOGGLE_INQUIRY_MODAL } from '../actions/messagingActions';

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

export default inquiryModal;
