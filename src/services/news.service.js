import { AuthHeader } from "../helpers/AuthHeader";
import { HandleResponse } from "../helpers/HandleResponse";
import {func} from "prop-types";

export const newsService = {
    getNewsList,
    createNews,
    removeNews,
    getPostById
};


function getNewsList(){
    const requestOptions = { method: 'GET', headers: AuthHeader() };
    return fetch(`/news`, requestOptions).then(HandleResponse);
}

function getPostById(id) {
    const requestOptions = { method: 'GET', headers: AuthHeader() };
    return fetch(`/news/${id}`, requestOptions).then(HandleResponse);
}

function createNews(title, description) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, description}),
    };

    return fetch(`/news/add`, requestOptions)
        .then(HandleResponse)
}
function removeNews(id) {
    const requestOptions = { method: 'DELETE', headers: AuthHeader() };
    return fetch(`/news/${id}`, requestOptions).then(HandleResponse);
}
