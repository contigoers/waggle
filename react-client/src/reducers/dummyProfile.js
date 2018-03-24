const defaultState = {
  dog: {
    name: 'Tractor',
    breed: 'Chihuahua',
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
    photo: 'https://static01.nyt.com/images/2018/02/11/realestate/11dogs-topbreeds-Chihuahua/11dogs-topbreeds-Chihuahua-master495.jpg',
    description: 'a Good Boy',
  },
  org: {
    name: 'Austin Pets Alive!',
    phone: '5129616519',
    address: '1156 W Cesar Chavez St',
    city: 'Austin',
    state: 'TX',
    zipcode: 78703,
    email: 'adopt@austinpetsalive.org',
    username: 'orguser123',
    id: 2,
  },
};

const dummyProfile = (state = defaultState) => state;

export default dummyProfile;
