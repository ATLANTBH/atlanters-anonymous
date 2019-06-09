import React from "react";
import Joi from "joi-browser";
import Form from "../common/form";
import { Redirect } from "react-router-dom";
import auth from "../../services/authService";

class SignIn extends Form {
  state = {
    data: {
      email: ""
    },
    errors: {}
  };

  schema = {
    email: Joi.string()
      .required()
      .label("Email")
  };

  doSubmit = () => {
    const { email } = this.state.data;
    this.handleRedirect("pwEmailSent", { email });
  };

  render() {
    if (auth.getCurrentUser()) return <Redirect to="/" />;

    return (
      <div className="container-fluid">
        <div className="form-row row">
          <div className="col-lg-3">
            <form onSubmit={this.handleSubmit} className="form forgot-password">
              <h1 className="forgot-password text-center">Forgot password?</h1>
              {this.renderInput("email", "Enter your email", "email")}
              {this.renderButton("SUBMIT", "forgot-password")}
              <div className="row no-account-row">
                <div className="col form-group text-center return-sign-in-text">
                  <a
                    onClick={() => {
                      this.handleRedirect("signin");
                    }}
                  >
                    Return to sign in
                  </a>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default SignIn;
