import http from "./httpService";
import Utils from "../utils";

const { string } = Utils;
const { feedback } = string.PATHS;
const apiEndpoint = string.API + feedback;

export async function sendFeedback(data) {
  return http.post(apiEndpoint, data);
}
