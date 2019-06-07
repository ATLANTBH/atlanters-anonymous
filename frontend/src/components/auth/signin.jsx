import React from "react";
import Joi from "joi-browser";
import Form from "../common/form";
import { login } from "../../services/authService";
class SignIn extends Form {
  state = {
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
    try {
      await login(this.state.data);
    } catch (err) {
      if (err.response && err.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.email = err.response.data.message;
        errors.password = err.response.data.message;
        this.setState({ errors });
      }
    }
  };

  render() {
    return (
      <div className="container-fluid">
        <div className="form-row row">
          <div className="col-lg-3">
            <form onSubmit={this.handleSubmit} className="form sign-in">
              <h1 className="sign-in text-center">Sign in</h1>
              {this.renderInput("email", "Email", "email")}
              {this.renderInput("password", "Password", "password")}
              <small className="form-text text-muted text-right">
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
              {this.renderButton("SIGN IN", "sign-in")}
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
              <button
                type="button"
                onClick={() => {
                  this.handleRedirect("signup");
                }}
                className="btn btn-primary sign-up"
              >
                <div className="sign-up-text">SIGN UP</div>
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default SignIn;
