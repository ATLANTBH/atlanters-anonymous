import http from "./httpService";
import Utils from "../utils";

const { string } = Utils;
const { feedback } = string.PATHS;
const apiEndpoint = "http://localhost:65534" + string.API + feedback;

export async function sendFeedback(data) {
  return http.post(apiEndpoint, data);
}
