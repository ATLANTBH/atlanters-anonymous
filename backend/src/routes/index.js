import { Router } from 'express';
import auth from './auth';
import user from './user';
import pollTemplate from './poll-template';
import poll from './poll';
import answer from './answer';
import feedback from './feedback';

export default app => {
  const router = Router();

  router.use('/auth', auth(app));
  router.use('/users', user(app));
  router.use('/poll-templates', pollTemplate(app));
  router.use('/polls', poll(app));
  router.use('/answers', answer(app));
  router.use('/feedback', feedback(app));

  return router;
};
