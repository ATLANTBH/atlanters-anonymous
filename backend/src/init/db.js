import Sequelize from 'sequelize';

export default async isDevelopment => {
  const localConnection = {
    connectionString: process.env.PGDATABASE,
    ssl: process.env.PGSSL,
    dialect: 'postgres',
    logging: false,
  };

  return new Sequelize(
    isDevelopment ? localConnection : process.env.DATABASE_URL
  );
};
