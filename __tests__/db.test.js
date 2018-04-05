/* eslint-env jest */

const {
  getRandomDog,
  getUserById,
  createDog,
  getDogById,
  markAsAdopted,
  unmarkAsAdopted,
  updateDogInfo,
  createUser,
  getAdopterId,
  getAdopterProfile,
  addFavoriteDog,
  getFavoriteDogs,
  removeFavoriteDog,
  getOrgName,
  checkCredentials,
  getOrgProfile,
  searchOrgDogs,
  getOrgsAfterDogs,
  getOrgDogs,
} = require('../database/index');

describe('getRandomDog()', () => {
  it('should return an object', async () => {
    const [dog] = await getRandomDog();
    expect(dog).toBeDefined();
    expect(typeof dog).toBe('object');
  });

  it('should have all necessary properties', async () => {
    const [dog] = await getRandomDog();
    expect(dog).toBeDefined();
    expect(dog).toHaveProperty('id');
    expect(dog).toHaveProperty('name');
    expect(dog).toHaveProperty('breed');
    expect(dog).toHaveProperty('mix');
    expect(dog).toHaveProperty('male');
    expect(dog).toHaveProperty('size');
    expect(dog).toHaveProperty('aggressive');
    expect(dog).toHaveProperty('anxious');
    expect(dog).toHaveProperty('lifestage');
    expect(dog).toHaveProperty('age');
    expect(dog).toHaveProperty('fixed');
    expect(dog).toHaveProperty('diet');
    expect(dog).toHaveProperty('medical');
    expect(dog).toHaveProperty('energy_level');
    expect(dog).toHaveProperty('adopted');
    expect(dog).toHaveProperty('org_id');
    expect(dog).toHaveProperty('description');
    expect(dog).toHaveProperty('photo');
  });
});

describe('getUserById()', () => {
  it('should return an object', async () => {
    const [user] = await getUserById(1);
    expect(user).toBeDefined();
    expect(typeof user).toBe('object');
  });

  it('should return the correct user', async () => {
    const [user] = await getUserById(1);
    expect(user).toBeDefined();
    expect(user).toEqual({
      id: 1,
      username: 'orgUser',
      password: '$2a$10$3X/MZGAsXR1pfIkINcR0Oetim9bDgH8vffVpGmUnhp/SMv4mF3176',
      email: 'info@smallchancerescue.com',
      org_id: 2,
      address: 'P.O. Box 10033',
      city: 'Austin',
      state: 'TX',
      zipcode: 78766,
      phone: '5126997244',
      forgot_pw_link: null,
    });
  });
});

describe('getOrgDogs()', () => {
  it('should fetch an organization\'s dogs', async () => {
    const dogs = await getOrgDogs(2);
    expect(dogs).toBeDefined();
    expect(Array.isArray(dogs)).toBeTruthy();
    expect(dogs).not.toHaveLength(0);
    dogs.forEach((dog) => {
      expect(typeof dog).toBe('object');
      expect(dog).toHaveProperty('org_id', 2);
    });
  });
});

describe('dogs', () => {
  let id;

  it('should create a new dog', async () => {
    [id] = await createDog({
      name: 'Test',
      breed: 'Corgi',
      isMix: 0,
      isMale: 0,
      size: 'small',
      isAggressive: 0,
      isAnxious: 0,
      lifestage: 'puppy',
      age: 1,
      isFixed: 0,
      hasDiet: 1,
      hasMedical: 0,
      energyLevel: 'high',
      photo: 'null',
      description: null,
      orgId: 2,
    });
    expect(typeof id).toBe('number');
  });

  it('should retrieve that dog', async () => {
    const [dog] = await getDogById(id);
    expect(typeof dog).toBe('object');
    expect(dog).toHaveProperty('id', id);
    expect(dog).toHaveProperty('name', 'Test');
    expect(dog).toHaveProperty('breed', 'Corgi');
    expect(dog).toHaveProperty('mix', 0);
    expect(dog).toHaveProperty('male', 0);
    expect(dog).toHaveProperty('size', 'small');
    expect(dog).toHaveProperty('aggressive', 0);
    expect(dog).toHaveProperty('anxious', 0);
    expect(dog).toHaveProperty('lifestage', 'puppy');
    expect(dog).toHaveProperty('age', 1);
    expect(dog).toHaveProperty('fixed', 0);
    expect(dog).toHaveProperty('diet', 1);
    expect(dog).toHaveProperty('medical', 0);
    expect(dog).toHaveProperty('energy_level', 'high');
    expect(dog).toHaveProperty('adopted', 0);
    expect(dog).toHaveProperty('org_id', 2);
    expect(dog).toHaveProperty('description', null);
    expect(dog).toHaveProperty('photo', 'null');
  });

  it('should mark that dog adopted', async () => {
    await markAsAdopted(id);
    const [dog] = await getDogById(id);
    expect(dog.adopted).toBe(1);
  });

  it('should mark that dog unadopted', async () => {
    await unmarkAsAdopted(id);
    const [dog] = await getDogById(id);
    expect(dog.adopted).toBe(0);
  });

  it('should change the dog\'s name', async () => {
    await updateDogInfo({ id, name: 'Not Test' });
    const [dog] = await getDogById(id);
    expect(dog.name).not.toBe('Test');
    expect(dog.name).toBe('Not Test');
  });

  let dogs;
  it('should search based on given parameters', async () => {
    dogs = await searchOrgDogs({ breed: ['Corgi'], male: ['0'], size: ['small'] });
    expect(dogs).toBeDefined();
    expect(dogs).not.toHaveLength(0);
    expect(dogs[0]).toHaveProperty('breed', 'Corgi');
    expect(dogs[0]).toHaveProperty('male', 0);
    expect(dogs[0]).toHaveProperty('size', 'small');
  });

  it('should retrieve the organizations for dogs in the search', async () => {
    const ids = dogs.map(dog => dog.org_id).filter((orgId, i, arr) => arr.indexOf(orgId) === i);
    const orgs = await getOrgsAfterDogs(ids);
    expect(orgs).toHaveLength(ids.length);
    orgs.forEach((org) => {
      expect(org).toBeDefined();
      expect(typeof org).toBe('object');
      expect(org).toHaveProperty('id');
      expect(org).toHaveProperty('org_name');
      expect(org).toHaveProperty('address');
      expect(org).toHaveProperty('city');
      expect(org).toHaveProperty('state');
      expect(org).toHaveProperty('zipcode');
      expect(org).toHaveProperty('phone');
      expect(org).toHaveProperty('email');
      expect(ids).toContain(org.id);
    });
  });
});

