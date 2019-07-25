import { post } from "./base";

export async function submitFeedback(data) {
  return post("/api/feedback", data).then(res => {
    return res;
  });
}
