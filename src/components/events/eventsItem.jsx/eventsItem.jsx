import React from 'react';
import './eventsItem.scss';
import { Button } from '../../common';
import { Redirect } from 'react-router';
import { NavLink } from 'react-router-dom';

const EventsItem = props => {
    const { event } = props;
    return (
        <li className="events-item">
            <h3 className="events-item__title">{event.name}</h3>
            <p className="events-item__text">Date: {event.date}</p>
            {event.isFullDayEvent ?
                <strong style={{color: "red"}}>FULL DAY EVENT</strong>
                :
                <>
                    <p className="events-item__text">Start Time: {event.startTime}</p>
                    <p className="events-item__text">End Time: {event.endTime}</p>
                </>
            }
            <NavLink to={`/event/${event.id}`}>
                <div className="events__btn-view">
                    <Button
                        buttonColorScheme="success"
                        buttonSize="small"
                    >View event
        </Button>
                </div>
            </NavLink>
        </li >
    )
};

export default EventsItem;

