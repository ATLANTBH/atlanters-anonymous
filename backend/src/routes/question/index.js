import { Router } from 'express';
import getQuestions from './questions.get';
import createQuestion from './questions.post';
import updateQuestion from './questions.put';
import deleteQuestion from './questions.delete';
import verifyToken from '../middlewares/verify-token';

export default app => {
  const router = Router();

  router.get('/questions', verifyToken(app), getQuestions(app));
  router.post(
    '/questions/:pollTemplateId',
    verifyToken(app),
    createQuestion(app)
  );
  router.delete('/questions/:id', verifyToken(app), deleteQuestion(app));
  router.put('/questions/:id', verifyToken(app), updateQuestion(app));

  return router;
};
