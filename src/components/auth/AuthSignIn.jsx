import React, { Component } from "react";
import { withRouter } from "react-router-dom";

import { authService } from "../../services/auth.service";
import FormSignIn from "../forms/FormSignIn/FormSignIn";
import { Preloader } from "../common/index";

class AuthSignIn extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      error: "",
      isFetching: false
    };

    if (authService.currentUser) {
      this.props.history.push("/dashboard");
    }
  }

  updateState = state => {
    this.setState({ email: state.email, password: state.password });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { email, password } = this.state;
    this.setState({ isFetching: true });
    authService
      .signIn(email, password)
      .then(() => {
        const { from } = this.props.location.state || {
          from: { pathname: "/dashboard" }
        };
        this.props.history.push(from);
      })
      .catch(error => {
        this.setState({ error: error, isFetching: false });
      });
  };

  render() {
    const { isFetching, error } = this.state;
    return (
      <>
        {isFetching ? <Preloader /> : ""}
        {<p className="main-form__error">{error}</p>}
        <FormSignIn
          state={this.state}
          updateState={this.updateState}
          handleSubmit={this.handleSubmit}
        />
      </>
    );
  }
}

export default withRouter(AuthSignIn);
