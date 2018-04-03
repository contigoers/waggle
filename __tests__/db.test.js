/* eslint-env jest */

const db = require('../database/index');

describe('getRandomDog()', () => {
  it('should return an object', async () => {
    const [dog] = await db.getRandomDog();
    expect(dog).toBeDefined();
    expect(typeof dog).toBe('object');
  });

  it('should have all necessary properties', async () => {
    const [dog] = await db.getRandomDog();
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
    const [user] = await db.getUserById(1);
    expect(user).toBeDefined();
    expect(typeof user).toBe('object');
  });

  it('should return the correct user', async () => {
    const [user] = await db.getUserById(1);
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
    });
  });
});

xdescribe('dog creation, adoption, and favoriting', () => {
  let id;

  xit('should create a new dog', async () => {
    [id] = await db.createDog({
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

  xit('should retrieve that dog', async () => {
    const [dog] = await db.getDogById(id);
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

  xit('should mark that dog adopted', async () => {
    await db.markAsAdopted(id);
    const [dog] = await db.getDogById(id);
    expect(dog.adopted).toBe(1);
  });

  xit('should mark that dog unadopted', async () => {
    await db.unmarkAsAdopted(id);
    const [dog] = await db.getDogById(id);
    expect(dog.adopted).toBe(0);
  });

  xit('should change the dog\'s name', async () => {
    await db.updateDogInfo({ id, name: 'Not Test' });
    const [dog] = await db.getDogById(id);
    expect(dog.name).not.toBe('Test');
    expect(dog.name).toBe('Not Test');
  });
});

describe('users', () => {
  it('should not add an adopter that already exists', async () => {
    const message = await db.createUser({
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

  it('should create a new adopter with valid credentials', async () => {
    const [user] = await db.createUser({
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
  });

  it('should not add an org that already exists', async () => {
    const message = await db.createUser({
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

  it('should create a new org with valid credentials', async () => {
    const [org] = await db.createUser({
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
  });
});
