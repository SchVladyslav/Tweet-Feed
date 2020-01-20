import React from "react";
import {Switch, Route} from "react-router";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import DashboardPage from "./pages/DashboardPage";
import PostPage from "./pages/PostPage";
import EventsPage from "./pages/EventsPage";
import EventPage from "./pages/EventPage";
import ProfilePage from "./pages/ProfilePage";

export default function Routes() {
    return(
        <Switch>
            <Route path={'/signin'} component={SignInPage}/>
            <Route path={'/signup'} component={SignUpPage}/>
            <Route path={'/dashboard'} component={DashboardPage}/>
            <Route path={'/post/:id'} component={PostPage}/>
            <Route path={'/events'} component={EventsPage}/>
            <Route path={'/event/:id'} component={EventPage}/>
            <Route path={'/profile'} component={ProfilePage}/>
            <Route exact path={'/'} component={DashboardPage}/>
            <Route
                exact path={'**'}
                component={() =>
                    <h1
                    style={{color: 'red', textAlign: 'center', marginTop: '50px'}}>
                        Page was not found!
                    </h1>}
            />
        </Switch>
    )
}
