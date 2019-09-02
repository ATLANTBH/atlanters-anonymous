import socketIOClient from "socket.io-client";
import packageJson from "../../../package.json";

let socket = null;

/**
 * Creates a socket instance
 */
export const connectSocket = () => {
  socket = socketIOClient(packageJson.proxy.toString());
  socket.on("connect_error", err => {
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
