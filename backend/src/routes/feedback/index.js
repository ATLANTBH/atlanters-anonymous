import { Router } from 'express';
import verifyToken from '../middlewares/verify-token';
import feedback from './feedback.post';
import getAllFeedback from './feedback.get';
import getFeedbackById from './feedback.id.get';
import getMessagesByFeedbackId from './feedback.messages.get';
import createMessage from './feedback.messages.post';
import closeFeedback from './feedback.close.put';
import markAllFeedbackRead from './feedback.allread.put';
import seenFeedback from './feedback.seen.put';

export default app => {
  const router = Router();

  router.put('/mark-all-read', markAllFeedbackRead(app));
  router.get('/:id', getFeedbackById(app));
  router.get('/:id/messages', getMessagesByFeedbackId(app));
  router.get('/', verifyToken(app), getAllFeedback(app));
  router.post('/', feedback(app));
  router.post('/:id/user/:userId?/messages', createMessage(app));
  router.put('/:id/close', verifyToken(app), closeFeedback(app));
  router.put('/:id/seen', seenFeedback(app));

  return router;
};
