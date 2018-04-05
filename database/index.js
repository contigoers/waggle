const has = require('lodash/has');
const forEach = require('lodash/forEach');

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
  });
  const userId = await knex.select('id').from('users').where('username', username);
  if (user.type === 'adopter') {
    await knex('adopters').insert({
      name: user.name,
      pets: user.pets === 'yes',
      house_type: user.house,
      user_id: userId[0].id,
    });
  } else if (user.type === 'organization') {
    const orgQuery = await knex.select().from('orgs')
      .where(knex.raw(`LOWER(org_name) = LOWER('${user.name}')`));
    if (orgQuery.length) {
      return 'already exists!';
    }
    await knex('orgs').insert({ org_name: user.name });
    const orgId = await knex.select('id').from('orgs').where('org_name', user.name);
    await knex('users').where('id', userId[0].id).update('org_id', orgId[0].id);
  }
  return knex('users').select().where('id', userId[0].id);
};

const getAdopterId = userId => knex('adopters').select('id', 'name').where('user_id', userId);

const getOrgName = orgId => knex('orgs').select('org_name').where('id', orgId);

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
});

// get dog by id
const getDogById = dogId => knex('dogs').where('id', dogId);

// get organization ID from organization name query

const getOrgProfile = orgId => knex.column(knex.raw('users.address, users.city, users.state, users.zipcode, users.phone, users.email, orgs.*')).select()
  .from(knex.raw('users, orgs'))
  .where(knex.raw(`users.org_id = ${orgId} and orgs.id = ${orgId}`));

// get all dogs associated with organization by org id
const getOrgDogs = orgId => knex.column(knex.raw('dogs.*, orgs.org_name'))
  .select()
  .from(knex.raw('dogs, orgs'))
  .where(knex.raw(`dogs.org_id = ${orgId} and orgs.id = ${orgId}`));

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

const getUserById = userId => knex('users').where('id', userId);

const getUserByEmail = email => knex('users').where('email', email);

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
  return knex('dogs').where(knex.raw(query)).andWhere('adopted', false);
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

const addMessage = async (senderId, recipientId, message, dogName) => {
  const id = await knex('messages').insert({
    sender_id: senderId,
    recipient_id: recipientId,
    message,
    dogName,
  }).orderBy('id', 'asc');
  return knex('messages').select().where('id', id);
};

const deleteMessage = messageId => knex('messages')
  .where('id', messageId)
  .update('deleted', true);

const getMessagesForChat = async (userId, contactId) => {
  const messages = await knex.select()
    .from(knex.raw('messages'))
    .where(knex.raw(`sender_id in (${userId}, ${contactId}) and recipient_id in (${userId}, ${contactId})`))
    .orderBy('id', 'desc');
  return messages;
};

const updateDogInfo = values => knex('dogs')
  .where('id', values.id)
  .update(values);

const getOrgContacts = async (userId) => {
  const messages = await knex('messages').select('sender_id', 'dogName')
    .where('recipient_id', userId);
  const namesAndDogs = {};
  messages.forEach((message) => {
    if (!has(namesAndDogs, message.sender_id)) {
      namesAndDogs[message.sender_id] = { name: null, dogs: [] };
    }
    namesAndDogs[message.sender_id].dogs.push(message.dogName);
  });
  const ids = Object.keys(namesAndDogs);
  const contacts = [];
  if (ids.length) {
    const names = await knex.raw('select user_id, name from adopters where user_id in (?)', [ids]);
    names[0].forEach((obj) => {
      if (has(namesAndDogs, obj.user_id)) {
        namesAndDogs[obj.user_id].name = obj.name;
      }
    });
    forEach(namesAndDogs, (innerObj, key) => {
      contacts.push({ id: key, name: innerObj.name, dogs: innerObj.dogs });
    });
  }
  return contacts;
};

const getAdopterContacts = async (userId) => {
  const messages = await knex('messages').select('recipient_id', 'dogName')
    .where('sender_id', userId);
  const namesAndDogs = {};
  messages.forEach((message) => {
    if (!has(namesAndDogs, message.recipient_id)) {
      namesAndDogs[message.recipient_id] = { name: null, dogs: [] };
    }
    namesAndDogs[message.recipient_id].dogs.push(message.dogName);
  });
  const ids = Object.keys(namesAndDogs);
  const contacts = [];
  if (ids.length) {
    const names = await knex.raw('select users.id, orgs.org_name from (select * from users where id in (?)) as users inner join orgs on users.org_id = orgs.id', [ids]);
    names[0].forEach((obj) => {
      if (has(namesAndDogs, obj.id)) {
        namesAndDogs[obj.id].name = obj.org_name;
      }
    });
    forEach(namesAndDogs, (innerObj, key) => {
      contacts.push({
        id: key,
        name: innerObj.name,
        dogs: innerObj.dogs,
      });
    });
  }
  return contacts;
};

const updateForgotPassword = (email, token) => knex('users')
  .where('email', email)
  .update('forgot_pw_link', token);

const updatePassword = (token, hash) =>
  knex('users')
    .where('forgot_pw_link', token)
    .update({
      password: hash,
      forgot_pw_link: null,
    });

const checkEmail = email => knex('users').where('email', email);

const checkLinkExists = token => knex('users').where('forgot_pw_link', token);

/* *********************  END OF TESTED AND APPROVED DB QUERIES ********************************* */

module.exports = {
  getAdopterProfile,
  getOrgProfile,
  addFavoriteDog,
  getOrgDogs,
  getFavoriteDogs,
  createDog,
  createUser,
  checkCredentials,
  getDogById,
  searchOrgDogs,
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
  getOrgContacts,
  getAdopterContacts,
  getOrgName,
  updateDogInfo,
  updateForgotPassword,
  getUserByEmail,
  updatePassword,
  checkEmail,
  checkLinkExists,
};
