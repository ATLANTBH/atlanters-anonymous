import React from "react";
import Form from "./ui/form/Form";
import Joi from "joi-browser";
import LoadingSpinner from "./ui/LoadingSpinner";
import inputNames from "../../constants/form/names/input";
import labels from "../../constants/form/labels";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
const { buttonLabels, inputLabels } = labels;

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
      fullName: "Vedad",
      email: "vedad_fejzagic@yahoo.com",
      signUpPassword: "123456789",
      confirmPassword: "123456789"
    },
    errors: {}
  };

  schema = {
    fullName: Joi.string()
      .required()
      .label(inputLabels.FULL_NAME),
    email: Joi.string()
      .required()
      .label(inputLabels.EMAIL),
    signUpPassword: Joi.string()
      .required()
      .label(inputLabels.PASSWORD)
      .min(8),
    confirmPassword: Joi.valid(Joi.ref(inputNames.SIGNUP_PASSWORD))
      .options({
        language: { any: { allowOnly: "must match password" } }
      })
      .label(inputLabels.CONFIRM_PASSWORD)
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
                inputNames.FULL_NAME,
                inputLabels.FULL_NAME,
                inputLabels.FULL_NAME,
                isSubmitting,
                "text",
                true
              )}
              {this.renderInput(
                inputNames.EMAIL,
                inputLabels.EMAIL,
                inputLabels.EMAIL,
                isSubmitting,
                "email",
                true
              )}
              {this.renderInput(
                inputNames.SIGNUP_PASSWORD,
                inputLabels.PASSWORD,
                inputLabels.PASSWORD,
                isSubmitting,
                "password",
                true
              )}
              {this.renderInput(
                inputNames.CONFIRM_PASSWORD,
                inputLabels.CONFIRM_PASSWORD,
                inputLabels.CONFIRM_PASSWORD,
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
                      buttonLabels.SIGNUP,
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
