import { Router } from 'express';
import auth from './auth';
import user from './user';

export default app => {
  const router = Router();

  router.use('/auth', auth(app));
  router.use('/user', user(app));

  return router;
};
