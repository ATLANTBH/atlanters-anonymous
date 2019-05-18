import { Router } from 'express';
import getPollTemplates from './poll-templates.get';
import getUserPollTemplates from './poll-templates.user.get';
import createPollTemplate from './poll-templates.post';
import updatePollTemplate from './poll-templates.put';
import deletePollTemplate from './poll-templates.delete';
import getPollTemplateByPollTemplateId from './poll-templates.id.get';
import getPollTemplateByTitle from './poll-templates.title.get';
import getPollTemplatesByUserEmail from './poll-templates.user.email.get';
import verifyToken from '../middlewares/verify-token';

export default app => {
  const router = Router();

  router.get('/poll-templates', verifyToken(app), getPollTemplates(app));
  router.get(
    '/poll-templates/user-email',
    verifyToken(app),
    getPollTemplatesByUserEmail(app)
  );
  router.get(
    '/poll-templates/:id',
    verifyToken(app),
    getPollTemplateByPollTemplateId(app)
  );
  router.get(
    '/poll-templates/poll-template-title/:title',
    verifyToken(app),
    getPollTemplateByTitle(app)
  );
  router.get(
    '/poll-templates/user/:userId',
    verifyToken(app),
    getUserPollTemplates(app)
  );
  router.post('/poll-templates', verifyToken(app), createPollTemplate(app));
  router.delete(
    '/poll-templates/:id',
    verifyToken(app),
    deletePollTemplate(app)
  );
  router.put('/poll-templates/:id', verifyToken(app), updatePollTemplate(app));

  return router;
};
