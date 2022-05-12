require('./dotenv')

module.exports = {

    development: {
        client: 'pg',
        connection: {
            host : process.env.PSQL_DB_HOST,
            database : process.env.PSQL_DB_DATABASE,
            user : process.env.PSQL_DB_USERNAME,
            password : process.env.PSQL_DB_PASSWORD
        },
        migrations: {
            directory: __dirname + '/knex/migrations',
            tableName: "knex_migrations"
        },
        pool : {
            min: 0,
            max: 10
        }
    }
}
