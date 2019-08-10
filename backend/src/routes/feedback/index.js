import { Router } from 'express';
import verifyToken from '../middlewares/verify-token';
import feedback from './feedback.post';
import getAllFeedback from './feedback.get';
import getFeedbackById from './feedback.id.get';
import getMessagesByFeedbackId from './feedback.messages.get';
import createMessage from './feedback.messages.post';

export default app => {
  const router = Router();

  router.get('/:id', verifyToken(app), getFeedbackById(app));
  router.get('/:id/messages', verifyToken(app), getMessagesByFeedbackId(app));
  router.get('/', verifyToken(app), getAllFeedback(app));
  router.post('/', feedback(app));
  router.post('/:id/user/:userId?/messages', createMessage(app));

  return router;
};
