import React from "react";
import Joi from "joi-browser";
import Form from "../common/form";
import auth from "../../services/authService";
import { Redirect } from "react-router-dom";

class SignIn extends Form {
  state = {
    submitPressed: false,
    data: {
      email: "",
      password: ""
    },
    errors: {}
  };

  schema = {
    email: Joi.string()
      .required()
      .label("Email"),
    password: Joi.string()
      .required()
      .label("Password")
  };

  doSubmit = async () => {
    let redirect = true;
    try {
      this.toggleSubmitFlag(this.state.submitPressed);
      await auth.login(this.state.data);
    } catch (err) {
      if (err.response && err.response.status === 400) {
        const errors = { ...this.state.errors };
        // highlight email field
        errors.email = " ";
        errors.password = err.response.data.message;
        this.setState({ errors });
      }
      redirect = false;
    }
    if (redirect) {
      const { state } = this.props.location;
      this.handleRedirectHard(state ? state.from.pathname : "/dashboard");
    }
    this.toggleSubmitFlag(this.state.submitPressed);
  };

  render() {
    if (auth.getCurrentUser()) return <Redirect to="/dashboard" />;

    return (
      <div className="container-fluid">
        <div className="form-row row">
          <div className="col-lg-3">
            <form onSubmit={this.handleSubmit} className="form sign-in">
              <h1 className="header sign-in text-center">Sign in</h1>
              {this.renderInput("email", "Email", "Email", "email")}
              {this.renderInput("password", "Password", "Password", "password")}
              <small className="info form-text text-muted text-right">
                <ins>
                  <a
                    className="forgot-password"
                    onClick={() => {
                      this.handleRedirect("forgotPassword");
                    }}
                  >
                    Forgot password?
                  </a>
                </ins>
              </small>
              {this.renderSubmitButton(
                "SIGN IN",
                "sign-in filled1",
                this.state.submitPressed
              )}
              <div className="form-check">
                <input
                  type="checkbox"
                  className="form-check-input keep-signed-in"
                  id="exampleCheck1"
                />
                <label className="keep-signed-in" htmlFor="exampleCheck1">
                  Keep me signed in
                </label>
              </div>
              <div className="row no-account-row">
                <div className="col ">
                  <hr />
                </div>
                <div className="col-5 form-group text-center no-account-text">
                  Don't have an account?
                </div>
                <div className="col">
                  <hr />
                </div>
              </div>
              {this.renderButton("SIGN UP", "sign-up empty1", () => {
                this.handleRedirect("signup");
              })}
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default SignIn;
