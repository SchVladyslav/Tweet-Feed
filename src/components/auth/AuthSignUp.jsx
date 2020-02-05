import React, { Component } from "react";
import { withRouter } from "react-router";
import { PropTypes } from "prop-types";

import { FormSignUp } from "../forms/FormSignUp/FormSignUp";
import { authService } from "../../services/auth.service";
import { Preloader } from "../common/index";

class AuthSignUp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      error: "",
      isFetching: false
    };
  }

  updateState = state => {
    this.setState({
      firstName: state.firstName,
      lastName: state.lastName,
      email: state.email,
      password: state.password,
      confirmPassword: state.confirmPassword
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    const {
      firstName,
      lastName,
      email,
      password,
      confirmPassword
    } = this.state;
    this.setState({ isFetching: true });
    authService
      .signUp(firstName, lastName, email, password, confirmPassword)
      .then(() => {
        const { from } = this.props.location.state || {
          from: { pathname: "/signin" }
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
        <FormSignUp
          state={this.state}
          updateState={this.updateState}
          handleSubmit={this.handleSubmit}
        />
      </>
    );
  }
}

export default withRouter(AuthSignUp);

AuthSignUp.propTypes = {
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  email: PropTypes.string,
  password: PropTypes.string,
  confirmPassword: PropTypes.string,
  isFetching: PropTypes.bool,
  error: PropTypes.string
};
