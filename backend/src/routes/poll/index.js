import { Router } from 'express';
import getPolls from './polls.get';
import getPollTemplatePolls from './polls.poll-template.get';
import getUserPolls from './polls.user.get';
import createPoll from './polls.post';
import updatePoll from './polls.put';
import deletePoll from './polls.delete';
import verifyToken from '../middlewares/verify-token';
import getPollByPollId from './polls.id.get';
import getPollByPollTemplateTitle from './polls.poll-template.title.get';
import getPollbyUserEmail from './polls.user.email.get';

export default app => {
  const router = Router();

  router.get('/polls', verifyToken(app), getPolls(app));
  router.get('/polls/user-email', verifyToken(app), getPollbyUserEmail(app));
  router.get('/polls/:id', verifyToken(app), getPollByPollId(app));
  router.get(
    '/polls/poll-template/:pollTemplateId',
    verifyToken(app),
    getPollTemplatePolls(app)
  );
  router.get(
    '/polls/poll-template-title/:pollTemplateTitle',
    verifyToken(app),
    getPollByPollTemplateTitle(app)
  );
  router.get('/polls/user/:userId', verifyToken(app), getUserPolls(app));
  router.post('/polls/:pollTemplateId', verifyToken(app), createPoll(app));
  router.delete('/polls/:id', verifyToken(app), deletePoll(app));
  router.put('/polls/:id', verifyToken(app), updatePoll(app));

  return router;
};
