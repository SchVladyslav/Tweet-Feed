import React, {Component} from 'react';
import './Events.scss';
import { Button } from '../../common';
import AddEventForm from '../../forms/addEventForm/AddEventForm';
import EventsList from '../eventsList/eventsList';

class Events extends Component {

    state = {
        isModalShowed: false
    }

    showModalHandler = () => this.setState({isModalShowed: !this.state.isModalShowed});

    render() {
        const {isModalShowed} = this.state;
        return(
            <div className="events">
                <div className="events__add-btn">
                <Button
                buttonColorScheme="primary"
                onClick={this.showModalHandler}
                >
                    Add Event
                    </Button>
                    </div>
                <AddEventForm
                isModalOpen={isModalShowed}
                toggleModalVisibility={this.showModalHandler}
                />
                <EventsList/>
            </div>
        )
    }
}

export default Events;