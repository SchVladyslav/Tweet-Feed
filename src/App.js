<<<<<<< HEAD
import React, { Component } from 'react';
import { Route, Router, Switch, Redirect } from 'react-router-dom';

import _Demo from "./components/common/_Demo";
import './App.scss';
=======
import React from 'react';
import { BrowserRouter, Route } from "react-router-dom";
import './App.css';
import _Demo from "./components/common/_Demo";
>>>>>>> common elements added

import Dashboard from "./pages/dashboardPage/DashboardPage";
import SignIn from "./pages/SignInPage/SignInPage";
import SignUp from "./pages/SignUpPage/SignUpPage";
<<<<<<< HEAD
import { PrivateRoute } from "./helpers/PrivateRoute";
import { authService } from './services/auth.service';
import { Role } from './helpers/Role';
import { history } from './helpers/History';

export default class App extends Component {
  constructor(props) {
    super(props);
=======

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Route path="/" exact component={SignIn} />
        <Route path="/signup" exact component={SignUp} />
        <Route path="/dashboard" exact component={Dashboard} />
      </div >
    </BrowserRouter>
  );
}
>>>>>>> common elements added

    this.state = {
      currentUser: null,
      isAdmin: false
    }
  }

  componentDidMount() {
    const isLoggedIn = authService.currentUser;
    this.setState({
      currentUser: isLoggedIn,
      isAdmin: isLoggedIn && isLoggedIn.role === Role.Admin
    });
  }

  logout() {
    authService.logout();
    history.push('/signin');
  }

  render() {
    //const { currentUser, isAdmin } = this.state;
    return (
      <Router history={history}>
        <Switch>
          <Route path="/signin" component={SignIn} />
          <Route path="/signup" component={SignUp} />
          <PrivateRoute path="/dashboard" roles={[Role.User, Role.Admin]} component={Dashboard} />
          <Redirect to="/signin" />
        </Switch>
      </Router >
    );
  }

}
