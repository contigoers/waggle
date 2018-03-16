const config = require('./config.example.js');

let knex;

if (config.mySql) {
  knex = require('knex')({
    client: 'mysql',
    connection: config.mySql,
  });
} else {
  knex = require('knex')({
    client: 'pg',
    connection: process.env.DATABASE_URL,
    ssl: true,
  });
}

const getOrgDogs = orgId => knex.column(knex.raw('dogs.*, breed.name')).select()
  .from(knex.raw('dogs, breed'))
  .where(knex.raw(`dogs.org_id = ${orgId} and dogs.breed_id = breed.id`));

const getAllOrganizations = () => knex.column(knex.raw('users.address, users.city, users.id, users.zipcode, users.phone, users.email, orgs.name')).select()
  .from(knex.raw('users, orgs'))
  .where(knex.raw('users.org_id = orgs.id'));

const getAdopterDogs = adopterId => knex.column(knex.raw('dogs.*, breed.name')).select()
  .from(knex.raw('favoritedogs, dogs, breed'))
  .where(knex.raw(`favoritedogs.adopter_id = ${adopterId} and dogs.id = favoritedogs.dog_id and dogs.breed_id = breed.id`));

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
