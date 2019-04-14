import { Router } from 'express';
import signUp from './sign-up';
import signIn from './sign-in';
import signOut from './sign-out';
import verifyToken from '../middlewares/verify-token';

export default app => {
  const router = Router();

  router.post('/sign-up', signUp(app));
  router.post('/sign-in', signIn(app));
  router.delete('/sign-out', verifyToken(app), signOut);

  return router;
};
