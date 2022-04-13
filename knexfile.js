require('./dotenv');

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
  development: {
    client: 'postgresql',
    connection: {
      host: process.env.PSQL_DB_HOST,
      database: process.env.PSQL_DB_DATABASE,
      user:     process.env.PSQL_DB_USERNAME,
      password: process.env.PSQL_DB_PASSWORD
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },
};
