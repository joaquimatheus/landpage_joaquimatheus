require('./dotenv');

module.exports = {
  client: 'pg',
  version: '13.6',
  connection: {
    host : process.env.PSQL_DB_HOST,
    user : process.env.PSQL_DB_USERNAME,
    password : process.env.PSQL_DB_PASSWORD,
    database : process.env.PSQL_DB_DATABASE,
  },
  pool: { min: 0, max: 10 },

  migrations: {
    tableName: 'knex_migrations'
  }
};

