import { Router } from 'express';
import getUsers from './users.get';
import getUserById from './user.id.get';
import getUserByEmail from './user.email.get';
import putUser from './users.put';
import verifyToken from '../middlewares/verify-token';

export default app => {
  const router = Router();

  router.get('/users', verifyToken(app), getUsers(app));
  router.get('/user', verifyToken(app), getUserByEmail(app));
  router.get('/user/:id', verifyToken(app), getUserById(app));
  router.put('/user/:id', verifyToken(app), putUser(app));

  return router;
};
