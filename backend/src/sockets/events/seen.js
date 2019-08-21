import { SEEN_EVENT } from '../../constants/socket';

export default (io, models, socket) => {
  socket.on(SEEN_EVENT, async data => {
    const { user, feedbackId, date } = data;
    try {
      io.sockets.emit(SEEN_EVENT + feedbackId, { user, date });
    } catch (err) {
      io.sockets.emit(user.id, err.toString());
    }
  });
};
