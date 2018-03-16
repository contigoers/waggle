const config = require('./config.js');
let knex;

if (config.mySql) {
  knex = require('knex')({
    client: 'mysql',
    connection: config.mySql
  });
} else {
  knex = require('knex')({
    client: 'pg',
    connection: process.env.DATABASE_URL,
    ssl: true
  });
}

const getOrgDogs = async (orgID) => {
  return await knex.column(knex.raw('dogs.*'))
  .where
};



module.exports = {

};
