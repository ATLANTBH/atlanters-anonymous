import init from '../../src/init';
import initConnection from './db';

export default async function getModels() {
  const eraseDatabaseOnSync = false;
  const sequelize = await initConnection(false);
  return await init.models(sequelize, eraseDatabaseOnSync);
}
