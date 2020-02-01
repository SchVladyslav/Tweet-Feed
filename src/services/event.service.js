import { HandleResponse } from "../helpers/HandleResponse";

function getEventId(id) {
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(id)
    }
    return fetch(`/events/${id}`, requestOptions).then(HandleResponse);
};


function addEvent(event) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(event)
    }
    return fetch('/events/add', requestOptions).then(HandleResponse);
};

function deleteEvent(id){
    const requestOptions = {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(id)
    }
    return fetch(`/events/${id}`, requestOptions).then(HandleResponse);
}

export const eventService = {
    getEventId,
    addEvent,
    deleteEvent
};