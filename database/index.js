
const config = {
  client: process.env.CLIENT || 'pg',
  connection: process.env.DATABASE_URL,
};

if (config.client === 'pg') {
  config.ssl = true;
}

const knex = require('knex')(config);

/* ********************* TESTED AND APPROVED DB QUERIES YAY! ********************************* */

// creates user and creates either adopter profile or organization profile
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
    org_id: 1, // default organization ID for adopters
  }).orderBy('id', 'asc');
  const userId = await knex.select('id').from('users').where('username', username);
  if (user.type === 'adopter') {
    await knex('adopters').insert({
      name: user.name,
      pets: user.pets,
      house_type: user.houseType,
      user_id: userId[0].id,
    }).orderBy('id', 'asc');
  } else if (user.type === 'organization') {
    await knex('orgs').insert({
      org_name: user.name,
      user_id: userId[0].id,
    }).orderBy('id', 'asc');
    const orgId = await knex.select('id').from('orgs').where('user_id', userId[0].id);
    await knex('users').where('id', userId[0].id).update('org_id', orgId[0].id);
  }
  return knex('users').select().where('id', userId[0].id);
};

// get user by username (login)
const checkCredentials = username => knex.select().from('users')
  .where(knex.raw(`LOWER(username) = LOWER('${username}')`));

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
  org_id: dog.orgId,
}).orderBy('id', 'asc');

// get dog by id
const getDogById = dogId => knex.column(knex.raw('dogs.*, orgs.org_name')).select()
  .from(knex.raw('dogs, orgs'))
  .where(knex.raw(`dogs.id = ${dogId} and dogs.org_id = orgs.id`));

// get organization ID from organization name query
const searchOrgsByName = orgName => knex('orgs').select('id').where('org_name', orgName);

const getOrgProfile = orgId => knex.column(knex.raw('users.address, users.city, users.id, users.zipcode, users.phone, users.email, orgs.*')).select()
  .from(knex.raw('users, orgs'))
  .where(knex.raw(`users.org_id = ${orgId} and orgs.id = ${orgId} and orgs.user_id = users.id`));

// get all dogs associated with organization by org id
const getOrgDogs = orgId => knex.raw(`
  SELECT dogs.*, orgs.org_name
  FROM dogs, orgs
  WHERE dogs.org_id = ${orgId} and orgs.id = ${orgId}`);

const getAdopterProfile = adopterId => knex.column(knex.raw('users.address, users.city, users.id, users.zipcode, users.phone, users.email, adopters.*')).select()
  .from(knex.raw('users, adopters'))
  .where(knex.raw(`users.id = adopters.user_id and adopters.id = ${adopterId}`));

// get all dogs adopter has favorited
const getFavoriteDogs = adopterId => knex.column(knex.raw('dogs.*, orgs.org_name')).select()
  .from(knex.raw('favoritedogs, dogs, orgs'))
  .where(knex.raw(`favoritedogs.adopter_id = ${adopterId} and dogs.id = favoritedogs.dog_id and orgs.id = dogs.org_id`));

// add favorite dog
const addFavoriteDog = async (adopterId, dogId) => {
  const query = await knex.select().from('favoritedogs')
    .where('adopter_id', adopterId).andWhere('dog_id', dogId);
  if (query.length) {
    return 'already exists!';
  }
  await knex('favoritedogs').insert({
    adopter_id: adopterId,
    dog_id: dogId,
  }).orderBy('id', 'asc');
  return getFavoriteDogs(adopterId);
};

// get all organizations in orgs
const getAllOrganizations = () => knex.column(knex.raw('users.address, users.city, users.id, users.zipcode, users.phone, users.email, orgs.*')).select()
  .from(knex.raw('users, orgs'))
  .where(knex.raw('users.org_id = orgs.id and orgs.user_id = users.id'));

// get all dogs and info
const getAllDogs = () => knex.column(knex.raw('dogs.*, orgs.org_name')).select()
  .from(knex.raw('dogs, orgs'))
  .where(knex.raw('orgs.id = dogs.org_id'));

const getUserById = userId => knex('users').where('id', userId);

/* *********************  END OF TESTED AND APPROVED DB QUERIES ********************************* */

// search dogs within organization by org id and other parameters
const searchOrgDogs = query => knex.column(knex.raw('dogs.*, orgs.org_name')).select()
  .from(knex.raw('dogs, orgs'))
  .where(knex.raw(`dogs.org_id = ${query.orgId} and orgs.id = ${query.orgId}`));

module.exports = {
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
  getDogById,
  searchOrgDogs,
  getAllDogs,
  getUserById,
};

