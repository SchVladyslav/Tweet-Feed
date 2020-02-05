import { HandleResponse } from '../helpers/FakeAPI/HandleResponse';
import jwt from 'jsonwebtoken';
import { SECRET_KEY } from '../helpers/FakeAPI/secretKey';
import { Headers } from '../helpers/FakeAPI/Headers';

function signIn(email, password) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    };

    return fetch(Headers.USER_AUTHENTICATE, requestOptions)
        .then(HandleResponse)
        .then(token => {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('currentUser', JSON.stringify(token));
            return token;
        })
        .then(error => { //catch doesn't work
            return error;
        });
}

function signUp(firstName, lastName, email, password, confirmPassword) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ firstName, lastName, email, password, confirmPassword, gender: null, age: null }),
    };

    return fetch(Headers.USER_AUTHORIZATION, requestOptions)
        .then(HandleResponse)
        .then(users => { localStorage.setItem('users', JSON.stringify(users)); })
        .then(error => {
            return error;
        });
}

function refreshToken(token) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token }),
    };

    return fetch(Headers.USER_REFRESH_TOKEN, requestOptions)
        .then(HandleResponse)
        .then(token => {
            localStorage.setItem('currentUser', JSON.stringify(token));
        });
}

function getUserDataFromToken(userToken) {
    if (userToken) {
        const decoded = checkTokenExpiration(userToken);
        return decoded.user;
    }
}

function checkTokenExpiration(userToken) {
    try {
        return jwt.verify(userToken.accessToken, SECRET_KEY);
    } catch {
        let decoded = jwt.decode(userToken.accessToken);
        if (isExpired(decoded.exp)) {
            refreshToken(userToken);
            const decoded = JSON.parse(localStorage.getItem('currentUser'));
            return jwt.decode(decoded.accessToken);
        }
    }
}

function isExpired(exp) {
    return Date.now() > exp * 1000;
}

function logout() {
    localStorage.removeItem('currentUser');
}

export const authService = {
    signIn,
    signUp,
    logout,
    refreshToken,
    getUserDataFromToken,
    get currentUser() { return getUserDataFromToken(JSON.parse(localStorage.getItem('currentUser'))) }
};
