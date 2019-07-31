import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";

const Button = ({
  type,
  label,
  className,
  validate,
  buttonPressed,
  ...rest
}) => {
  return (
    <button
      {...rest}
      type={type}
      disabled={validate || buttonPressed}
      className={classNames("btn", "btn-primary", "filled1", className)}
    >
      <div className="button-text">{label}</div>
    </button>
  );
};

Button.propTypes = {
  /**
   * Button type
   */
  type: PropTypes.string.isRequired,

  /**
   * Button text
   */
  label: PropTypes.string.isRequired,

  /**
   * Specific class name if necessary
   */
  className: PropTypes.string,

  /**
   * If validate exists, button is disabled
   */
  validate: PropTypes.object,

  /**
   * True if button is presed
   */
  buttonPressed: PropTypes.bool
};

export default Button;
