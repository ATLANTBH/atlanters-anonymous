import { Router } from 'express';
import signUp from './sign-up';
import signIn from './sign-in';
import signOut from './sign-out';

export default app => {
  const router = Router();

  router.post('/sign-up', signUp(app));
  router.post('/sign-in', signIn(app));

  return router;
};
