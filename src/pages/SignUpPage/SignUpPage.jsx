import React, { Component } from "react";
import { Link } from "react-router-dom";

import "./SignUpPage.scss";

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
            <i className="icon icon-mountains"></i>
          </div>
          <h1 className="main__title">Sign Up</h1>
          <AuthSignUp />
        </main>
      </div>
    );
  }
}
