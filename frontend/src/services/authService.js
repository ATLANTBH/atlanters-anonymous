import http from "./httpService";
import { apiUrl } from "../config.json";
import jwtDecode from "jwt-decode";

const apiEndpoint = apiUrl + "/auth";

http.setJwt(getJwt());

export function getJwt() {
  return localStorage.getItem("token");
}

export async function register(user) {
  const { headers } = await http.post(apiEndpoint + "/sign-up", {
    email: user.email,
    password: user.signUpPassword,
    name: user.fullName,
    surname: user.fullName
  });
  localStorage.setItem("token", headers["x-auth"]);
}

export async function login(user) {
  const { headers } = await http.post(apiEndpoint + "/sign-in", {
    email: user.email,
    password: user.password
  });
  localStorage.setItem("token", headers["x-auth"]);
}

export async function logout() {
  const jwt = localStorage.getItem("token");
  await http.delete(apiEndpoint + "/sign-out", {
    headers: {
      "x-auth": jwt
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
