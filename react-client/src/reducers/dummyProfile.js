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
  orgName: 'Austin Pets Alive!',
  phone: '5129616519',
  address: '1156 W Cesar Chavez St',
  city: 'Austin',
  state: 'TX',
  zipcode: 78703,
};

const dummyProfile = (state = defaultState) => state;

export default dummyProfile;
