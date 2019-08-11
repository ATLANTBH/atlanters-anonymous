import middlewares from './middlewares';
import routes from './routes';
import socket from './socket';

async function startExpressApp({ expressApp, models }) {
  const server = expressApp.listen(process.env.PORT, () => {
    console.log(`Listening on port ${process.env.PORT}`);
  });
  socket(models, server);
  return server;
}

export default async (expressApp, models) => {
  const app = {
    expressApp,
    models,
  };

  console.log('Initiating middlewares...');
  await middlewares(app);
  console.log('Initiating routes...');
  await routes(app);
  app.server = await startExpressApp(app);

  return app;
};
