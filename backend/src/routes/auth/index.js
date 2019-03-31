import { Router } from 'express';
import signUp from './sign_up';
import signIn from './sign_in';
import signOut from './sign_out';

export default (models) => {
  const router = Router();

  router.post('/signup', signUp(models));
  router.post('/signin', signIn(models));

  return router;
}

