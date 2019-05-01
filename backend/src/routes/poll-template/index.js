import { Router } from 'express';
import getPollTemplates from './poll-templates.get';
import getUserPollTemplates from './poll-templates.user.get';
import createPollTemplate from './poll-templates.post';
import updatePollTemplate from './poll-templates.put';
import deletePollTemplate from './poll-templates.delete';
import verifyToken from '../middlewares/verify-token';
import { validateQuestion } from '../validation';

export default app => {
  const router = Router();

  router.get('/poll-templates', verifyToken(app), getPollTemplates(app));
  router.get(
    '/poll-templates/:userId',
    verifyToken(app),
    getUserPollTemplates(app)
  );
  router.post(
    '/poll-templates',
    verifyToken(app),
    validateQuestion(app),
    createPollTemplate(app)
  );
  router.delete(
    '/poll-templates/:id',
    verifyToken(app),
    deletePollTemplate(app)
  );
  router.put('/poll-templates/:id', verifyToken(app), updatePollTemplate(app));

  return router;
};
