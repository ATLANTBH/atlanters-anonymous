import { Router } from 'express';
import auth from './auth';
import user from './user';
import pollTemplate from './poll-template';
import question from './question';
import poll from './poll';

export default app => {
  const router = Router();

  router.use('/auth', auth(app));
  router.use('/user', user(app));
  router.use('/poll-template', pollTemplate(app));
  router.use('/question', question(app));
  router.use('/poll', poll(app));

  return router;
};
