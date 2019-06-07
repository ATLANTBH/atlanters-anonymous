import http from "./httpService";
import { apiUrl } from "../config.json";

const apiEndpoint = apiUrl + "/auth";

export function register(user) {
  return http.post(apiEndpoint + "/sign-up", {
    email: user.email,
    password: user.signUpPassword,
    name: user.fullName,
    surname: user.fullName
  });
}

export function login(user) {
  return http.post(apiEndpoint + "/sign-in", {
    email: user.email,
    password: user.password
  });
}
