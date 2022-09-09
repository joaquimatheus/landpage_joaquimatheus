### This is a Landpage of joaquimatheus.site

![index.png](https://github.com/joaquimatheus/landpage_joaquimatheus/blob/main/misc/index.png)
![about.png](https://github.com/joaquimatheus/landpage_joaquimatheus/blob/main/misc/about.png)
![projects.png](https://github.com/joaquimatheus/landpage_joaquimatheus/blob/main/misc/projects.png)

Before of start, you need to install these packages for the project

So run this command
``` shell
$ yarn install
```

Now you need to install a Postgres database because this App uses Postgres to 
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
postgres$ psql
```

Psql is a terminal-based fron-end to Postgres. It enables you to type in
queries interactively, issue them to Postgresl, and see the query results. The
documentation about [psql](https://www.postgresql.org/docs/current/app-psql.html)

Now you are inside of **psql shell** you will run theses commands to create databaase, a
user and give privileges for this user. *Follow below*

You can choose any name for your database and user

Create a new database
``` bash
psql$ CREATE DATABASE yourNameDatabase;
```

Create a new user
``` bash
psql$ CREATE USER yourUserName WITH EMCRYPTED PASSWORD 'yourPassword';
```

Grant privileges for the *yourUserName* to *yourNameDatabase*
``` bash
psql$ GRANT ALL PRIVILEGES ON DATABASE yourNameDatabase TO yourUserName WITH GRANT OPTION;
```

To exit
``` bash
psql$ \q
```

Return to your default user
``` bash
postgres$ exit 
root$ su yourUser
```

This commands had a lot other options you can view following the links below

- [CREATE DATABASE](https://www.postgresql.org/docs/current/sql-createdatabase.html)
- [CREATE USER](https://www.postgresql.org/docs/14/sql-createuser.html)
- [GRANT](https://www.postgresql.org/docs/current/sql-grant.html)

You need set the environment variables to connect the database in the **App**.
This App uses *dotenv* for this

**Attention!**
> you should never commit your .env variables if this happens anyone can view your
> .env variables in your git repository. Your .env variables have user, password,
> host, and name of the database and other sensitive things then anyone can hack
> your database and other things have in .env
>
> If you commit the .env file you should delete all commits ahead that have .env
> because these commits wil have the .env file
>
> The malicious person can just open that one commit that has a .env file

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

- This App uses [dotenv package](https://www.npmjs.com/package/dotenv) to loads environment variables in `.env` and to access this variable you do this.
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

3. You can view the knex config in `knexfile.js`
``` javascript
require('./dotenv');
// Is loading the env variables

module.exports = {
    development: {
        client: 'pg',
        connection: {
            host : process.env.PSQL_DB_HOST,
            database : process.env.PSQL_DB_DATABASE,
            user: process.env.PSQL_DB_USERNAME,
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
```
- Knexfile generally contains all of the configurations for your database
- **development:** is environment and the knex can load a lot of different environments configuration
- **client:** is which database that you are using in the project
- **connection:** is the client to create the connection
- **migrations:** the **directory** is where that migrations file is saved and the **tableName** is where knexfile saves the migrations on database
- **pool:** polling uses a cache of database connections instead of opening and closing connections for every request so this reduce overhead and network latency, **min** and **max** connections.
- The table and columns is saved `knex/migrations/20220413225245_form_contact.js` it 

4. You need to run this command using the knex to create the tables and columns
``` bash
$ yarn knex migrate:up
```

If you want the drop the tables
``` bash
$ yarn knex migrate:down
```

If you want to see all options of knex
``` bash
$ yarn knex
```

5. Now we need to check if the tables and columns is really created

Go back to *user postgres* and connect the database that was created
``` bash
postgres$ psql -U yourUserName -h localhost -d yourNameDatabase
```

Options:
- **-U** database username
- **-h** database server host
- **-d** database name to connect

Then you will write the password of the user that you will connect

After you entered run this command on psql
``` bash
psql$ \dt
```
Will show like this
| Schema | Name                 | Type   | Owner        |
| :--    |    :-------:         |  :--:  |       -----: |
| public | knex_migrations      | table  | yourUserName |
| public | knex_migrations_lock | table  | yourUserName |
| public | users                | table  | yourUserName |

To see the user's columns
``` bash
psql$ \d users
```
Or 
```
psql$ SELECT * FROM users;
```

Will show like this
| id | name |  subject | email | msg | utc_created_on |
| :- | :--: | :------: | :---: | :-: |     ---------: | 

Ok now the App can be used, but it will not send emails because of that always
you submit in the formulary the data will print in the terminal 'error sending
emails' why the App has a logger module.

---

If you want configure the emails sender *fellow below*, if not just skip

In the `.env`
``` bash
AWS_SES_USER='youUserSES'
AWS_SES_PASSWORD='youPassSES'
AWS_SES_HOST='youHostSES'
```

This App uses SMTP Server if you want to switch to the other service it will
work too.

1. Open you editor in `email.js` and config the email 
``` javascript
async function sendEmail(from, subject, name, msg) {
    const transporter = nodemailer.createTransport({
        host: process.env.AWS_SES_HOST,
        port: 587,
        secure: false,
        authL {
            user: process.env.AWS_SES_USER,
            pass: process.env.AWS_SES_PASSWORD
        }
    });
    // You don't need to change it if you are using SES
    // If you are using other port just change it

    let info = await transporter.sendEmail({
        from: from,
        to: 'yourEmailAddress',
        subject: `${name}: ${subject}`,
        text: msg
    })

    // In yourEmailAdress put your email
}
```

2. Is donee!
To start the App use this

``` bash
$ yarn dev
```

In the `package.json` in `"scripts": "dev": "npx nodemon webapp.js"`, nodemon is a package that always restarts the App when you saves

The App is running in port 7000, you can change it in `.env`
Example:
``` env
HTTP_PORT=1337
```

You can use this repo for anything, i don't care about copyrights just do it 

(=
