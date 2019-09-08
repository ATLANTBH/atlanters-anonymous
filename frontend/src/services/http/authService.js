import { post, deleteCall } from "./base";
import jwtDecode from "jwt-decode";
import { TOKEN_HEADER } from "../../constants/headers";

export function signUp(data) {
  return post("/api/auth/sign-up", {
    email: data.email,
    name: data.name,
    surname: data.surname,
    password: data.signUpPassword,
    key: data.key
  }).then(res => {
    return res;
  });
}

export function signIn(data) {
  return post("/api/auth/sign-in", {
    email: data.email,
    password: data.password
  }).then(res => {
    return res;
  });
}

export function signOut() {
  const jwt = localStorage.getItem(TOKEN_HEADER);
  return deleteCall("/api/auth/sign-out", {
    headers: {
      [TOKEN_HEADER]: jwt,
      "Content-Type": "application/json"
    }
  }).then(res => {
    return res;
  });
}

export function setJwt(jwt) {
  localStorage.setItem(TOKEN_HEADER, jwt);
}

export function getJwt() {
  return localStorage.getItem(TOKEN_HEADER);
}

export function getCurrentUser() {
  try {
    const jwt = getJwt();
    return jwtDecode(jwt);
  } catch (err) {
    return null;
  }
}
