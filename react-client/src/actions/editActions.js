import axios from 'axios';

const TOGGLE_EDIT_MODAL = 'TOGGLE_EDIT_MODAL';
const UPDATE_DOG_INFO = 'UPDATE_DOG_INFO';

const toggleEditModal = () => (
  {
    type: TOGGLE_EDIT_MODAL,
  }
);

const editDogInfo = async (values) => {
  const { data } = await axios.patch('/updateDog', values);
  return {
    // type: UPDATE_DOG_INFO,
    dog: data.dog,
  };
};

export {
  TOGGLE_EDIT_MODAL,
  toggleEditModal,
  UPDATE_DOG_INFO,
  editDogInfo,
};
