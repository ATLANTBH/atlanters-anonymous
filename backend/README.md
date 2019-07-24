# Atlanters Anonymous Backend

> Backend for atlanters anonymous written in nodejs

## Local Setup

### 1. Install postgres

```
brew install postgres
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
psql postgres
```

- Create the user and add a role

```
postgres=# CREATE USER {name};
```

Note: {name} is provided in your error message.

```
postgres=# ALTER USER {name} PASSWORD '{password}';
postgres=# ALTER USER {name} SUPERUSER CREATEDB;
```

- Create your database

```
postgres=# CREATE DATABASE {db_name};
```

For other errors check out [this link](https://www.postgresql.org/docs/10/tutorial-createdb.html)

---

### 3. In backend root directory create .env file:

```
cp example.env .env
```

Alter the following values:

```
PORT=65534
DB_USERNAME={user}
DB_USER_PASSWORD={password}
DB_HOST={host} (ex. localhost)
DB_PORT={db_port} (ex. 5432)
DB_NAME={db_name}
```

If you want to work with feedback submission, change the following values according to the e-mail you want to use:

```
EMAIL_FEEDBACK=email@email.com
EMAIL_FEEDBACK_PW=password
EMAIL_PORT=465,
EMAIL_HOST=smtp.mail.yahoo.com
EMAIL_SERVICE=yahoo
```

---

### 4. Install dependencies and start express server:

```
npm install
npm start
```
