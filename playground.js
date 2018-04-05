const config = {
  client: 'mysql',
  connection: 'mysql://root:root@127.0.0.1:3306/waggl',
};

const knex = require('knex')(config);

const getOrgByName = name => knex('orgs').where('org_name', name);

const test = async (name) => {
  const info = (await getOrgByName(name));

  console.log(info);
};

test('Small chance Rescue');
