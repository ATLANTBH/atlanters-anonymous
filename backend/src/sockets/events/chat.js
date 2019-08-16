import { CHAT_EVENT } from '../../constants/socket';
import postMessage from '../post-message';

export default (io, models, socket) => {
  socket.on(CHAT_EVENT, async data => {
    const { feedbackId, userId, text } = data;
    try {
      const feedback = await models.Feedback.findById(feedbackId);
      if (!feedback) throw new Error('Feedback does not exist');
      if (feedback.isClosed) throw new Error('This case is closed');
      if (userId === -1)
        models.Feedback.sendMail({ text: feedbackId + ': ' + text });
      const message = await postMessage(models, feedbackId, userId, text);
      io.sockets.emit(feedbackId, message);
    } catch (err) {
      io.sockets.emit(userId, err.toString());
    }
  });
};
