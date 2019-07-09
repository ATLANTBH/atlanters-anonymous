const PATHS = {
  empty: "/",
  feedbackSend: "/feedback-send",
  feedback: "/feedback",
  feedbackConfirm: "/feedback-confirm",
  notFound: "/not-found",
  signUp: "/sign-up",
  signIn: "/sign-in",
  signOut: "/sign-out",
  forgotPassword: "forgot-password",
  passwordSent: "password-sent",
  auth: "/auth",
  dashboard: "/dashboard"
};

const TOKEN_HEADER = "x-auth";

const FORM_NAMES = {
  confirmPassword: "confirmPassword",
  signUpPassword: "signUpPassword"
}

export default {
  PATHS,
  TOKEN_HEADER,
  FORM_NAMES
};
