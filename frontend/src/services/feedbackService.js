import http from "./httpService";
import { apiUrl } from "../config.json";
import Utils from "../utils";

const { feedback } = Utils.string.PATHS;
const apiEndpoint = apiUrl + feedback;

export async function sendFeedback(data) {
  return await http.post(apiEndpoint, {
    data
  });
}

export async function getAllFeedback() {
  return await http.get(apiEndpoint);
}
