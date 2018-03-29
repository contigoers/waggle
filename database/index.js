const config = {
  client: 'mysql',
  connection: process.env.DATABASE_URL,
};

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
    state: user.state,
    zipcode: user.zipcode,
    phone: user.phone,
    org_id: 1, // default organization ID for adopters
  }).orderBy('id', 'asc');
  const userId = await knex.select('id').from('users').where('username', username);
  if (user.type === 'adopter') {
    await knex('adopters').insert({
      name: user.name,
      pets: user.pets === 'yes',
      house_type: user.house,
      user_id: userId[0].id,
    }).orderBy('id', 'asc');
  } else if (user.type === 'organization') {
    const orgQuery = await knex.select().from('orgs')
      .where(knex.raw(`LOWER(org_name) = LOWER('${user.name}')`));
    if (orgQuery.length) {
      return 'already exists!';
    }
    await knex('orgs').insert({
      org_name: user.name,
    }).orderBy('id', 'asc');
    const orgId = await knex.select('id').from('orgs').where('org_name', user.name);
    await knex('users').where('id', userId[0].id).update('org_id', orgId[0].id);
  }
  return knex('users').select().where('id', userId[0].id);
};

const getAdopterId = userId => knex('adopters').select('id').where('user_id', userId);

// get user by username (login)
// add select all from users and adopter id if adopter (version?)
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
const getDogById = dogId => knex('dogs').where('id', dogId);

// get organization ID from organization name query
const searchOrgsByName = orgName => knex('orgs').select('id').where('org_name', orgName);

const getOrgProfile = orgId => knex.column(knex.raw('users.address, users.city, users.state, users.zipcode, users.phone, users.email, orgs.*')).select()
  .from(knex.raw('users, orgs'))
  .where(knex.raw(`users.org_id = ${orgId} and orgs.id = ${orgId}`));

// get all dogs associated with organization by org id
const getOrgDogs = orgId => knex.raw(`
  SELECT dogs.*, orgs.org_name
  FROM dogs, orgs
  WHERE dogs.org_id = ${orgId} and orgs.id = ${orgId}`);

const getAdopterProfile = adopterId => knex.column(knex.raw('users.address, users.city, users.state, users.zipcode, users.phone, users.email, adopters.*')).select()
  .from(knex.raw('users, adopters'))
  .where(knex.raw(`users.id = adopters.user_id and adopters.id = ${adopterId}`));

// get all dogs adopter has favorited
const getFavoriteDogs = adopterId => knex.column(knex.raw('dogs.*, orgs.org_name')).select()
  .from(knex.raw('favoritedogs, dogs, orgs'))
  .where(knex.raw(`favoritedogs.adopter_id = ${adopterId} and dogs.id = favoritedogs.dog_id and orgs.id = dogs.org_id`));

// add dog to adopter's favorite dogs
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

// remove dog from adopter's favorite dogs
const removeFavoriteDog = async (adopterId, dogId) => {
  const query = await knex.select().from('favoritedogs')
    .where('adopter_id', adopterId).andWhere('dog_id', dogId);
  if (!query.length) {
    return 'favorite does not exist!';
  }
  await knex('favoritedogs').where('adopter_id', adopterId).andWhere('dog_id', dogId).del();
  return getFavoriteDogs(adopterId);
};

// get all organizations in orgs
const getAllOrganizations = () => knex.column(knex.raw('users.address, users.city, users.state, users.zipcode, users.phone, users.email, orgs.*')).select()
  .from(knex.raw('users, orgs'))
  .where(knex.raw('users.org_id = orgs.id'));

// get all dogs and info
const getAllDogs = () => knex.column(knex.raw('dogs.*, orgs.org_name')).select()
  .from(knex.raw('dogs, orgs'))
  .where(knex.raw('orgs.id = dogs.org_id'));

const getUserById = userId => knex('users').where('id', userId);

const markAsAdopted = dogId => knex('dogs').where('id', dogId).update('adopted', true);

const unmarkAsAdopted = dogId => knex('dogs').where('id', dogId).update('adopted', false);

const searchOrgDogs = (dogFilters) => {
  let query = '';
  Object.keys(dogFilters).forEach((prop) => {
    query = `${query}(`;
    const array = dogFilters[prop]; // need to JSON.parse this for postman testing
    if (typeof array[0] === 'string') {
      query += array.map(val => `dogs.${prop} = "${val}" or`);
    } else {
      query += array.map(val => `dogs.${prop} = ${val} or`);
    }
    const temp = query.split(' ');
    if (temp[temp.length - 1] === 'or') {
      temp.pop();
    }
    query = `${temp.join(' ')}) and `;
  });
  query = query.split(',').join(' ').split(' ');
  query.splice(query.length - 2, 2);
  query = query.join(' ');
  return knex('dogs').where(knex.raw(query));
};

const getOrgsAfterDogs = (orgs) => {
  let whereQuery = '';

  orgs.forEach((id, i) => {
    if (i < orgs.length - 1) {
      whereQuery = whereQuery.concat(`users.org_id = ${id} and orgs.id = ${id} or `);
    } else {
      whereQuery = whereQuery.concat(`users.org_id = ${id} and orgs.id = ${id}`);
    }
  });

  return knex.column(knex.raw('orgs.*, users.address, users.city, users.state, users.zipcode, users.phone, users.email'))
    .select()
    .from(knex.raw('users, orgs'))
    .where(knex.raw(whereQuery));
};

const getRandomDog = () => knex.select()
  .from(knex.raw('dogs'))
  .where(knex.raw('adopted = false order by rand() limit 1'));

const addMessage = async (senderId, recipientId, message) => {
  const id = await knex('messages').insert({
    sender_id: senderId,
    recipient_id: recipientId,
    message,
  }).orderBy('id', 'asc');
  return knex('messages').select().where('id', id);
};

const deleteMessage = messageId => knex('messages')
  .where('id', messageId)
  .update('deleted', true);

const getMessagesForChat = (userId, contactId) => knex.distinct().select()
  .from(knex.raw('messages'))
  .where(knex.raw(`sender_id in (${userId}, ${contactId}) and recipient_id in (${userId}, ${contactId})`));

/* *********************  END OF TESTED AND APPROVED DB QUERIES ********************************* */

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
  markAsAdopted,
  unmarkAsAdopted,
  removeFavoriteDog,
  getOrgsAfterDogs,
  getAdopterId,
  getRandomDog,
  getMessagesForChat,
  deleteMessage,
  addMessage,
};
