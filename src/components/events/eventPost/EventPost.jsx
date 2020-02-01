import React, { Component } from "react";
import {eventService} from '../../../services/event.service';

class EventPost extends Component {

    state = {
        event: null
    }

    componentDidMount() {
        eventService.getEventId(1).then(event => {
            this.setState({event});
            console.log('Event from state:',this.state.event);
        });
    }

    render() {
        const {event} = this.state;
        return(
            <div>
                <h2>Event Page</h2>
        <p>{event && event.name}</p>
            </div>
        )
    }
}

export default EventPost;

