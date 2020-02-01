import { HandleResponse } from "../helpers/HandleResponse";

function getEventId(id) {
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(id)
    }
    return fetch(`/events/${id}`, requestOptions).then(HandleResponse);
};


export const eventService = {
    getEventId
};