import React, { Component } from "react";
import { Redirect } from "react-router";
import { Button } from "../index";

class Logout extends Component {
  state = {
    isLoggedOut: false
  };

  logout = e => {
    e.preventDefault();
    localStorage.removeItem("currentUser");
    this.setState({ isLoggedOut: true });
  };

  render() {
    const { isLoggedOut } = this.state;

    if (isLoggedOut) {
      return <Redirect to="/signin" push={true} />;
    }

    return (
      <Button
        children="Logout"
        className="button"
        type="submit"
        buttonColorScheme="transparent"
        buttonSize="small"
        onClick={this.logout}
      />
    );
  }
}

export default Logout;
