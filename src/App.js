import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import './App.scss';

import { DashboardPage } from "./pages/dashboardPage/DashboardPage";
import { SignInPage } from "./pages/SignInPage/SignInPage";
import { SignUpPage } from "./pages/SignUpPage/SignUpPage";
import { PrivateRoute } from "./helpers/PrivateRoute";
import { authService } from './services/auth.service';
import { Role } from './helpers/Role';
import Routes from "./Routes";
import { history } from './helpers/History';
import { EventsPage } from './pages/eventsPage/EventsPage';
import { PostPage } from './pages/postPage/PostPage';
import { ProfilePage } from './pages/profilePage/ProfilePage';

export default class App extends Component {
  constructor(props) {
    super(props);

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

  render() {
    //const { currentUser, isAdmin } = this.state;
    return (
      <Router history={history}>
        <Switch>
          <Route path={'/post/:id'} component={PostPage} />
          <Route path={'/events'} component={EventsPage} />
          <Route path={'/event/:id'} component={EventsPage} />
          <Route path={'/profile'} component={ProfilePage} />
          <Route exact path="/signin" component={SignInPage} />
          <Route exact path="/signup" component={SignUpPage} />
          <PrivateRoute exact path="/dashboard" roles={[Role.User, Role.Admin]} component={DashboardPage} />
          <Redirect to="/signin" />
          <Route
            exact path={'**'}
            component={() =>
              <h1
                style={{ color: 'red', textAlign: 'center', marginTop: '50px' }}>
                Page was not found!
              </h1>}
          />
        </Switch>
      </Router >
    );
  }

}
