import React from "react";
import { Link } from "react-router-dom";
import Form from "../elements/Form";

export const AuthSignIn = () => {
  return (
    <div className="container">
      <main className="main-content">
        <div className="main-logo">
          <i className="icon icon-mountain"></i>
        </div>
        <h1 className="main__title">Log In</h1>
        <Form />
        <div className="form__controls">
          <p className="main__social-text">Or sign up using</p>
          <Link className="hint" to="/signup">
            Don't have an account?
          </Link>
        </div>
      </main>
    </div>
  );
};
