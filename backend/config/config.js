require('dotenv').config();

// properties matched with NODE_ENV environment variable
module.exports = {
  dev: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_USER_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: 'postgres',
  },
  production: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_USER_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: 'postgres',
  },
};
