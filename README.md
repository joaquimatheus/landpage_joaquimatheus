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

``` shell
$ sudo su
```
You are now root user

``` shell
$ su postgres
```
And now you are on User Postgres 

``` shell
$ psql
```
Psql is a terminal-based fron-end to Postgres. It enables you to type in
queries interactively, issue them to Postgresl, and see the query results. The
documentation about [psql](https://www.postgresql.org/docs/current/app-psql.html)

You can use this repo for anything, i don't care about copyrights just do it 

(=
