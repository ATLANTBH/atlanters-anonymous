import { Router } from 'express';
import auth from './auth';
import user from './user';
import pollTemplate from './poll-template';

export default app => {
  const router = Router();

  router.use('/auth', auth(app));
  router.use('/user', user(app));
  router.use('/poll-template', pollTemplate(app));

  return router;
};
