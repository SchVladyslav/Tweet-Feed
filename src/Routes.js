import React from "react";
import { Switch, Route, Router, Redirect } from "react-router";
import { SignInPage, SignUpPage, PostPage, ProfilePage, EventPage, EventsPage, DashboardPage } from './pages/index';
import { PrivateRoute } from "./helpers/PrivateRoute";
import { Role } from "./helpers/Role";
import { history } from './helpers/History';

export default function Routes() {
    return (
        <Router history={history}>
            <Switch>
                <Route path={'/signin'} component={SignInPage} />
                <Route path={'/signup'} component={SignUpPage} />
                <Route path={'/post/:id'} component={PostPage} />
                <Route path={'/events'} component={EventsPage} />
                <Route path={'/event/:id'} component={EventPage} />
                <Route path={'/profile'} component={ProfilePage} />
                <PrivateRoute exact path="/dashboard" roles={[Role.User, Role.Admin]} component={DashboardPage} />
                <Route
                    exact path={'**'}
                    component={() =>
                        <h1
                            style={{ color: 'red', textAlign: 'center', marginTop: '50px' }}>
                            Page was not found!
                    </h1>}
                />
            </Switch>
          {/*  <Redirect to="/signin" />*/}
        </Router>
    )
}
