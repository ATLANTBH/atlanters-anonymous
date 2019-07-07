# Atlanters Anonymous Backend

> Backend for atlanters anonymous written in nodejs

## Setup

### 1. Install postgres
```
sudo apt-get install postgresql-10
```
---
### 2. Create a postgres database:
```
createdb {db_name}
```
Note: You might encouter following errors:
```
createuser: could not connect to database postgres: FATAL: role "{name}" does not exist
```
or
```
createdb: database creation failed: ERROR:  permission denied to create database
```
In that case it is necessary to create a user with the name given in the error and assign a role to it. If you did not receive any errors, you can skip below steps but make sure you know role username and password.

- Connect to psql:
```
sudo -u postgres psql
```
- Create the user and add a role
```
CREATE USER {name};
```
Note: {name} is provided in your error message.
```
ALTER USER {name} PASSWORD '{password}';
ALTER USER {name} SUPERUSER CREATEDB;
```
- Create your database
```
CREATE DATABASE {db_name};
```
For other errors check out [this link](https://www.postgresql.org/docs/10/tutorial-createdb.html)

---
### 3. Create .env file:
```
cp example.env .env
```
Alter the following values:
```
PORT=65534
PGDATABASE={db_name}
PGUSER={user}
PGPASSWORD={password}
```
If you want to work with feedback submission, change the following values according to the e-mail you want to use:
```
EMAIL_FEEDBACK=email@email.com
EMAIL_FEEDBACK_PW=password
EMAIL_PORT=465,
EMAIL_HOST=smtp.mail.yahoo.com
EMAIL_SERVICE=yahoo
```
Change the port if taken and no need to change any other values.

---
### 4. Install dependencies and start express server:
```
npm install
npm start
```
Start postman and trigger a REST call. If you changed the PORT value, also modify the 'local' variable.