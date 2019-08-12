import Joi from "joi-browser";
import PropTypes from "prop-types";
import React from "react";
import { Link } from "react-router-dom";
import { SIGNUP } from "../../constants/form/labels/button";
import {
  CONFIRM_PASSWORD_LABEL,
  EMAIL_LABEL,
  NAME_LABEL,
  SURNAME_LABEL,
  PASSWORD_LABEL
} from "../../constants/form/labels/input";
import {
  CONFIRM_PASSWORD,
  EMAIL,
  NAME,
  SURNAME,
  SIGNUP_PASSWORD
} from "../../constants/form/names/input";
import Form from "./ui/form/Form";
import LoadingSpinner from "./ui/LoadingSpinner";

export default class SignUpForm extends Form {
  static propTypes = {
    /**
     * Error to display if submit was a failure
     */
    error: PropTypes.object,

    /**
     * Is sign up info submitting
     */
    isSubmitting: PropTypes.bool.isRequired
  };

  state = {
    submitPressed: false,
    data: {
      name: "Vedad",
      surname: "Fejzagic",
      email: "vedad_fejzagic@yahoo.com",
      signUpPassword: "12345678",
      confirmPassword: "12345678"
    },
    errors: {}
  };

  schema = {
    name: Joi.string()
      .required()
      .label(NAME_LABEL),
    surname: Joi.string()
      .required()
      .label(SURNAME_LABEL),
    email: Joi.string()
      .required()
      .label(EMAIL_LABEL),
    signUpPassword: Joi.string()
      .required()
      .label(PASSWORD_LABEL)
      .min(8),
    confirmPassword: Joi.valid(Joi.ref(SIGNUP_PASSWORD))
      .options({
        language: { any: { allowOnly: "must match password" } }
      })
      .label(CONFIRM_PASSWORD_LABEL)
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
            <form onSubmit={this.onSubmit} className="form sign-up">
              <h1 className="sign-up title text-center">Sign Up</h1>
              {this.renderInput(
                NAME,
                NAME_LABEL,
                NAME_LABEL,
                isSubmitting,
                "text",
                true
              )}
              {this.renderInput(
                SURNAME,
                SURNAME_LABEL,
                SURNAME_LABEL,
                isSubmitting,
                "text",
                true
              )}
              {this.renderInput(
                EMAIL,
                EMAIL_LABEL,
                EMAIL_LABEL,
                isSubmitting,
                "email",
                true
              )}
              {this.renderInput(
                SIGNUP_PASSWORD,
                PASSWORD_LABEL,
                PASSWORD_LABEL,
                isSubmitting,
                "password",
                true
              )}
              {this.renderInput(
                CONFIRM_PASSWORD,
                CONFIRM_PASSWORD_LABEL,
                CONFIRM_PASSWORD_LABEL,
                isSubmitting,
                "password",
                true
              )}
              {isSubmitting && (
                <LoadingSpinner
                  height={50}
                  width={50}
                  text="Signin you up..."
                />
              )}
              {!isSubmitting && (
                <section>
                  <div className="error-text big">{error.message}</div>
                  <div className="text-center">
                    {this.renderButton(
                      SIGNUP,
                      "sign-up",
                      "submit",
                      this.state.submitPressed
                    )}
                    <Link className="redirect-sign-in" to="/sign-in">
                      Already have an account?
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
