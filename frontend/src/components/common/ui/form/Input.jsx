import React from "react";
import PropTypes from "prop-types";

const Input = ({
  name,
  label,
  placeholder,
  required,
  error,
  type,
  ...rest
}) => {
  return (
    <div className="form-group">
      <label className="basic" htmlFor={name}>
        {label}
        {required && "*"}
      </label>
      <input
        {...rest}
        type={type}
        name={name}
        id={name}
        className={error ? "form-control error" : "form-control"}
        placeholder={placeholder}
      />
      {error && <div className="error-text">{error}</div>}
    </div>
  );
};

Input.propTypes = {
  /**
   * Name supplied to html tag
   */
  name: PropTypes.string.isRequired,

  /**
   * Text shown above input
   */
  label: PropTypes.string.isRequired,

  /**
   * Placeholder in input field
   */
  placeholder: PropTypes.string.isRequired,

  /**
   * If input must be filled
   */
  required: PropTypes.bool.isRequired,

  /**
   * Errors shown below input field, if any
   */
  error: PropTypes.string,

  /**
   * Type supplied to html tag
   */
  type: PropTypes.string.isRequired
};

export default Input;
