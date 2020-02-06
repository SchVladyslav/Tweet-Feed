import React from 'react';
import './EventsItem.scss';
import {Button} from '../../common';
import {NavLink} from 'react-router-dom';

const EventsItem = props => {
    const {event} = props;
    return (
        <li className="events-item">
            <h3 className="events-item__title">{event.name}</h3>
            <p className="events-item__text">
                <strong>Date: </strong> {event.date}
            </p>
            {event.isFullDayEvent ?
                <strong
                    style={{
                        color: 'blue', fontSize: 21, marginBottom: 10
                    }}>
                    FULL DAY EVENT</strong>
                :
                <>
                    <p className="events-item__text">
                        <strong>Start Time: </strong> {event.startTime}
                    </p>
                    <p className="events-item__text">
                        <strong>End Time: </strong> {event.endTime}
                    </p>
                </>
            }
            <NavLink to={`/event/${event.id}`}>
                <Button
                    buttonColorScheme="success"
                    buttonSize="small"
                >View event</Button>
            </NavLink>
        </li>
    )
};

export default EventsItem;

