import React, { Component } from "react";
import { Link } from "react-router-dom";

import "./SignInPage.scss";
import AuthSignIn from "../../components/auth/AuthSignIn";
import Layout from "../../components/Layout/Layout";

class SignInPage extends Component {
  render() {
    return (
        <Layout>
            <div className="container">
                <div className="main-content">
                    <h1 className="main__title">Sign In</h1>

                    <AuthSignIn />

                    <div className="form__controls">
                        <p className="main__social-text">Or sign up using</p>
                        <Link className="hint" to="/signup">
                            Don't have an account?
                        </Link>
                    </div>
                </div>
            </div>
        </Layout>
    );
  }
}

export default SignInPage;
