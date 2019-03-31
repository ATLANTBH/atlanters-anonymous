import authRouter from '../routes/auth';
import userRouter from '../routes/user';

export default async (app, models) => {

  app.use('/auth', authRouter(models));
  app.use('/user', userRouter(models));

  app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    let error = req.app.get('env') === 'development' ? err : {}
    console.log(error);
    res.json({
      message: err.message,
      error: {}
    })
  })

}