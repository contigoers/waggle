const defaultState = { 
  name: 'Tractor',
  breed: 'dachshund',
  mix: true,
  male: true,
  size: 'small',
  anxious: true,
  aggressive: false,
  lifestage: 'adult',
  age: 7,
  fixed: true,
  diet: true,
  medical: false,
  energy_level: 'medium',
  photo: null,
  description: 'a Good Boy',
};

const dummyProfile = (state = defaultState) => state;

export default dummyProfile;
