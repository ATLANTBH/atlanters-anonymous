import { Router } from 'express';
import getPolls from './polls.get';
import createPoll from './polls.post';
import updatePoll from './polls.put';
import deletePoll from './polls.delete';
import verifyToken from '../middlewares/verify-token';
import getPollByPollId from './polls.id.get';
import getPollAnswers from './polls.answers.get';

export default app => {
  const router = Router();

  router.get('/', verifyToken(app), getPolls(app));
  router.get('/:id([0-9]{1,10})', verifyToken(app), getPollByPollId(app));
  router.get('/:id/answers', verifyToken(app), getPollAnswers(app));
  router.post('/:pollTemplateId', verifyToken(app), createPoll(app));
  router.delete('/:id', verifyToken(app), deletePoll(app));
  router.put('/:id', verifyToken(app), updatePoll(app));

  return router;
};
