import http from "./httpService";
import { getJwt } from "./authService";
import { apiUrl } from "../config.json";

const apiEndpoint = apiUrl + "/poll-templates";

export async function getPollTemplates(count, isDraft) {
  return await http.get(
    apiEndpoint + "/drafts/" + isDraft.toString() + "/" + count.toString(),
    {
      headers: {
        "x-auth": getJwt()
      }
    }
  );
}

export default {
  getPollTemplates
};
