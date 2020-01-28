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

export const userService = {
    getAllUsers,
    getUserData
};

