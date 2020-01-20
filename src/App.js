import React, { Component } from 'react';
import { Route, Router, Switch, Redirect } from 'react-router-dom';

import { authService } from './services/auth.service';
import { Role } from './helpers/Role';
import { history } from './helpers/History';


export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: null,
      isAdmin: false
    }
  }

  componentDidMount() {
    authService.currentUser.subscribe(item => this.setState({
      currentUser: item,
      isAdmin: item && item.role === Role.Admin
    }));
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
