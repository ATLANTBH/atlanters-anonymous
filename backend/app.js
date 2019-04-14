require('dotenv').config();
import express from 'express';
import init from './src/init';

async function startExpressApp(app) {
  app.listen(process.env.PORT, () => {
    console.log(`Listening on port ${process.env.PORT}`);
  });
}

async function start() {
  const eraseDatabaseOnSync = true;
  const expressApp = express();

  const sequelize = await init.db();
  const models = await init.models(sequelize, eraseDatabaseOnSync);

  const app = {
    expressApp,
    models,
  };

  await init.middlewares(app);
  await init.routes(app);
  await startExpressApp(app.expressApp);
}

start();
