import { HandleResponse } from '../helpers/HandleResponse';
import jwt from 'jsonwebtoken';

export const authService = {
    signIn,
    signUp,
    logout,
    get currentUser() { return getUserDataFromToken(JSON.parse(localStorage.getItem('currentUser'))) }
};

function signIn(email, password) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    };

    return fetch(`/users/authenticate`, requestOptions)
        .then(HandleResponse)
        .then(token => {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('currentUser', JSON.stringify(token));
            return token;
        })
        .catch(error => {
            return error;
        });
}

function signUp(firstName, lastName, email, password, confirmPassword) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ firstName, lastName, email, password, confirmPassword }),
    }

    return fetch(`/users/authorization`, requestOptions)
        .then(HandleResponse);
}

function getUserDataFromToken(user) {
    if (user)
        return jwt.decode(user.token).user;
}

function logout() {
    localStorage.removeItem('currentUser');
}