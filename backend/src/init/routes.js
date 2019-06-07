import routes from '../routes';

export default async app => {
  const { expressApp } = app;

  expressApp.use(routes(app));

  expressApp.use(function(err, req, res, next) {
    res.status(400);
    const errorStack = process.env.MODE === 'development' ? err.stack : {};
    console.log(err.message);
    res.json({
      message: err.message,
      error: errorStack,
    });
  });
};
