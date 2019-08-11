import postMessage from '../post-message';
import { CHAT_EVENT } from '../../constants/socket';

export default (io, models, socket) => {
  socket.on(CHAT_EVENT, async data => {
    const { feedbackId, userId, text } = data;
    try {
      if (!(await models.Feedback.findById(feedbackId)))
        throw new Error('Feedback does not exist');
      const message = await postMessage(models, feedbackId, userId, text);
      io.sockets.emit(feedbackId, message);
    } catch (err) {
      io.sockets.emit(feedbackId, { error: err.toString() });
    }
  });
};
