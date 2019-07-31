import { post } from "./base";

export function submitFeedback(data) {
  return post("/api/feedback", data).then(res => {
    return res;
  });
}
