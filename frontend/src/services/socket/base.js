import socketIOClient from "socket.io-client";
import { getHostnameWithProtocol } from "../../utils/strings";
let socket = null;

/**
 * Creates a socket instance
 */
export const connectSocket = () => {
  socket = socketIOClient(getHostnameWithProtocol(window), {
    transports: ["websocket"],
    rejectUnauthorized: false
  });
  socket.on("connect_error", err => {
    console.log("Socket connect error", err);
    socket.disconnect();
  });
  return socket;
};

/**
 * Binds on specific event
 *
 * @param {String} event event on which to bind
 * @param {Function} callback handles result
 */
export const on = (event, callback) => {
  if (!socket) return;
  socket.on(event, callback);
};

/**
 * Emits data on specific event
 *
 * @param {String} event event on which to emit
 * @param {Object} data data to emit
 */
export const emit = (event, data) => {
  if (!socket) return;
  socket.emit(event, data);
};
