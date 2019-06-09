import http from "./httpService";
import { getJwt } from "./authService";
import { apiUrl } from "../config.json";

const apiEndpoint = apiUrl + "/poll-templates";

export async function getPollTemplates(count) {
  return await http.get(apiEndpoint + "/count/" + count, {
    headers: {
      "x-auth": getJwt()
    }
  });
}

export default {
  getPollTemplates
};
