import { Router } from 'express';
import getAnswers from './answers.get';
import verifyToken from '../middlewares/verify-token';
import getAnswerById from './answers.id.get';

export default app => {
  const router = Router();

  router.get('/', verifyToken(app), getAnswers(app));
  router.get('/:id', verifyToken(app), getAnswerById(app));

  return router;
};
