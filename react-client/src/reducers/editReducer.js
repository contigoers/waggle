import { TOGGLE_EDIT_MODAL } from '../actions/editAction';

const editModal = (state = { visible: false }, { type }) => {
  switch (type) {
    case TOGGLE_EDIT_MODAL:
      return { visible: !state.visible };
    default:
      return state;
  }
};

export default editModal;
