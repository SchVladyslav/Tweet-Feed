import { AuthHeader } from "../helpers/FakeAPI/AuthHeader";
import { HandleResponse } from "../helpers/FakeAPI/HandleResponse";
import { Headers } from '../helpers/FakeAPI/Headers';


export const newsService = {
    getNewsList,
    createNews,
    removePost,
    getPostById,
    editPost
};


function getNewsList() {
    const requestOptions = { method: 'GET', headers: AuthHeader() };
    return fetch(Headers.NEWS_GET_LIST, requestOptions).then(HandleResponse);
}

function getPostById(id) {
    const requestOptions = { method: 'GET', headers: AuthHeader() };
    return fetch(`${Headers.NEWS_GET_POST}${id}`, requestOptions).then(HandleResponse);
}

function createNews(title, description) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, description }),
    };

    return fetch(Headers.NEWS_CREATE_POST, requestOptions)
        .then(HandleResponse)
}

function removePost(id) {
    const requestOptions = { method: 'DELETE', headers: AuthHeader() };
    return fetch(`${Headers.NEWS_REMOVE_POST}${id}`, requestOptions).then(HandleResponse);
}

function editPost(id, title, description) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, description }),
    };

    return fetch(`${Headers.NEWS_EDIT_POST}${id}`, requestOptions)
        .then(HandleResponse)
}
