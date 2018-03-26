import { handleActions } from 'redux-actions';

const initialState = {
  anyGender: true,
  male: false,
  female: false,
  anySize: true,
  tiny: false,
  small: false,
  medium: false,
  large: false,
  giant: false,
  anyLifestage: true,
  puppy: false,
  adolescent: false,
  adult: false,
  senior: false,
};

export default handleActions({
  UPDATE_SEARCH_VIEW: (state, action) =>
    (
      {
        ...state,
        ...action.payload,
      }
    ),
}, initialState);
