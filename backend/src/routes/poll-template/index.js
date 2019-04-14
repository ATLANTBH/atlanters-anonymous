import { Router } from 'express';
import getPollTemplates from './poll-templates.get';
import createPollTemplate from './poll-templates.post';
import updatePollTemplate from './poll-templates.put';
import deletePollTemplate from './poll-templates.delete';
import verifyToken from '../middlewares/verify-token';

export default app => {
  const router = Router();

  router.get('/poll-templates', verifyToken(app), getPollTemplates(app));
  router.post('/poll-templates', verifyToken(app), createPollTemplate(app));
  router.put('/poll-templates', verifyToken(app), updatePollTemplate(app));
  router.delete(
    '/poll-templates/:id',
    verifyToken(app),
    deletePollTemplate(app)
  );

  return router;
};
