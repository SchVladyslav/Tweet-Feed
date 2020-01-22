import React, { Component } from "react";
import { authService } from "../../services/auth.service";
import { userService } from "../../services/user.service";

export default class Dashboard extends Component {
  state = {
    currentUser: authService.currentUser,
    userFromApi: null
  };

  constructor(props) {
    super(props);

    this.state = {
      currentUser: authService.currentUser,
      userFromApi: null
    };
  }

  componentDidMount() {
    const { currentUser } = this.state;
    // console.log(currentUser);
    // userService
    //   .getById(currentUser.id)
    //   .then(userFromApi => this.setState({ userFromApi }));
  }

  render() {
    const { currentUser, userFromApi } = this.state;
    return (
      <div className="dashboard">
        <h1>Home</h1>
        <p>You're logged in!</p>
        <p>
          Your role is: <strong>{currentUser.role}</strong>.
        </p>
        <p>This page can be accessed by all authenticated users.</p>
        <div>
          Current user from secure api end point:
          {userFromApi && (
            <ul>
              <li>{/* {userFromApi.firstName} {userFromApi.lastName} */}</li>
            </ul>
          )}
        </div>

        <div className="logOut">
          <h3>
            <a onClick={authService.logout}>Log Out</a>
          </h3>
        </div>
      </div>
    );
  }
}
