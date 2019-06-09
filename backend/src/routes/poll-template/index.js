import { Router } from 'express';
import getPollTemplates from './poll-templates.get';
import createPollTemplate from './poll-templates.post';
import updatePollTemplate from './poll-templates.put';
import deletePollTemplate from './poll-templates.delete';
import getPollTemplateByPollTemplateId from './poll-templates.id.get';
import getPollTemplateByTitle from './poll-templates.title.get';
import verifyToken from '../middlewares/verify-token';
import getPollTemplatePolls from './poll-templates.polls.get';
import getPollByPollTemplateTitle from './poll-templates.polls.title.get';
import submitAnswer from './poll-templates.polls.answers.post';
import getCountPollTemplates from './poll-templates.count.get';

export default app => {
  const router = Router();

  router.get('/', verifyToken(app), getPollTemplates(app));
  router.get('/count/:count', verifyToken(app), getCountPollTemplates(app));
  router.get(
    '/:id([0-9]{1,10})',
    verifyToken(app),
    getPollTemplateByPollTemplateId(app)
  );
  router.get('/:title', verifyToken(app), getPollTemplateByTitle(app));
  router.get(
    '/:id([0-9]{1,10})/polls',
    verifyToken(app),
    getPollTemplatePolls(app)
  );
  router.get(
    '/:title/polls',
    verifyToken(app),
    getPollByPollTemplateTitle(app)
  );
  router.post('/', verifyToken(app), createPollTemplate(app));
  router.post('/:id/poll/:pollId/answers', verifyToken(app), submitAnswer(app));
  router.delete('/:id', verifyToken(app), deletePollTemplate(app));
  router.put('/:id', verifyToken(app), updatePollTemplate(app));

  return router;
};
