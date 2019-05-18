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

  router.get('/', verifyToken(app), getPollTemplates(app));
  router.get(
    '/user-email',
    verifyToken(app),
    getPollTemplatesByUserEmail(app)
  );
  router.get(
    '/:id([0-9]{1,10})',
    verifyToken(app),
    getPollTemplateByPollTemplateId(app)
  );
  router.get(
    '/:title',
    verifyToken(app),
    getPollTemplateByTitle(app)
  );
  router.get(
    '/users/:userId',
    verifyToken(app),
    getUserPollTemplates(app)
  );
  router.post('/', verifyToken(app), createPollTemplate(app));
  router.delete(
    '/:id',
    verifyToken(app),
    deletePollTemplate(app)
  );
  router.put('/:id', verifyToken(app), updatePollTemplate(app));

  return router;
};
