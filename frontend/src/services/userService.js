import http from "./httpService";
import { apiUrl } from "../config.json";

const apiEndpoint = apiUrl + "/auth/sign-up";

export function register(user) {
  console.log(apiEndpoint);
  console.log(user);
  return http.post(
    apiEndpoint,
    {
      email: user.email,
      password: user.signUpPassword,
      name: user.fullName,
      surname: user.fullName
    },
    {
      headers: {
        "Content-Type": "application/json"
      }
    }
  );
}
