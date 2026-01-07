import Sequelize from 'sequelize';

export default async () => {
  const {
    DB_USERNAME,
    DB_USER_PASSWORD,
    DB_HOST,
    DB_PORT,
    DB_NAME,
  } = process.env;
  return new Sequelize(
    `postgresql://${DB_USERNAME}:${DB_USER_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`
  );
};
