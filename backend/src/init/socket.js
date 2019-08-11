import socket from 'socket.io';
import { CONNECTION_EVENT } from '../constants/socket';
import chat from '../sockets/events/chat';

export default (models, server) => {
  const io = socket(server);
  io.on(CONNECTION_EVENT, socket => {
    chat(io, models, socket);
  });
};
