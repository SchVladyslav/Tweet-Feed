import React, { Component } from 'react';
import { eventService } from '../../../services/event.service';
import { Preloader } from '../../common';
import EventsItem from '../eventsItem.jsx/eventsItem';
import './eventsList.scss';

class EventsList extends Component {

    state = {
        events: null
    }

    componentDidMount() {
        const events = eventService.getAllEvents().then(events => {
            this.setState({ events });
        });
    }

    render() {
        const { events } = this.state;
        return (
            <div className="events-list">
                {events &&
                    <ul className="events-list__events">
                        {events.map(event =>
                            <EventsItem
                                event={event}
                                key={event.id}
                            />
                        )}
                    </ul>}
                {!events && <Preloader />}
            </div>
        )
    }

}

export default EventsList;