import postMessage from '../post-message';
import { SEEN_EVENT } from '../../constants/socket';

export default (io, models, socket) => {
  socket.on(SEEN_EVENT, async data => {
    const { user, feedbackId } = data;
    try {
      io.sockets.emit(SEEN_EVENT + feedbackId, user);
    } catch (err) {
      io.sockets.emit(userId, err.toString());
    }
  });
};
