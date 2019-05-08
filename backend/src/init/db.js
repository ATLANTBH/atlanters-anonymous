import Sequelize from 'sequelize';

export default async (isDevelopment) => {
  const localConnection = {
    connectionString: process.env.PGDATABASE,
    ssl: process.env.PGSSL,
    dialect: 'postgres',
    logging: false
  };

  const pgConnection = process.env.PGREMOTE_DATABASE

  return new Sequelize(isDevelopment ? localConnection : pgConnection);
};
