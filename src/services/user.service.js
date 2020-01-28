import { AuthHeader } from "../helpers/AuthHeader";
import { HandleResponse } from "../helpers/HandleResponse";
import {authService} from "./auth.service";

function getAllUsers() {
    const requestOptions = { method: 'GET', headers: AuthHeader() };
    return fetch('/users', requestOptions).then(HandleResponse);
}

function getUserData() {
    const userLocal = JSON.parse(localStorage.getItem('currentUser'));
    return authService.getUserDataFromToken(userLocal);
}

function updateUserPassword(id, newPassword) {
    const users = JSON.parse(localStorage.getItem('users'));
    const user = users.find(user => user.id === id);
    const userIndex = users.findIndex(user => user.id === id);
    user.password = newPassword;
    users.splice(userIndex, 1, user);
    console.log(users);
    localStorage.setItem('users', JSON.stringify(users));
}

export const userService = {
    getAllUsers,
    getUserData,
    updateUserPassword
};

