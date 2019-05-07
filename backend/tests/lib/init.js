import initConnection from './db';
import init from '../../src/init';

export default async function getModels() {
  const eraseDatabaseOnSync = true;
  const sequelize = await initConnection(eraseDatabaseOnSync);
  return await init.models(sequelize, eraseDatabaseOnSync);
}