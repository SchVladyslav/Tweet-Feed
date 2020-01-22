import React from "react";
import "./input.scss";

export function Input({
  key,
  className,
  placeholder,
  type,
  name,
  errorMessage,
  onChange
}) {
  return (
    <div className="input-wrap" key={key}>
      <input
        className={`${className ? className : ""} input${
          errorMessage ? " input_invalid" : ""
        }`}
        name={name}
        placeholder={placeholder}
        type={type}
        onChange={onChange}
      />
      <i className="icon icon-user input__icon" />
      {errorMessage ? <p className="error-message">{errorMessage}</p> : null}
    </div>
  );
}
