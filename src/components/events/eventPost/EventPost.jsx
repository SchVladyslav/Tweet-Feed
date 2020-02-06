import React, { Component } from "react";
import { eventService } from '../../../services/event.service';
import { Preloader, Button } from "../../common";
import {withRouter} from 'react-router';
import "./EventPost.scss";

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
            <>
            <h2 className="event-page__title">Event Page</h2>
            <div className="event-page">
                {event ?
                    <>
                    <div className="event-page__info">
                        <h3 className="events-item__title">{event.name}</h3>
                        <p className="events-item__text">Date: {event.data}</p>
                        {event.isFullDayEvent ?
                            <strong style={{color: "red"}}>FULL DAY EVENT</strong>
                            :
                            <>
                                <p className="events-item__text">Start Time: {event.startTime}</p>
                                <p className="events-item__text">End Time: {event.endTime}</p>
                            </>
                        }
                        </div>
                        <div className="event-page__btns">
                            <Button
                                buttonColorScheme="primary"
                                buttonSize="small"
                                className="btn-control"
                            >
                                Edit event
                            </Button>
                            <Button
                                buttonColorScheme="danger"
                                buttonSize="small"
                                onClick={() => this.onDeleteEventHandler(event.id)}
                                className="btn-control"
                            >
                                Delete event
                            </Button>
                        </div>
                    </>
                    : <Preloader />}
            </div>
            </>
        )
    }
}

export default withRouter(EventPost);


