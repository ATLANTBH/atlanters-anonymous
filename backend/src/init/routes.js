import path from 'path';
import routes from '../routes';

export default async app => {
  const { expressApp } = app;

  expressApp.use('/api', routes(app));

  expressApp.use(function(err, req, res, next) {
    res.status(400);
    const errorStack = process.env.MODE === 'development' ? err.stack : {};
    console.log(err.message);
    res.json({
      status: 400,
      message: err.message,
      error: errorStack,
    });
  });

  expressApp.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../../build/index.html'));
  });
};
