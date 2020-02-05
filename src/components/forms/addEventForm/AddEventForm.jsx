import React, {Component} from "react";
import {Button, Input, Checkbox, Modal} from "../../common"
import {eventService} from "../../../services/event.service";
import {withRouter} from 'react-router';
import "./AddEventForm.scss";

class AddEventForm extends Component {

    state = {
        event: null,
        isLoading: false
    }

    formSubmitHandler = (event, type) => {
        event.preventDefault();

        if (type === 'edit') {
            console.log(this.props.match.params.id);
            eventService.updateEvent(this.props.match.params.id);
        } else eventService.addEvent(this.state.event);
        this.props.toggleModalVisibility();
    }

    onInputsChangeHandler = event => {
        const {name, value} = event.target;

        this.setState(
            {
            event: {
                ...this.state.event,
                 [name]: value
                }
            });
    }

    render() {
        const {isModalOpen, toggleModalVisibility, type} = this.props; 
        
        return(
            <Modal
            modalTitle="Add Event"
            toggleModalVisibility={toggleModalVisibility}
            isModalOpen={isModalOpen}
            maxWidth="550px"
            >
                <form
                onChange={this.onInputsChangeHandler}
                onSubmit={event => this.formSubmitHandler(event, type)}
                >
                <Input
                    type="text"
                    name="name"
                />
                <Input
                    type="date"
                    name="date"
                />
                <Input
                    type="time"
                    name="startTime"
                />
                <Input
                    type="time"
                    name="endTime"
                />
            <Checkbox
             label="FullDay Event"
             name="isFullDayEvent"
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

export default withRouter(AddEventForm);
