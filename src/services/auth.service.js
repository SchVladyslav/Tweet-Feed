import { HandleResponse } from '../helpers/HandleResponse';
import jwt from 'jsonwebtoken';

export const authService = {
    signIn,
    signUp,
    logout,
    getUserDataFromToken,
    get currentUser() { return JSON.parse(localStorage.getItem('currentUser')) }
};

function signIn(email, password) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    };
    return fetch(`/users/authenticate`, requestOptions)
        .then(HandleResponse)
        .then(user => {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('currentUser', JSON.stringify(user));
            return user;
        });
}

function getUserDataFromToken(token) {
    return jwt.decode(token);
}

function signUp(firstname, lastname, email, password) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ firstname, lastname, email, password }),
    }

    return fetch(`/users/authorization`, requestOptions)
        .then(HandleResponse)
        .then(user => {

        })
}

function logout() {
    localStorage.removeItem('currentUser');
}
