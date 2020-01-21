import React, { Component } from "react";
import { authService } from "../../services/auth.service";
import { userService } from "../../services/user.service";

export default class Dashboard extends Component {
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> Jwt token added
  state = {
    currentUser: authService.currentUserValue,
    userFromApi: null
  };
<<<<<<< HEAD
=======
  constructor(props) {
    super(props);

    this.state = {
      currentUser: authService.currentUserValue,
      userFromApi: null
    };
  }
>>>>>>> Authorization added
=======
>>>>>>> Jwt token added

  componentDidMount() {
    const { currentUser } = this.state;
    const userData = authService.getUserDataFromToken(currentUser.token);
    userService
      .getById(currentUser.id)
      .then(userFromApi => this.setState({ userFromApi }));
  }

  render() {
    const { currentUser, userFromApi } = this.state;
    return (
<<<<<<< HEAD
<<<<<<< HEAD
      <div className="dashboard">
        <h1>Home</h1>
        <p>You're logged in!</p>
=======
      <div>
=======
      <div className="dashboard">
>>>>>>> Added: Scss, layout for dashboard component, minor fixes for fakeAPI
        <h1>Home</h1>
        <p>You're logged in with React & JWT!!</p>
>>>>>>> Authorization added
        <p>
          Your role is: <strong>{currentUser.role}</strong>.
        </p>
        <p>This page can be accessed by all authenticated users.</p>
        <div>
          Current user from secure api end point:
          {userFromApi && (
            <ul>
              <li>
                {userFromApi.firstName} {userFromApi.lastName}
              </li>
            </ul>
          )}
        </div>
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> Added: Scss, layout for dashboard component, minor fixes for fakeAPI

        <div className="logOut">
          <h3>
            <a onClick={authService.logout}>Log Out</a>
          </h3>
        </div>
<<<<<<< HEAD
=======
>>>>>>> Authorization added
=======
>>>>>>> Added: Scss, layout for dashboard component, minor fixes for fakeAPI
      </div>
    );
  }
}
