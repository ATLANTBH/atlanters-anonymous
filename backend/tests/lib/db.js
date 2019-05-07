import init from '../../src/init';

export default async function initConnection(eraseDatabaseOnSync) {
  return await init.db(eraseDatabaseOnSync);
}