import { Router } from 'express';
import getUsers from './users.get';
import getUserById from './user.id.get';
import getUserByEmail from './user.email.get';
import putUser from './users.put';
import verifyToken from '../middlewares/verify-token';
import getPollsByUserEmail from './user.email.polls.get';
import getPollsByUserId from './user.polls.get';
import getPollTemplatesByUserEmail from './user.email.poll-templates.get';
import getPollTemplatesByUserId from './user.poll-templates.get';
import deleteUser from './users.delete';

export default app => {
  const router = Router();

  router.get('/', verifyToken(app), getUsers(app));
  router.get('/email', verifyToken(app), getUserByEmail(app));
  router.get('/:id([0-9]{1,10})', verifyToken(app), getUserById(app));
  router.get('/:id([0-9]{1,10})/polls', verifyToken(app), getPollsByUserId(app));
  router.get('/email/polls', verifyToken(app), getPollsByUserEmail(app));
  router.get('/:id([0-9]{1,10})/poll-templates', verifyToken(app), getPollTemplatesByUserId(app));
  router.get('/email/poll-templates', verifyToken(app), getPollTemplatesByUserEmail(app)); 
  router.put('/:id', verifyToken(app), putUser(app));
  router.delete('/:id', verifyToken(app), deleteUser(app));

  return router;
};
