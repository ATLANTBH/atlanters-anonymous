require('dotenv').config();
import express from 'express';
import init from './src/init';

async function startExpressApp(app) {
  app.listen(process.env.PORT, () => {
    console.log(`Listening on port ${process.env.PORT}`);
  });
}

async function start() {
  const eraseDatabaseOnSync = false;
  const expressApp = express();

  console.log("Connecting to the database...");
  const sequelize = await init.db(eraseDatabaseOnSync);
  console.log("Initiating models...");
  const models = await init.models(sequelize, eraseDatabaseOnSync);

  const app = {
    expressApp,
    models,
  };

  console.log("Initiating middlewares...");
  await init.middlewares(app);
  console.log("Initiating routes...");
  await init.routes(app);
  console.log("Starting express app...");
  await startExpressApp(app.expressApp);
}

start();
