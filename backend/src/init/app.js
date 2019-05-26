import middlewares from './middlewares';
import routes from './routes';

async function startExpressApp(app) {
  const server = app.listen(process.env.PORT, () => {
    console.log(`Listening on port ${process.env.PORT}`);
  });
  return server;
}

export default async (expressApp, models) => {
  
  const app = {
    expressApp,
    models,
  };
  
  console.log("Initiating middlewares...");
  await middlewares(app);
  console.log("Initiating routes...");
  await routes(app);
  app.server = await startExpressApp(app.expressApp);

  return app;

} 