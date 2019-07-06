import http from "./httpService";
import { getJwt } from "./authService";
import { apiUrl } from "../config.json";
import Utils from "../utils";

const { TOKEN_HEADER, PATHS } = Utils.string;
const { pollTemplates } = PATHS;
const apiEndpoint = apiUrl + pollTemplates;

export async function getPollTemplates(count, isDraft) {
  return await http.get(
    apiEndpoint + "/drafts/" + isDraft.toString() + "/" + count.toString(),
    {
      headers: {
        TOKEN_HEADER: getJwt()
      }
    }
  );
}

export default {
  getPollTemplates
};
