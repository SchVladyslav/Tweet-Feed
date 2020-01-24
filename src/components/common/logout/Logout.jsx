import React, { Component } from "react";
import { Redirect } from "react-router";
import { Button } from "../index";

export class Logout extends Component {
  state = {
    isLoggedIn: false
  };

  logout = e => {
    e.preventDefault();
    localStorage.removeItem("currentUser");
    this.setState({ isLoggedIn: true });
  };

  render() {
    const { isLoggedIn } = this.state;

    if (isLoggedIn) {
      return <Redirect to="/signin" push={true} />;
    }

    return (
      <Button
        children="Logout"
        className="button"
        type="submit"
        buttonColorScheme="primary"
        buttonSize="medium"
        onClick={this.logout}
      />
    );
  }
}
