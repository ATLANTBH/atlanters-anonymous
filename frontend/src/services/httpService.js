import axios from "axios";
import Utils from "../utils";

const { TOKEN_HEADER } = Utils.string;

axios.interceptors.response.use(null, error => {
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;

  if (!expectedError) {
    alert("An unexpected error occured");
  }

  return Promise.reject(error);
});

function setJwt(jwt) {
  axios.defaults.headers.common[TOKEN_HEADER] = jwt;
}

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
  setJwt
};
