import http from "./httpService";
import Utils from "../utils";

const { string } = Utils;
const { feedback } = string.PATHS;
const apiEndpoint = string.API + feedback;

export async function sendFeedback(data) {
  return await http.post(apiEndpoint, {
    data
  });
}

export async function getAllFeedback() {
  return await http.get(apiEndpoint);
}
