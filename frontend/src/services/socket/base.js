import socketIOClient from "socket.io-client";
import { newWindowLocation } from "../../utils/navigate";
import packageJson from "../../../package.json";

let socket = null;

/**
 * Creates a socket instance
 */
export const connectSocket = () => {
  socket = socketIOClient(packageJson.proxy.toString());
  socket.on("connect_error", err => {
    alert("Failed to connect to server");
    socket.disconnect();
    newWindowLocation("/feedback");
  });
};

/**
 * Binds on specific event
 *
 * @param {String} event event on which to bind
 * @param {Function} callback handles result
 */
export const on = (event, callback) => {
  if (!socket) throw new Error("Socket not connected");
  socket.on(event, callback);
};

/**
 * Emits data on specific event
 *
 * @param {String} event event on which to emit
 * @param {Object} data data to emit
 */
export const emit = (event, data) => {
  if (!socket) throw new Error("Socket not connected");
  socket.emit(event, data);
};
