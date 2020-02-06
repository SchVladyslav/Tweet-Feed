import React from 'react';
import { Preloader } from '../../common';
import EventsItem from '../eventsItem/EventsItem';
import './EventsList.scss';

function EventsList(props) {
        return (
            <div className="events-list">
                {props.events ?
                    <ul className="events-list__events">
                        {props.events.map(event =>
                            <EventsItem
                                event={event}
                                key={event.id}
                            />
                        )}
                    </ul>
                : <Preloader />}
            </div>
        )
}

export default EventsList;
