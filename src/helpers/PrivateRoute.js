import React from 'react'
import { Route, Redirect } from 'react-router-dom';
import { authService } from '../services/auth.service';

export const PrivateRoute = ({ component: Component, roles, ...rest }) => (
    <Route {...rest} render={props => {
        const currentUser = authService.currentUserValue;
        if (!currentUser) {
            // not logged in so redirect to login page with the return url
<<<<<<< HEAD
<<<<<<< HEAD
            return <Redirect to={{ pathname: '/signin', state: { from: props.location } }} />
=======
            return <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
>>>>>>> Authorization added
=======
            return <Redirect to={{ pathname: '/signin', state: { from: props.location } }} />
>>>>>>> Jwt token added
        }

        // check if route is restricted by role
        if (roles && roles.indexOf(currentUser.role) === -1) {
            // role not authorised so redirect to home page
            return <Redirect to={{ pathname: '/' }} />
        }

        // authorised so return component
        return <Component {...props} />
    }} />
);
