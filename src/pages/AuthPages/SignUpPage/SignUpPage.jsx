import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../AuthPages.scss";
import Layout from "../../../components/Layout/Layout";
import AuthSignUp from "../../../components/auth/AuthSignUp";

export default class SignUpPage extends Component {
  render() {
    return (
      <Layout>
        <div className="container">
          <main className="main-content">
            <div className="main-back">
              <Link to="/signin">&larr;</Link>
            </div>
            <i className="icon icon-mountains main-logo" />
            <h1 className="main__title">Sign Up</h1>
            <AuthSignUp />
          </main>
        </div>
      </Layout>
    );
  }
}
