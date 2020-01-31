import { AuthHeader } from "../helpers/FakeAPI/AuthHeader";
import { HandleResponse } from "../helpers/FakeAPI/HandleResponse";
import { authService } from "./auth.service";

function getAllUsers() {
    const requestOptions = {method: 'GET', headers: AuthHeader()};
    return fetch('/users', requestOptions).then(HandleResponse);
}

function getUserData() {
    const userLocal = JSON.parse(localStorage.getItem('currentUser'));
    return authService.getUserDataFromToken(userLocal);
}

function getUserById(id) {
    const requestOptions = {
        method: 'GET',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(id)
    };

    return fetch(`/users/${id}`, requestOptions).then(HandleResponse);
}

function changeUserPassword(id, newPassword) {
    getUserById(id).then(user => {
        const updatedUser = {
            ...user,
            password: newPassword
        };

        fetchUpdateUserProfile(updatedUser).then(HandleResponse);
    });
}

function updateUserData(id, {firstName, lastName, age, gender}) {
    getUserById(id).then(user => {
        const updatedUser = {
            id: user.id,
            firstName,
            lastName,
            email: user.email,
            password: user.password,
            age,
            gender,
            role: user.role
        };

        fetchUpdateUserProfile(updatedUser).then(HandleResponse);
    });
}

function fetchUpdateUserProfile(updatedUser) {
    const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedUser)
    };

    return fetch('put/profile', requestOptions);
}

export const userService = {
    getAllUsers,
    getUserData,
    updateUserData,
    changeUserPassword
};

