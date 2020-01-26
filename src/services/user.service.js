import { AuthHeader } from "../helpers/AuthHeader";
import { HandleResponse } from "../helpers/HandleResponse";
import {func} from "prop-types";

export const userService = {
    getAll,
    getById,
};

function getAll() {
    const requestOptions = { method: 'GET', headers: AuthHeader() };
    return fetch(`/users`, requestOptions).then(HandleResponse);
}


function getById(id) {
    const requestOptions = { method: 'GET', headers: AuthHeader() };
    return fetch(`/users/${id}`, requestOptions).then(HandleResponse);
}
