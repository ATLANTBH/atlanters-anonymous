import { CHAT_EVENT } from '../../constants/socket';

export default (io, models, socket) => {
  socket.on(CHAT_EVENT, async data => {
    const { feedbackId, messages } = data;
    try {
      io.sockets.emit(feedbackId, messages);
    } catch (err) {
      io.sockets.emit(messages[messages.length - 1].User.id, err.toString());
    }
  });
};
