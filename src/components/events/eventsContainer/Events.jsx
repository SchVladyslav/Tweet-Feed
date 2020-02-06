import React, {Component} from 'react';
import './Events.scss';
import {Button, Preloader} from '../../common';
import EventForm from '../../forms/EventForm/EventForm';
import EventsList from '../eventsList/EventsList';
import {eventService} from "../../../services/event.service";
import {authService} from "../../../services/auth.service";
import {Role} from "../../../helpers/FakeAPI/Role";

class Events extends Component {

    state = {
        events: null,
        isModalShowed: false
    };

    componentDidMount() {
        eventService.getAllEvents().then(events => {
            this.setState({events});
        });
    }

    updateEventsState = events => this.setState({events});

    showModalHandler = () => this.setState({isModalShowed: !this.state.isModalShowed});

    render() {
        const {events, isModalShowed} = this.state;

        return (
            <>
                <div className="events">
                    {authService.currentUser.role === Role.Admin &&
                    <div className="events__add-btn">
                        <Button
                            buttonColorScheme="primary"
                            onClick={this.showModalHandler}
                        >
                            Add Event
                        </Button>
                    </div>}
                    {events ?
                        <EventsList
                            events={events}
                        />
                        : <Preloader/>
                    }
                </div>
                <EventForm
                    isModalOpen={isModalShowed}
                    toggleModalVisibility={this.showModalHandler}
                    updateState={this.updateEventsState}
                    type="add"
                />
            </>
        )
    }
}

export default Events;
