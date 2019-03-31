import { Router } from 'express';
import users from './users';

export default (models) => {
  const router = Router();

  router.get('/users', users(models));

  return router;
}