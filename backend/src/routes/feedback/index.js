import { Router } from 'express';
import verifyToken from '../middlewares/verify-token';
import feedback from './feedback.post';
import getAllFeedback from './feedback.get';
import getFeedbackById from './feedback.id.get';

export default app => {
  const router = Router();

  router.get('/:id', verifyToken(app), getFeedbackById(app));
  router.get('/', verifyToken(app), getAllFeedback(app));
  router.post('/', feedback(app));

  return router;
};
