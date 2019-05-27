import express from 'express';
import init from './index';

export default async () => {
  const eraseDatabaseOnSync = process.env.MODE === 'development';
  const expressApp = express();

  console.log("Connecting to the database...");
  const sequelize = await init.db(eraseDatabaseOnSync);
  console.log("Initiating models...");
  const models = await init.models(sequelize, eraseDatabaseOnSync);
  console.log("Starting express app...");
  return await init.app(expressApp, models);
}

