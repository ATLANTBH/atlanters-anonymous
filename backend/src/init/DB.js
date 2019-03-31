import Sequelize from 'sequelize';

export default async () => {
  const localConnection = {
    connectionString: process.env.PGDATABASE,
    ssl: false,
    dialect: 'postgres'
  }
  
  const pgConnection = {
    connectionString: process.env.PGREMOTE_DATABASE,
    ssl: true,
    dialect: 'postgres'
  }
  
  return new Sequelize(localConnection);    
}