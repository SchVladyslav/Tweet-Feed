import React, { Component } from "react";
import { eventService } from '../../../services/event.service';
import { Preloader, Button } from "../../common";
import {withRouter} from 'react-router';
import EventForm from "../../forms/EventForm/EventForm";
import {authService} from "../../../services/auth.service";
import {Role} from "../../../helpers/FakeAPI/Role";

class EventPost extends Component {

    state = {
        event: null,
        isModalShowed: false
    };

    componentDidMount() {
        const id = this.props.match.params.id;
        eventService.getEventById(id).then(event => {
            this.setState({ event });
        });
    }

    onDeleteEventHandler = id => {
        eventService.deleteEvent(id).then(() => {
            this.props.history.push('/events');
        });
    };

    showModalHandler = () => this.setState({isModalShowed: !this.state.isModalShowed});

    render() {
        const { event, isModalShowed } = this.state;
        return (
            <div className="event-page">
                {event ?
                    <>
                        <h3 className="events-item__title">{event.name}</h3>
                        <p className="events-item__text">Date: {event.date}</p>
                        {event.isFullDayEvent ?
                            <strong>FULL DAY EVENT</strong>
                            :
                            <>
                                <p className="events-item__text">Start Time: {event.startTime}</p>
                                <p className="events-item__text">End Time: {event.endTime}</p>
                            </>
                        }
                        {authService.currentUser.role === Role.Admin &&
                        <div className="event-page__btns">
                            <Button
                                buttonColorScheme="primary"
                                buttonSize="small"
                                onClick={this.showModalHandler}
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
                        </div> }
                        <EventForm
                            isModalOpen={isModalShowed}
                            toggleModalVisibility={this.showModalHandler}
                            type="edit"
                            event={event}
                        />
                    </>
                    : <Preloader />}
            </div>
        )
    }
}

export default withRouter(EventPost);


