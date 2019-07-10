import express from 'express';
import init from './index';
import path from 'path';

export default async () => {
  const eraseDatabaseOnSync = process.env.MODE === 'development';
  const root = path.join(__dirname, '../../build');

  const expressApp = express();
  expressApp.use(express.static(root));
  expressApp.get('*', (req, res) => {
    res.sendFile('index.html', { root });
  });
  console.log('Connecting to the database...');
  const sequelize = await init.db(eraseDatabaseOnSync);
  console.log('Initiating models...');
  const models = await init.models(sequelize, eraseDatabaseOnSync);
  console.log('Starting express app...');

  return await init.app(expressApp, models);
};
