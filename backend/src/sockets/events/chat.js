import { CHAT_EVENT } from '../../constants/socket';

export default (io, models, socket) => {
  socket.on(CHAT_EVENT, async data => {
    const { feedbackId, message } = data;
    try {
      io.sockets.emit(feedbackId, message);
    } catch (err) {
      io.sockets.emit(message.User.id, err.toString());
    }
  });
};
