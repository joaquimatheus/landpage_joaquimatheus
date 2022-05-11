### This is a Landpage of joaquimatheus.site

Before of start, you need to install these packages for the project

So run this command
``` shell
$ yarn install
```

Now you need to install a Postgres database because this app uses Postgres to 
save the form values.

You can install Postgres using the official website of Postgres or using the 
official repositores of your Linux distro.

The official website has Windows Installer for Windows Users too.

You too can install Postgres using docker or docker-compose you are free to 
choose which way do you want.

- [Official website](https://www.postgresql.org/download/)
- [Docker Image](https://hub.docker.com/_/postgres)

When you have installed the Postgres you will run these commands;
but before you will need to switch for the postgres user in Linux Distros
has a lot of ways to do that, I will show the easy way to do this.


Enter the root user
``` bash
$ sudo su
```

Enter the postgres user
``` bash
$ su postgres
```

And run it
``` bash
$ psql
```

Psql is a terminal-based fron-end to Postgres. It enables you to type in
queries interactively, issue them to Postgresl, and see the query results. The
documentation about [psql](https://www.postgresql.org/docs/current/app-psql.html)

Now you are inside of **psql shell** you will run theses commands to create databaase, a
user and give privileges for this user. *Follow below*

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

This commands had a lot other options you can view following the links below

- [CREATE DATABASE](https://www.postgresql.org/docs/current/sql-createdatabase.html)
- [CREATE USER](https://www.postgresql.org/docs/14/sql-createuser.html)
- [GRANT](https://www.postgresql.org/docs/current/sql-grant.html)

You need set the environment variables to connect the database in the **app**.
This app uses *dontenv* for this

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

- This app uses [dotenv package](https://www.npmjs.com/package/dotenv) to loads environment variables in `.env` and to access this variable you do this.
- `dontenv.js` is a file that loads all environment variables and it's more simples import this file in other files. 
- You can view this file how config the *dontenv*

Example:
``` javascript
require('./dotenv');
const pgHost = process.env.PSQL_DB_HOST;
console.log(pgHost);
    // return 'localhost';
```
[Knex](http://knexjs.org/) is SQL [query builder](https://docs.devart.com/studio-for-mysql/building-queries-with-query-builder/query-builder-overview.html) and we are goint to use [migrations](https://en.wikipedia.org/wiki/Schema_migration) to management the schemas on database

3. You need run this command using the knex to create the tables and columns
``` bash
$ yarn knex migrate:up
```

If you want the drop the tables
``` bash
$ yarn knex migrate:down
```

If you want see all options of knex
``` bash
$ yarn knex
```

4. Now we need to check if the tables and columns is really created

Connect the database that was created
``` bash
postgres#~ psql -U yourUserName -h localhost -d yourNameDatabase
```

Options
- **-U** database username
- **-h** database server host
- **-d** database name to connect

Then you will write the password of the user that you will connect
After you entered 

``` bash
psql$ \dt
```
| Schema | Name                 | Type   | Owner        |
| :--    |    :-------:         |  :--:  |       -----: |
| public | knex_migrations      | table  | yourUserName |
| public | knex_migrations_lock | table  | yourUserName |
| public | users                | table  | yourUserName |

You can use this repo for anything, i don't care about copyrights just do it 

(=
