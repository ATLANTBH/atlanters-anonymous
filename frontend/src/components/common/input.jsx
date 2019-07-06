import React from "react";

const Input = ({ name, label, error, validateOnChange, ...rest }) => {
  const validate = validateOnChange && error;
  return (
    <div className="form-group">
      <label className="basic" htmlFor={name}>
        {label}
      </label>
      {rest.type === "textarea" ? (
        <textarea
          {...rest}
          name={name}
          id={name}
          className={validate ? "form-control error" : "form-control"}
        />
      ) : (
        <input
          {...rest}
          name={name}
          id={name}
          className={validate ? "form-control error" : "form-control"}
        />
      )}
      {validate && <div className="error-text">{error}</div>}
    </div>
  );
};

export default Input;
