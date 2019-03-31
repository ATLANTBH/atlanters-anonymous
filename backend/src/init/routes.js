import authRouter from '../routes/auth';

export default async (app, models) => {

  app.use('/auth', authRouter(models));

  app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    let error = req.app.get('env') === 'development' ? err : {}
    console.log(error);
    res.json({
      message: err.message,
      error: {}
    })
  })

  app.get('/user', (req, res) => {
    models.User.findAll()
      .then(user => {
        console.log(user)
        res.sendStatus(200);
      })
      .catch(err => console.log(err))
  });

}