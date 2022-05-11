### This is a Landpage of joaquimatheus.site

before of start, you need to install the packages for the project

So run this command
``` shell
$ yarn install
```

Now you need to install a Postgres database because this app uses Postgres to 
save the form values

You can install Postgres using the official website of Postgres or using the 
official repositores of your Linux distro.

The official website has Windows Installer for Windows Users too

You too can install Postgres using docker or docker-compose you are free to 
choose which way do you want.

- [Official website](https://www.postgresql.org/download/)
- [Docker Image](https://hub.docker.com/_/postgres)

When you have installed the Postgres you will run these commands;
but before you will need to switch for the postgres user in Linux Distros
has a lot of ways to do that, I will show the easy way to do this

You are now root user
``` bash
$ sudo su
```

And now you are on User Postgres 
``` bash
$ su postgres
```

And run this command 
``` bash
$ psql
```
Psql is a terminal-based fron-end to Postgres. It enables you to type in
queries interactively, issue them to Postgresl, and see the query results. The
documentation about [psql](https://www.postgresql.org/docs/current/app-psql.html)

Now you are inside of **psql shell** you will run theses commands to create, a
user and give privileges for this user. *Follow above*

you can choose any name for your database and user

Create a new database
``` bash
$ CREATE DATABASE yourNameDatabase;
```

Create a new user
```
$ CREATE USER yourUserName WITH EMCRYPTED PASSWORD 'yourPassword';
```

Grant privileges for the *yourUserName* to *yourNameDatabase*
```
$ GRANT ALL PRIVILEGES ON DATABASE yourNameDatabase TO yourUserName WITH GRANT OPTION;
```

You need set the environment variables to connect the database in the **app**.
This app uses *knex* for this

1. Rename .env-sample to .env
``` bash
$ cp .env-sample .env
```
2. Edit the .env and put in all database config that you created
    The others environment variables you don't need to change

``` env
PSQL_DB_HOST='localhost'
PSQL_DB_DATABASE='yourNameDatabase'
PSQL_DB_USERNAME='yourUserNmae'
PSQL_DB_PASSWORD='yourPassword'
```

[Knex](http://knexjs.org/) is SQL [query builder](https://docs.devart.com/studio-for-mysql/building-queries-with-query-builder/query-builder-overview.html) and weneed to connect the database in Knex. *Fellow above*

- This app uses [dotenv package](https://www.npmjs.com/package/dotenv) to loads environment variables in `.env` and to access this variable you do this.
- `dontenv.js` is a file that loads all environmen variables and it's more simples import this file in other files. 
- You can view this file how config the *dontenv*

Example:
``` javascript
require('./dotenv.js');
const pgHost = process.env.PSQL_DB_HOST;
console.log(pgHost);
    // return 'localhost';
```


3. You need run this command using the knex to create the tables and columns
```
$ yarn knex migrate:up
```



Create a new user in psql terminal

You can use this repo for anything, i don't care about copyrights just do it 

(=
