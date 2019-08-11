import socketIOClient from "socket.io-client";
import { newWindowLocation } from "../../utils/navigate";
import packageJson from "../../../package.json";

let socket = null;
export const connectSocket = () => {
  socket = socketIOClient(packageJson.proxy.toString());
  socket.on("connect_error", err => {
    alert("Failed to connect to server");
    socket.disconnect();
    newWindowLocation("/feedback");
  });
};

export const on = (event, callback) => {
  if (!socket) throw new Error("Socket not connected");
  socket.on(event, callback);
};

export const emit = (event, data) => {
  if (!socket) throw new Error("Socket not connected");
  socket.emit(event, data);
};
