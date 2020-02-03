import {HandleResponse} from "../helpers/FakeAPI/HandleResponse";
import {Headers} from '../helpers/FakeAPI/Headers';

function getUserDataById(id) {
    const users = JSON.parse(localStorage.getItem('users'));
    return users.find(user => user.id === id);
}

function changeUserPassword(id, newPassword) {
    const user = getUserDataById(id);
    const updatedUser = {
        ...user,
        password: newPassword
    };

    fetchUpdateUserProfile(updatedUser).then(HandleResponse);
}

function updateUserData(id, {firstName, lastName, age, gender}) {
    const user = getUserDataById(id);

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
}

function fetchUpdateUserProfile(updatedUser) {
    const requestOptions = {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(updatedUser)
    };

    return fetch(Headers.USER_UPDATE_PROFILE, requestOptions);
}

export const userService = {
    getUserDataById,
    updateUserData,
    changeUserPassword
};

