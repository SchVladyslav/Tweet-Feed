import React, { Component } from "react";
import { Link } from "react-router-dom";

import "./SignInPage.scss";
import AuthSignIn from "../../components/auth/AuthSignIn";

export class SignInPage extends Component {
  render() {
    return (
      <div className="container">
        <main className="main-content">
          <div className="main-logo-page">
            <i className="icon icon-mountains"></i>
          </div>
          <h1 className="main__title">Sign In</h1>

          <AuthSignIn />

          <div className="form__controls">
            <p className="main__social-text">Or sign up using</p>
            <Link className="hint" to="/signup">
              Don't have an account?
            </Link>
          </div>
        </main>
      </div>
    );
  }
}
