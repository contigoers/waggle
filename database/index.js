
const config = {
  client: process.env.CLIENT || 'pg',
  connection: process.env.DATABASE_URL,
};

if (config.client === 'pg') {
  config.ssl = true;
}

const knex = require('knex')(config);

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

module.exports = {
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
};

