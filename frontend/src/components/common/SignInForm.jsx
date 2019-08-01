import Joi from "joi-browser";
import PropTypes from "prop-types";
import React from "react";
import { Link } from "react-router-dom";
import { SIGNIN } from "../../constants/form/labels/button";
import { EMAIL_LABEL, PASSWORD_LABEL } from "../../constants/form/labels/input";
import { EMAIL, SIGNIN_PASSWORD } from "../../constants/form/names/input";
import Form from "./ui/form/Form";
import LoadingSpinner from "./ui/LoadingSpinner";

export default class SignInForm extends Form {
  static propTypes = {
    /**
     * Error to display if submit was a failure
     */
    error: PropTypes.object,

    /**
     * Is sign in info submitting
     */
    isSubmitting: PropTypes.bool.isRequired
  };

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
      .label(EMAIL_LABEL),
    password: Joi.string()
      .required()
      .label(PASSWORD_LABEL)
  };

  onSubmit = e => {
    this.handleSubmit(e, this.props.onSubmit);
  };

  render() {
    const { error, isSubmitting } = this.props;
    return (
      <div className="container-fluid">
        <div className="form-row row">
          <div className="col-lg-3">
            <form onSubmit={this.onSubmit} className="form sign-in">
              <h1 className="sign-in title text-center">Sign in</h1>
              {this.renderInput(
                EMAIL,
                EMAIL_LABEL,
                EMAIL_LABEL,
                isSubmitting,
                "email"
              )}
              {this.renderInput(
                SIGNIN_PASSWORD,
                PASSWORD_LABEL,
                PASSWORD_LABEL,
                isSubmitting,
                "password"
              )}
              {isSubmitting && (
                <LoadingSpinner
                  text="Signin you in..."
                  height={50}
                  width={50}
                />
              )}
              {!isSubmitting && (
                <section>
                  <div className="error-text big">{error.message}</div>
                  <div className="text-center">
                    {this.renderButton(
                      SIGNIN,
                      "sign-in",
                      "submit",
                      this.state.submitPressed
                    )}
                    <Link className="redirect-sign-up" to="/sign-up">
                      Don't have an account?
                    </Link>
                  </div>
                </section>
              )}
            </form>
          </div>
        </div>
      </div>
    );
  }
}
