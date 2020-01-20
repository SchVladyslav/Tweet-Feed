<<<<<<< HEAD
import React from "react";
import PropTypes from "prop-types";

export const Button = (props, { buttonState }) => {
  return (
    <button
      className={props.className}
      type={props.type}
      disabled={!buttonState}
    >
      {props.label}
    </button>
  );
};

Button.defaultProps = {
  type: "button",
  className: ""
};

Button.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  type: PropTypes.oneOf(["button", "submit"]),
  className: PropTypes.string
};
=======
import React, { Component } from "react";
import { Link } from "react-router-dom";

import "./SignUpPage.css";

import { AuthSignUp } from "../../components/auth/AuthSignUp";

export default class SignUpPage extends Component {
  render() {
    return (
      <div className="container">
        <main className="main-content">
          <div className="main-back">
            <Link to="/signin">&larr;</Link>
          </div>
          <div className="main-logo">
            <i className="icon icon-mountain"></i>
          </div>
          <h1 className="main__title">Sign Up</h1>
          <AuthSignUp />
        </main>
      </div>
    );
  }
}
>>>>>>> Authorization added
