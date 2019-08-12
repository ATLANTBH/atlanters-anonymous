export const FEEDBACK_ROUTE = "/feedback";
export const FEEDBACK_ROUTE_PARAMS = "/feedback/:feedbackId?";
export const NOT_FOUND_ROUTE = "/not-found";
export const SIGNUP_ROUTE = "/sign-up";
export const SIGNIN_ROUTE = "/sign-in";

export const FEEDBACKS_ROUTE = "/feedbacks";

export const FEEDBACK_CHAT = feedbackId => {
  return FEEDBACK_ROUTE + `/${feedbackId}`;
};
