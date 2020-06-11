import express from 'express';
import path from 'path';
import init from './index';

export default async () => {
  const root = path.join(__dirname, '../../build');

  const expressApp = express();
  expressApp.use(express.static(root));

  console.log('Connecting to the database...');
  const sequelize = await init.db();
  console.log('Initiating models...');
  const models = await init.models(sequelize, false);
  console.log('Starting express app...');

  return await init.app(expressApp, models);
};
