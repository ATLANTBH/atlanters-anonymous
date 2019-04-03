import routes from '../routes';

export default async (app) => {
  const { expressApp } = app;

  expressApp.use(routes(app));

  expressApp.use(function (err, req, res, next) {
    res.status(err.status || 500);
    let error = req.expressApp.get('env') === 'development' ? err : {}
    console.log(error);
    res.json({
      message: err.message,
      error: {}
    })
  })

}