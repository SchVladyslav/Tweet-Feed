import React, {Component} from "react";
import {Button, Input, Checkbox, Modal} from "../../common"
import {eventService} from "../../../services/event.service";
import {withRouter} from 'react-router';
import "./EventForm.scss";
import PropTypes from "prop-types";

class EventForm extends Component {

    state = {
        event: null
    };

    formSubmitHandler = (event, type) => {
        event.preventDefault();

        if (type === 'edit') {
            eventService.updateEvent(this.props.match.params.id, this.state.event).then(() => {
                this.props.history.push('/events');
            });
        } else eventService.addEvent(this.state.event).then(events => {
            this.props.updateState(events);
        });
        this.props.toggleModalVisibility();
    };

    onInputsChangeHandler = event => {
        const {name, value} = event.target;

        if (name !== 'isFullDayEvent') {
            this.setState(
                {
                    event: {
                        ...this.state.event,
                        [name]: value
                    }
                });
        }
    };

    onFullDayCheckboxHandler = event => {
        const {checked} = event.target;

            this.setState({
                event: {
                    ...this.state.event,
                    isFullDayEvent: checked
                }
            });
    };

    prepareEventDate = () => {
        const {event} = this.props;
        let eventDate;

        if (event) {
            const date = event.date.split('.').reverse();
            eventDate = date.join('-');
            return eventDate;
        }
    };

    render() {
        const {isModalOpen, toggleModalVisibility, type, event} = this.props;

        return (
            <Modal
                modalTitle={type === 'add' ? 'Add Event' : 'Edit event'}
                toggleModalVisibility={toggleModalVisibility}
                isModalOpen={isModalOpen}
                maxWidth="550px"
            >
                <form
                    onSubmit={event => this.formSubmitHandler(event, type)}
                    onChange={this.onInputsChangeHandler}
                >
                    <Input
                        type="text"
                        name="name"
                        defaultValue={type === 'edit' ? event.name : ''}
                        required={'required'}
                    />
                    <Input
                        type="date"
                        name="date"
                        defaultValue={type === 'edit' ? this.prepareEventDate() : ''}
                        required={'required'}
                    />
                    <Input
                        type="time"
                        name="startTime"
                        defaultValue={type === 'edit' ? event.startTime : ''}
                    />
                    <Input
                        type="time"
                        name="endTime"
                        defaultValue={type === 'edit' ? event.endTime : ''}
                    />
                    <Checkbox
                        label="FullDay Event"
                        name="isFullDayEvent"
                        defaultChecked={type === 'edit' && event.isFullDayEvent}
                        handleCheckboxChange={this.onFullDayCheckboxHandler}
                    />
                    <Button
                        buttonColorScheme="success"
                        type="submit"
                    >
                        Submit
                    </Button>
                </form>
            </Modal>
        )
    }
}

EventForm.propTypes = {
    isModalOpen: PropTypes.bool,
    toggleModalVisibility: PropTypes.func,
    type: PropTypes.string,
    event: PropTypes.object
};

export default withRouter(EventForm);
