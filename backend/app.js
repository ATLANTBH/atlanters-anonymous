require('dotenv').config();
import express from 'express';
import init from './src/init';

async function startExpressApp(app) {
  app.listen(process.env.PORT, () => {
    console.log(`Listening on port ${process.env.PORT}`)
  })
}

async function start() {
  const eraseDatabaseOnSync = true;
  const app = express();

  const sequelize = await init.DB();
  const models = await init.Models(sequelize, eraseDatabaseOnSync);
  await init.Middlewares(app);
  await init.Routes(app, models);
  await startExpressApp(app);
}

start();