describe('users', () => {
  it('should not add an adopter that already exists', async () => {
    const message = await createUser({
      email: 'yaboi@yaboi.com',
      org_id: 1,
      address: 'yaboi',
      city: 'yaboi',
      state: 'AK',
      zipcode: 11111,
      phone: '7166969693',
      type: 'adopter',
      pets: 'yes',
      name: 'yaboi',
      house: 'house',
    }, 'yaboi', 'testuser');

    expect(message).toBe('already exists!');
  });

  let user;
  it('should create a new adopter with valid credentials', async () => {
    [user] = await createUser({
      email: 'yaboi@yaboi.com',
      org_id: 1,
      address: 'yaboi',
      city: 'yaboi',
      state: 'AK',
      zipcode: 11111,
      phone: '7166969693',
      type: 'adopter',
      pets: 'yes',
      name: 'definitelyNotYaBoisOrg',
      house: 'house',
    }, 'definitelyNotYaBoi', 'testuser');

    expect(typeof user).toBe('object');
    expect(user).toHaveProperty('id');
  });

  it('should find that the new username is taken', async () => {
    const info = await checkCredentials('definitelyNotYaBoi');
    expect(info).toHaveLength(1);
  });

  let adopterId;
  it('should retrieve a user\'s adopter info', async () => {
    const [adopter] = await getAdopterId(user.id);
    expect(adopter).toHaveProperty('name');
    expect(adopter).toHaveProperty('id');
    adopterId = adopter.id;
    expect(typeof adopterId).toBe('number');
  });

  it('should retrieve a user\'s adopter profile', async () => {
    const [profile] = await getAdopterProfile(adopterId);
    expect(profile).toHaveProperty('address');
    expect(profile).toHaveProperty('city');
    expect(profile).toHaveProperty('state');
    expect(profile).toHaveProperty('zipcode');
    expect(profile).toHaveProperty('phone');
    expect(profile).toHaveProperty('email');
    expect(profile).toHaveProperty('id');
    expect(profile).toHaveProperty('user_id');
    expect(profile).toHaveProperty('name');
    expect(profile).toHaveProperty('pets');
    expect(profile).toHaveProperty('house_type');
  });

  it('should let users add new favorites', async () => {
    await addFavoriteDog(adopterId, 1);
    const faves = await getFavoriteDogs(adopterId);
    expect(faves).toHaveLength(1);
    expect(faves[0]).toHaveProperty('id', 1);
  });

  it('should let users remove favorite dogs', async () => {
    await removeFavoriteDog(adopterId, 1);
    const faves = await getFavoriteDogs(adopterId);
    expect(faves).not.toHaveLength(1);
    expect(faves).toHaveLength(0);
  });

  it('should not add an org that already exists', async () => {
    const message = await createUser({
      email: 'yaboi@yaboi.com',
      org_id: 1,
      address: 'yaboi',
      city: 'yaboi',
      state: 'AK',
      zipcode: 11111,
      phone: '7166969693',
      type: 'organization',
      name: 'yaboi',
    }, 'yaboi', 'testuser');

    expect(message).toBe('already exists!');
  });

  let org;
  it('should create a new org with valid credentials', async () => {
    [org] = await createUser({
      email: 'yaboi@yaboi.com',
      org_id: 1,
      address: 'yaboi',
      city: 'yaboi',
      state: 'AK',
      zipcode: 11111,
      phone: '7166969693',
      type: 'organization',
      name: 'definitelyNotYaBoisOrg',
    }, 'notYaBoisOrg', 'testuser');

    expect(typeof org).toBe('object');
    expect(org).toHaveProperty('org_id');
  });

  it('should retrieve the org name', async () => {
    const [info] = await getOrgName(org.org_id);
    expect(info).toEqual({ org_name: 'definitelyNotYaBoisOrg' });
  });

  it('should retrieve the org\'s profile', async () => {
    const [profile] = await getOrgProfile(org.org_id);
    expect(profile).toHaveProperty('address', 'yaboi');
    expect(profile).toHaveProperty('city', 'yaboi');
    expect(profile).toHaveProperty('state', 'AK');
    expect(profile).toHaveProperty('zipcode', 11111);
    expect(profile).toHaveProperty('phone', '7166969693');
    expect(profile).toHaveProperty('email', 'yaboi@yaboi.com');
    expect(profile).toHaveProperty('id');
    expect(profile).toHaveProperty('org_name');
  });
});
