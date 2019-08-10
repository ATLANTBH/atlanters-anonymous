import express from 'express';
import path from 'path';
import init from './index';

export default async () => {
  const { MODE } = process.env;
  const eraseDatabaseOnSync = MODE === 'development';
  const root = path.join(__dirname, '../../build');

  const expressApp = express();
  expressApp.use(express.static(root));

  if (MODE !== 'development') {
    expressApp.get('*', (req, res) => {
      res.sendFile('index.html', { root });
    });
  }
  console.log('Connecting to the database...');
  const sequelize = await init.db();
  console.log('Initiating models...');
  const models = await init.models(sequelize, eraseDatabaseOnSync);
  console.log('Starting express app...');

  return await init.app(expressApp, models);
};
