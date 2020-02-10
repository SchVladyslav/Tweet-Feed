import React from 'react'
import { Route, Redirect } from 'react-router-dom';
import { authService } from '../services/auth.service';

export const PrivateRoute = ({ component: Component, ...rest }) => {
    return <Route {...rest} render={props => {
        const currentUser = authService.currentUser;
        if (!currentUser) {
            return <Redirect to={{ pathname: '/signin', state: { from: props.location } }} />
        }

        // check if route is restricted by role
        // if (roles && roles.indexOf(currentUser.role) === -1) {
        //     return <Redirect to={{ pathname: '/signin' }} />
        // }

        return <Component {...props} />
    }} />
}
