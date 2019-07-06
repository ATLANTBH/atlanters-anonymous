import http from "./httpService";
import { apiUrl } from "../config.json";
import jwtDecode from "jwt-decode";
import Utils from "../utils";

const { TOKEN_HEADER, PATHS } = Utils.string;
const { auth, signUp, signIn, signOut } = PATHS;
const apiEndpoint = apiUrl + auth;

http.setJwt(getJwt());

export function getJwt() {
  return localStorage.getItem("token");
}

export async function register(user) {
  const { headers } = await http.post(apiEndpoint + signUp, {
    email: user.email,
    password: user.signUpPassword,
    name: user.fullName,
    surname: user.fullName
  });
  localStorage.setItem("token", headers[TOKEN_HEADER]);
}

export async function login(user) {
  const { headers } = await http.post(apiEndpoint + signIn, {
    email: user.email,
    password: user.password
  });
  localStorage.setItem("token", headers[TOKEN_HEADER]);
}

export async function logout() {
  const jwt = localStorage.getItem("token");
  await http.delete(apiEndpoint + signOut, {
    headers: {
      TOKEN_HEADER: jwt
    }
  });
  localStorage.removeItem("token");
}

export function getCurrentUser() {
  try {
    const jwt = localStorage.getItem("token");
    return jwtDecode(jwt);
  } catch (err) {
    return null;
  }
}

export default {
  register,
  login,
  logout,
  getCurrentUser,
  getJwt
};
