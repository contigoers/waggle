
const config = {
  client: process.env.CLIENT || 'pg',
  connection: process.env.DATABASE_URL,
};

if (config.client === 'pg') {
  config.ssl = true;
}

const knex = require('knex')(config);

<<<<<<< HEAD
const getAdopterProfile = adopterId => knex.column(knex.raw('users.address, users.city, users.id, users.zipcode, users.phone, users.email, adopters.*')).select()
  .from(knex.raw('users, adopters'))
  .where(knex.raw(`users.id = adopters.user_id and adopters.id = ${adopterId}`));

const getOrgProfile = orgId => knex.column(knex.raw('users.address, users.city, users.id, users.zipcode, users.phone, users.email, orgs.*')).select()
  .from(knex.raw('users, orgs'))
  .where(knex.raw(`users.org_id = ${orgId} and orgs.id = ${orgId}`));

const getOrgDogs = orgId => knex.column(knex.raw('dogs.*, orgs.name')).select()
  .from(knex.raw('dogs, orgs'))
  .where(knex.raw(`dogs.org_id = ${orgId} and orgs.id = ${orgId}`));

const getAllOrganizations = () => knex.column(knex.raw('users.address, users.city, users.id, users.zipcode, users.phone, users.email, orgs.*')).select()
  .from(knex.raw('users, orgs'))
  .where(knex.raw('users.org_id = orgs.id'));

const getFavoriteDogs = adopterId => knex.column(knex.raw('dogs.*')).select()
  .from(knex.raw('favoritedogs, dogs'))
  .where(knex.raw(`favoritedogs.adopter_id = ${adopterId} and dogs.id = favoritedogs.dog_id`));

const addFavoriteDog = (adopterId, dogId) => knex('favoritedogs').insert({
  adopter_id: adopterId,
  dog_id: dogId,
});

const searchOrgsByName = orgName => knex('orgs').select('id').where('name', orgName);

const createDog = dog => knex('dogs').insert({
  name: dog.name,
  gender: dog.gender,
  size: dog.size,
  temperament: dog.temperament,
  age: dog.age,
  fixed: dog.fixed,
  medical: dog.medical,
  energy_level: dog.energy_level,
  photo: dog.photo,
  description: dog.description,
  breed: dog.breed,
  org_id: dog.org_id,
}).orderBy('id', 'asc');
=======
/* Add to database methods */

// add new dog to database
const createDog = dog => knex('dogs').insert({
  name: dog.name,
  breed: dog.breed,
  mix: dog.isMix,
  male: dog.isMale,
  size: dog.size,
  aggressive: dog.isAggressive,
  anxious: dog.isAnxious,
  lifestage: dog.lifestage,
  age: dog.age,
  fixed: dog.isFixed,
  diet: dog.hasDiet,
  medical: dog.hasMedical,
  energy_level: dog.energyLevel,
  photo: dog.photo,
  description: dog.description,
  org_id: dog.org_id,
}.orderBy('id', 'asc'));

// create user
const addUser = user =>
  knex('users').insert({
    username: user.username,
    password: user.password,
    email: user.email,
    org_id: user.orgId,
    address: user.address,
    city: user.city,
    zipcode: user.zipcode,
    phone: user.phone,
  }.orderBy('id', 'asc'));

// create adopter
const addAdopter = user => knex('adopters').insert({
  user_id: user.userId,
  name: user.name,
  pets: user.hasPets,
  house_type: user.houseType,
}.orderBy('id', 'asc'));

// create organization
const addOrganization = user => knex('orgs').insert({
  name: user.name,
  user_id: user.userId,
}.orderBy('id', 'asc'));

// add favorite dog
const favoriteDog = favorite => knex('favoritedogs').insert({
  adopter_id: favorite.adopterId,
  dog_id: favorite.dogId,
}.orderBy('id', 'asc'));


/* Find in database methods */

// get all dogs associated with organization by org id
const getOrgDogs = orgId => knex.column(knex.raw('dogs.*, breed.name')).select()
  .from(knex.raw('dogs, breed'))
  .where(knex.raw(`dogs.org_id = ${orgId} and dogs.breed_id = breed.id`));

// get all organizations in orgs
const getAllOrganizations = () => knex.column(knex.raw('users.address, users.city, users.id, users.zipcode, users.phone, users.email, orgs.name')).select()
  .from(knex.raw('users, orgs'))
  .where(knex.raw('users.org_id = orgs.id'));

// get all dogs adopter has favorited
const getAdopterDogs = adopterId => knex.column(knex.raw('dogs.*')).select()
  .from(knex.raw('favoritedogs, dogs'))
  .where(knex.raw(`favoritedogs.adopter_id = ${adopterId} and dogs.id = favoritedogs.dog_id`));

// get user by username (login)
const getUserByUsername = username => knex.column(knex.raw('*')).select()
  .from(knex.raw('users'))
  .where(knex.raw(`username = ${username}`));

// get dog by id
const getDogById = id =>
  knex
    .column(knex.raw('*')).select()
    .from(knex.raw('dogs'))
    .where(knex.raw(`id = ${id}`));
>>>>>>> 9612a1417a40c2e3113a2fb20e891095c6b95ff5

const createUser = async (user, username, password) => {
  const query = await knex.select().from('users')
    .where(knex.raw(`LOWER(username) = LOWER('${username}')`));

  if (query.length) {
    return 'already exists!';
  }
  await knex('users').insert({
    username,
    password,
    email: user.email,
    address: user.address,
    city: user.city,
    zipcode: user.zipcode,
    phone: user.phone,
  });
  const userId = await knex.select('id').from('users').where('username', username);
  if (user.type === 'adopter') {
    await knex('adopters').insert({
      name: user.name,
      pets: user.pets,
      house_type: user.house_type,
      user_id: userId,
    });
  } else if (user.type === 'organization') {
    await knex('orgs').insert({ name: user.name });
    const orgId = await knex.select('id').from('orgs').where('name', user.name);
    await knex('users').where('id', userId).update('org_id', orgId);
  }
  return knex('users').select().where('id', userId);
};

const checkCredentials = username => knex.select().from('users')
  .where(knex.raw(`LOWER(username) = LOWER('${username}')`));

module.exports = {
<<<<<<< HEAD
  getAdopterProfile,
  getOrgProfile,
  addFavoriteDog,
  getOrgDogs,
  getAllOrganizations,
  getFavoriteDogs,
  createDog,
  createUser,
  checkCredentials,
  searchOrgsByName,
=======
  createDog,
  addUser,
  addAdopter,
  addOrganization,
  favoriteDog,
  getOrgDogs,
  getAllOrganizations,
  getAdopterDogs,
  getUserByUsername,
  getDogById,
>>>>>>> 9612a1417a40c2e3113a2fb20e891095c6b95ff5
};

