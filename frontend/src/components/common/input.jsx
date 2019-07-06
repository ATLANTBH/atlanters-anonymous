import React from "react";

const Input = ({ name, label, error, ...rest }) => {
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
          className={error ? "form-control error" : "form-control"}
        />
      ) : (
        <input
          {...rest}
          name={name}
          id={name}
          className={error ? "form-control error" : "form-control"}
        />
      )}
      {error && <div className="error-text">{error}</div>}
    </div>
  );
};

export default Input;
