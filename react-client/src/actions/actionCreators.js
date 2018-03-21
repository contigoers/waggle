import axios from 'axios';

const TOGGLE_BUTTON = 'TOGGLE_BUTTON';
const UPDATE_RANDOM_PIC = 'UPDATE_RANDOM_PIC';


const sendMessage = () => (
  {
    type: TOGGLE_BUTTON,
  }
);

const updateRandomPic = async () => {
  const { data } = await axios.get('/picture');

  return {
    type: UPDATE_RANDOM_PIC,
    payload: data,
  };
};

// const addDog = async () => {
//   const { data } = await axios.post('/createOrgDog');

//   return {
//     type: ADD_DOG, // ?
//     payload: data,
//   };
// };

export { TOGGLE_BUTTON, sendMessage, UPDATE_RANDOM_PIC, updateRandomPic };
