import { AuthHeader } from "../helpers/AuthHeader";
import { HandleResponse } from "../helpers/HandleResponse";
import {func} from "prop-types";
import jwt from 'jsonwebtoken';
import {authService} from "./auth.service";

export const userService = {
    getAllUsers,
    updateUserData
};

function getAllUsers() {
    const requestOptions = { method: 'GET', headers: AuthHeader() };
    return fetch('/users', requestOptions).then(HandleResponse);
}

function updateUserData() {
    const userLocal = JSON.parse(localStorage.getItem('currentUser'));
    const user = authService.getUserDataFromToken(userLocal);
    console.log(user);
}
