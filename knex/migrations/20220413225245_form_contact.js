exports.up = function(knex) {
    return knex.raw(`
        CREATE SEQUENCE seq_users;
        CREATE TABLE users (
            id INT NOT NULL
                CONSTRAINT pk_users PRIMARY KEY DEFAULT NEXTVAL('seq_users'),

            name TEXT NOT NULL,
            subject VARCHAR(100) NOT NULL,
            email TEXT NOT NULL,
            msg TEXT NOT NULL,

            utc_created_on TIMESTAMP
                NOT NULL CONSTRAINT df_users_utc_created_on DEFAULT (NOW())
        );

        ALTER SEQUENCE seq_users OWNED BY users.id;
    `)  
};

exports.down = function(knex) {
    return knex.raw(`
        DROP TABLE users;
    `) 
};
