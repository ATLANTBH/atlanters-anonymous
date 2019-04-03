import { Router } from 'express';
import users from './users';

export default (app) => {
  const router = Router();

  router.get('/users', users(app));

  return router;
}