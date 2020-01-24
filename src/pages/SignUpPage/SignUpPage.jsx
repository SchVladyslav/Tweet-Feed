import React, {Component} from "react";
import {Link} from "react-router-dom";
import "./SignUpPage.scss";
import {AuthSignUp} from "../../components/auth/AuthSignUp";
import Layout from "../../components/Layout/Layout";

export default class SignUpPage extends Component {
    render() {
        return (
            <Layout>
                <div className="container">
                    <main className="main-content">
                        <div className="main-back">
                            <Link to="/signin">&larr;</Link>
                        </div>
                            <i className="icon icon-mountains main-logo"/>
                        <h1 className="main__title">Sign Up</h1>
                        <AuthSignUp/>
                    </main>
                </div>
            </Layout>
        );
    }
}

