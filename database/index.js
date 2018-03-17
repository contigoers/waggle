
const config = {
  client: process.env.CLIENT || 'pg',
  connection: process.env.DATABASE_URL,
};

if (config.client === 'pg') {
  config.ssl = true;
}

const knex = require('knex')(config);

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
};
