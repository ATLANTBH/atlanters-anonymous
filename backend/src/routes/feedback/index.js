import { Router } from 'express';
import feedback from './feedback.post';
import getAllFeedback from './feedback.get';
import getFeedbackById from './feedback.id.get';

export default app => {
  const router = Router();

  router.get('/:id', getFeedbackById(app));
  router.get('/', getAllFeedback(app));
  router.post('/', feedback(app));

  return router;
};
