import { Router } from 'express';
import getPolls from './polls.get';
import getPollTemplatePolls from './polls.poll-template.get';
import getUserPolls from './polls.user.get';
import createPoll from './polls.post';
import updatePoll from './polls.put';
import deletePoll from './polls.delete';
import verifyToken from '../middlewares/verify-token';

export default app => {
  const router = Router();

  router.get('/polls', verifyToken(app), getPolls(app));
  router.get(
    '/polls/:pollTemplateId',
    verifyToken(app),
    getPollTemplatePolls(app)
  );
  router.get('/polls/:userId', verifyToken(app), getUserPolls(app));
  router.post('/polls/:pollTemplateId', verifyToken(app), createPoll(app));
  router.delete('/polls/:id', verifyToken(app), deletePoll(app));
  router.put('/polls/:id', verifyToken(app), updatePoll(app));

  return router;
};
