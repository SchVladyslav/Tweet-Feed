import React from "react";
import { Switch, Route, Router, Redirect } from "react-router";
import { SignInPage, SignUpPage, PostPage, ProfilePage, EventPage, EventsPage, DashboardPage } from './pages/index';
import { PrivateRoute } from "./helpers/PrivateRoute";
import { history } from './helpers/FakeAPI/History';

export default function Routes() {
    return (
        <Router history={history}>
            <Switch>
                <Route path={'/signin'} component={SignInPage} />
                <Route path={'/signup'} component={SignUpPage} />
                <PrivateRoute path={'/post/:id'} component={PostPage} />
                <PrivateRoute path={'/events'} component={EventsPage} />
                <PrivateRoute path={'/event/:id'} component={EventPage} />
                <PrivateRoute exact path={'/profile'} component={ProfilePage} />
                <PrivateRoute exact path="/dashboard" component={DashboardPage} />
                <Redirect to={'signin'} />
                <Route
                    exact path={'**'}
                    component={() =>
                        <h1
                            style={{ color: 'red', textAlign: 'center', marginTop: '50px' }}>
                            Page was not found!
                        </h1>}
                />
            </Switch>
        </Router>
    )
}
