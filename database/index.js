const { orderBy } = require('lodash');

const config = {
  client: 'mysql',
  connection: process.env.DATABASE_URL,
};

const knex = require('knex')(config);

/* ********************* TESTED AND APPROVED DB QUERIES YAY! ********************************* */

const getOrgByName = name => knex('orgs').where('org_name', name);

const getUserByUsername = name => knex('users').where('username', name);

// creates user and creates either adopter profile or organization profile
const createUser = async (user, username, password) => {
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
  const userId = (await knex.select('id').from('users').where('username', username))[0].id;
  if (user.type === 'adopter') {
    await knex('adopters').insert({
      name: user.name,
      pets: user.pets === 'yes',
      house_type: user.house,
      user_id: userId,
    });
  } else if (user.type === 'organization') {
    await knex('orgs').insert({ org_name: user.name });
    const orgId = (await getOrgByName(user.name))[0].id;
    await knex('users').where('id', userId).update('org_id', orgId);
  }
  return knex('users').where('id', userId);
};

const getFacebookUserUserId = profileId => knex.select('user_id')
  .from('fbUsers')
  .where('profile_id', profileId);

const createFacebookUser = async (profile) => {
  await knex('users').insert({
    username: profile.id,
    password: null,
    email: null,
    address: null,
    city: null,
    state: null,
    zipcode: null,
    phone: null,
    org_id: 1,
  });
  const userId = (await getUserByUsername(profile.id))[0].id;
  let { name } = profile;
  name = `${name.givenName} ${name.familyName}`;
  await knex('adopters').insert({
    name,
    pets: 0,
    house_type: null,
    user_id: userId,
  });
  await knex('fbUsers').insert({
    profile_id: profile.id,
    user_id: userId,
  });
  return knex('users').where('id', userId);
};

const updateFacebookUser = async (values) => {
  await knex('users')
    .where('id', values.id)
    .update({
      username: values.username,
      email: values.email,
      address: values.address,
      city: values.city,
      state: values.state,
      zipcode: values.zipcode,
      phone: values.phone,
    });
  await knex('adopters')
    .where('user_id', values.id)
    .update({
      pets: values.pets === 'yes',
      house_type: values.house,
    });
};

const getAdopterId = userId => knex('adopters').select('id', 'name').where('user_id', userId);

const getOrgName = orgId => knex('orgs').select('org_name').where('id', orgId);

// get user by username (login)
// add select all from users and adopter id if adopter (version?)
const checkCredentials = (username, email) => knex('users')
  .where(knex.raw(`username = '${username}' OR email = '${email}'`));

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

const getOrgProfile = orgId => knex.column(knex.raw('users.id as userId, users.address, users.city, users.state, users.zipcode, users.phone, users.email, orgs.*')).select()
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

  return knex.column(knex.raw('orgs.*, users.id as userId, users.address, users.city, users.state, users.zipcode, users.phone, users.email'))
    .select()
    .from(knex.raw('users, orgs'))
    .where(knex.raw(whereQuery));
};

const getRandomDog = () => knex.select()
  .from(knex.raw('dogs'))
  .where(knex.raw('adopted = false order by rand() limit 1'));

const updateDogInfo = values => knex('dogs')
  .where('id', values.id)
  .update(values);

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

const checkForNewMessages = async (userId) => {
  const results = await knex.select('read')
    .from('messages')
    .where('recipient_id', userId);
  let hasUnreads = false;
  results.forEach((result) => {
    if (result.read === 0) {
      console.log('dis an unread')
      hasUnreads = true;
    }
  });
  return hasUnreads;
};

const getOrgContacts = async (userId) => {
  const [results] = await knex.raw(`select
  messages.*, adopters.name from
    (select * from messages where sender_id = ${userId} or recipient_id = ${userId}) as messages
    inner join adopters on adopters.user_id = messages.sender_id or adopters.user_id = messages.recipient_id
    order by messages.id desc`);
  let contacts = [];
  if (results[0]) {
    const contactsObj = {};
    results.forEach((message) => {
      const contactId = message.sender_id === +userId ?
        message.recipient_id : message.sender_id;
      if (!Object.prototype.hasOwnProperty.call(contactsObj, contactId)) {
        contactsObj[contactId] = {
          userId: contactId,
          name: message.name,
          dogs: message.dogName ? [message.dogName] : [],
          lastMessage: message.id,
          hasUnreads: false,
        };
      } else if (message.dogName) {
        contactsObj[contactId].dogs.push(message.dogName);
      }
      if (message.recipient_id === +userId && message.read === 0) {
        contactsObj[contactId].hasUnreads = true;
      }
    });
    contacts = orderBy(contactsObj, 'lastMessage', 'desc');
  }
  return contacts;
};

const getAdopterContacts = async (userId) => {
  const [results] = await knex.raw(`select
    messages.*, orgs.org_name from
    (select * from messages where sender_id = ${userId} or recipient_id = ${userId}) as messages 
    inner join (select * from users where org_id > 1) as users 
    on users.id = messages.sender_id or users.id = messages.recipient_id inner join orgs
    on users.org_id = orgs.id order by messages.id desc`);
  let contacts = [];
  if (results[0]) {
    const contactsObj = {};
    results.forEach((message) => {
      const contactId = message.sender_id === +userId ?
        message.recipient_id : message.sender_id;
      if (!Object.prototype.hasOwnProperty.call(contactsObj, contactId)) {
        contactsObj[contactId] = {
          userId: contactId,
          name: message.org_name,
          dogs: message.dogName ? [message.dogName] : [],
          lastMessage: message.id,
          hasUnreads: false,
        };
      } else if (message.dogName && !contactsObj[contactId].dogs.includes(message.dogName)) {
        contactsObj[contactId].dogs.push(message.dogName);
      }
      if (message.recipient_id === +userId && message.read === 0) {
        contactsObj[contactId].hasUnreads = true;
      }
    });
    contacts = orderBy(contactsObj, 'lastMessage', 'desc');
  }
  return contacts;
};

const markAllRead = (userId, contactId) => knex('messages')
  .where({
    sender_id: contactId,
    recipient_id: userId,
  })
  .update({ read: 1 });

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
  getOrgByName,
  markAllRead,
<<<<<<< HEAD
  checkForNewMessages,
=======
  createFacebookUser,
  getUserByUsername,
  getFacebookUserUserId,
  updateFacebookUser,
>>>>>>> 590fc8c873159725042d54ad88f23efc8247426a
};
