import React, { Component } from "react";
import { eventService } from '../../../services/event.service';
import { Preloader, Button } from "../../common";
import {withRouter} from 'react-router';

class EventPost extends Component {

    state = {
        event: null
    }

    componentDidMount() {
        const id = this.props.match.params.id;
        eventService.getEventById(id).then(event => {
            this.setState({ event });
        });
    }

    onDeleteEventHandler = id => {
        eventService.deleteEvent(id);
    }

    render() {
        const { event } = this.state;
        return (
            <div className="event-page">
                <h2>Event Page</h2>
                {event ?
                    <>
                        <h3 className="events-item__title">{event.name}</h3>
                        <p className="events-item__text">Date: {event.data}</p>
                        {event.isFullDayEvent ?
                            <strong>FULL DAY EVENT</strong>
                            :
                            <>
                                <p className="events-item__text">Start Time: {event.startTime}</p>
                                <p className="events-item__text">End Time: {event.endTime}</p>
                            </>
                        }
                        <div className="event-page__btns">
                            <Button
                                buttonColorScheme="primary"
                                buttonSize="small"
                            >
                                Edit event
                            </Button>
                            <Button
                                buttonColorScheme="danger"
                                buttonSize="small"
                                onClick={() => this.onDeleteEventHandler(event.id)}
                            >
                                Delete event
                            </Button>
                        </div>
                    </>
                    : <Preloader />}
            </div>
        )
    }
}

export default withRouter(EventPost);


