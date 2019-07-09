import React, { Component } from "react";
import Joi from "joi-browser";
import Input from "./input";
import classNames from "classnames";

class Form extends Component {
  state = {
    submitPressed: false,
    data: {},
    errors: {}
  };

  validate = () => {
    const options = {
      abortEarly: false
    };
    const { error } = Joi.validate(this.state.data, this.schema, options);
    if (!error) return null;

    const errors = {};
    for (let item of error.details) errors[item.path[0]] = item.message;
    return errors ? errors : null;
  };

  validateProperty = ({ name, value }) => {
    const obj = {
      [name]: value
    };
    const schema = { [name]: this.schema[name] };
    const { error } = Joi.validate(obj, schema);
    return error ? error.details[0].message : null;
  };

  handleSubmit = e => {
    e.preventDefault();

    const errors = this.validate();
    this.setState({ errors: errors || {} });
    if (errors) return;

    this.doSubmit();
  };

  deleteProperty = (obj, property) => {
    delete obj[property];
  };

  toggleSubmitFlag = submitFlag => {
    let submitPressed = !submitFlag;
    this.setState({ submitPressed });
  };

  validateConfirmPassword(
    password,
    confirmPassword,
    confirmPasswordName,
    errors
  ) {
    if (password !== confirmPassword) {
      const errorMessage = this.validateProperty({
        name: confirmPasswordName,
        value: confirmPassword
      });
      errors[confirmPasswordName] = errorMessage;
    } else {
      this.deleteProperty(errors, confirmPasswordName);
    }
  }

  handleRedirect = (target, params = {}) => {
    const { history } = this.props;
    history.push({
      pathname: target,
      state: {
        params
      }
    });
  };

  handleRedirectHard = target => {
    window.location = target;
  };

  handleChange = ({ currentTarget }) => {
    const errors = { ...this.state.errors };
    const { name, value } = currentTarget;
    const { signUpPassword, confirmPassword } = this.state.data;
    const confirmPasswordName = "confirmPassword";

    if (name === confirmPasswordName && value === signUpPassword) {
      this.deleteProperty(errors, name);
    } else {
      const errorMessage = this.validateProperty(currentTarget);
      if (errorMessage) errors[name] = errorMessage;
      else this.deleteProperty(errors, name);
      if (name === "signUpPassword" && confirmPassword.length > 0) {
        this.validateConfirmPassword(
          value,
          confirmPassword,
          confirmPasswordName,
          errors
        );
      }
    }

    const data = { ...this.state.data };
    data[name] = value;
    this.setState({ data, errors });
  };

  renderSubmitButton(label, className, buttonPressed = false) {
    return (
      <button
        type="submit"
        disabled={this.validate() || buttonPressed}
        className={classNames("btn btn-primary", className)}
      >
        <div className={classNames(className + "-text")}>{label}</div>
      </button>
    );
  }

  renderButton(label, className, onClick) {
    return (
      <button
        type="button"
        onClick={onClick}
        className={classNames("btn btn-primary", className)}
      >
        <div className={classNames(className + "-text")}>{label}</div>
      </button>
    );
  }

  renderInput(
    name,
    label,
    placeholder,
    validateOnChange = true,
    type = "text",
    opts = {}
  ) {
    const { data, errors } = this.state;
    return (
      <Input
        type={type}
        name={name}
        label={label}
        value={data[name]}
        error={errors[name]}
        onChange={this.handleChange}
        placeholder={placeholder}
        validateOnChange={validateOnChange}
        {...opts}
      />
    );
  }
}

export default Form;