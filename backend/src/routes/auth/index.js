import { Router } from 'express';
import signUp from './sign-up';
import signIn from './sign-in';
import signOut from './sign-out';

function verifyToken ({ models }) {
  const { User } = models;
  return async (req, res, next) => {
    const token = req.header('x-auth');
    const user = await User.findByAuthenticationToken(token);
    if(!user) next(new Error('Please log in to continue'));
    req.user = user;
    req.token = token;
    next();
  }
}

export default app => {
  const router = Router();

  router.post('/sign-up', signUp(app));
  router.post('/sign-in', signIn(app));
  router.delete('/sign-out', verifyToken(app), signOut);

  return router;
};
