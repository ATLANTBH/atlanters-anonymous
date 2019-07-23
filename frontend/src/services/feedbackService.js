import http from "./httpService";
import Utils from "../utils";

const { string } = Utils;
const { feedback } = string.PATHS;
const apiEndpoint = string.API + feedback;

export async function sendFeedback(data) {
  // NOTE(kklisura): No need to use apiEndpoint or similar, you can just juse regular strings here
  // ie /api/v1/feedback or whatever.
  return http.post(apiEndpoint, data);
}
