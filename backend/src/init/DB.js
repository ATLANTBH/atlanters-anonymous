import Sequelize from 'sequelize';

export default async () => {
  const localConnection = {
    connectionString: process.env.PGDATABASE,
    ssl: process.env.PGSSL,
    dialect: 'postgres'
  }
  
  const pgConnection = {
    connectionString: process.env.PGREMOTE_DATABASE,
    ssl: process.env.PGSSL,
    dialect: 'postgres'
  }
  
  return new Sequelize(localConnection);    
}