import { Router } from 'express';
import signUp from './sign-up';
import signIn from './sign-in';
import signOut from './sign-out';

function verifyToken(req, res, next) {
  const header = req.headers['authorization'];
  next();
}

export default app => {
  const router = Router();

  router.post('/sign-up', signUp(app));
  router.post('/sign-in', verifyToken, signIn(app));

  return router;
};
