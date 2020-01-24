import React from "react";
import "./Button.scss";
import PropTypes from "prop-types";

function getClassName(classesArray, property) {
  if (classesArray[property]) {
    return classesArray[property];
  } else {
    return classesArray.default;
  }
}

export function Button({
  children,
  className,
  type,
  onClick,
  onSubmit,
  buttonColorScheme,
  buttonSize,
  disabled,
  key,
  color
}) {
  const colorSchemes = {
    primary: "button_primary",
    danger: "button_danger",
    transparent: "button_transparent",
    light: "button_light",
    pearl: "button_pearl",
    default: "button_primary"
  };
  const buttonSizes = {
    small: "button_small",
    medium: "button_medium",
    large: "button_large",
    default: "button_medium"
  };
  const colorSchemeClass = getClassName(colorSchemes, buttonColorScheme);
  const buttonSizeClass = getClassName(buttonSizes, buttonSize);

  return (
    <button
      key={key}
      type={type}
      className={`button ${colorSchemeClass} ${buttonSizeClass} ${
        className ? className : ""
      }`}
      onClick={onClick}
      onSubmit={onSubmit}
      disabled={disabled}
      style={{ color: color }}
    >
      {children}
    </button>
  );
}

Button.propTypes = {
  key: PropTypes.string,
  type: PropTypes.string,
  className: PropTypes.string,
  buttonColorScheme: PropTypes.string,
  buttonSize: PropTypes.string,
  color: PropTypes.string,
  onClick: PropTypes.func,
  onSubmit: PropTypes.func,
  disabled: PropTypes.bool,
  style: PropTypes.string,
  children: PropTypes.string
};
