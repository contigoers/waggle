
const config = {
  client: process.env.CLIENT || 'pg',
  connection: process.env.DATABASE_URL,
};

if (config.client === 'pg') {
  config.ssl = true;
}

const knex = require('knex')(config);


const getOrgDogs = orgId => knex.column(knex.raw('dogs.*, breed.name')).select()
  .from(knex.raw('dogs, breed'))
  .where(knex.raw(`dogs.org_id = ${orgId} and dogs.breed_id = breed.id`));

const getAllOrganizations = () => knex.column(knex.raw('users.address, users.city, users.id, users.zipcode, users.phone, users.email, orgs.name')).select()
  .from(knex.raw('users, orgs'))
  .where(knex.raw('users.org_id = orgs.id'));

const getAdopterDogs = adopterId => knex.column(knex.raw('dogs.*')).select()
  .from(knex.raw('favoritedogs, dogs'))
  .where(knex.raw(`favoritedogs.adopter_id = ${adopterId} and dogs.id = favoritedogs.dog_id`));

const createDog = (dog, orgId, breedId) => knex('dogs').insert({
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
  breed_id: breedId,
  org_id: orgId,
}).orderBy('id', 'asc');

module.exports = {
  getOrgDogs,
  getAllOrganizations,
  getAdopterDogs,
  createDog,
};
