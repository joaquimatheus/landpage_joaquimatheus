require('dotenv');

const knex = require('knex')({
  client: 'pg',
  version: '13.6',
  connection: {
    host : PSQL_DB_HOST,
    user : PSQL_DB_USERNAME,
    password : PSQL_DB_PASSWORD,
    database : PSQL_DB_DATABASE,
  },
  pool: { min: 0, max: 10 },

  migrations: {
    tableName: 'migrations'
  }
});
