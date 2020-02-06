import {HandleResponse} from "../helpers/FakeAPI/HandleResponse";

function getEventById(id) {
    const requestOptions = {
        method: 'GET',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(id)
    };
    return fetch('/event/get', requestOptions).then(HandleResponse);
}

function getAllEvents() {
    const requestOptions = {
        method: 'GET',
        headers: {'Content-Type': 'application/json'}
    };
    return fetch('/events', requestOptions).then(HandleResponse);
}

function addEvent(event) {
    const requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(event)
    };
    return fetch('/event/add', requestOptions).then(HandleResponse);
}

function deleteEvent(id) {
    const requestOptions = {
        method: 'DELETE',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(id)
    };
    return fetch('/event/delete', requestOptions).then(HandleResponse);
}

function updateEvent(id, event) {
    const requestOptions = {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({id, event})
    };

    return fetch('/event/edit', requestOptions).then(HandleResponse);
}

export const eventService = {
    getAllEvents,
    getEventById,
    addEvent,
    deleteEvent,
    updateEvent
};
