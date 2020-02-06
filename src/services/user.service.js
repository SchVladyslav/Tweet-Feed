import {HandleResponse} from "../helpers/FakeAPI/HandleResponse";
import {Headers} from '../helpers/FakeAPI/Headers';

function isObjEqual(obj1, obj2) {
    const obj1Props = Object.getOwnPropertyNames(obj1);
    const obj2Props = Object.getOwnPropertyNames(obj2);

    if (obj1Props.length !== obj2Props.length) return false;

    for (let i = 0; i < obj1Props.length; i++) {
        const propName = obj1Props[i];

        if (obj1[propName] !== obj2[propName]) return false;
    }

    return true;
}

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

    const isUsersEqual = isObjEqual(user, updatedUser);

    if (!isUsersEqual) {
        return fetchUpdateUserProfile(updatedUser).then(HandleResponse);
    } else {
        window.alert("You didn't change nothing in your profile!");
        return false;
    }
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

