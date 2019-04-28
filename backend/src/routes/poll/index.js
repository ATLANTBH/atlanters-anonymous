import { Router } from 'express';
import getPolls from './polls.get';
import createPoll from './polls.post';
import updatePoll from './polls.put';
import deletePoll from './polls.delete';
import verifyToken from '../middlewares/verify-token';

export default app => {
  const router = Router();

  router.get('/polls', verifyToken(app), getPolls(app));
  router.post('/polls/:pollTemplateId', verifyToken(app), createPoll(app));
  router.delete('/polls/:id', verifyToken(app), deletePoll(app));
  router.put('/polls/:id', verifyToken(app), updatePoll(app));

  return router;
};
