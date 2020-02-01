import React, {Component} from "react";
import {Button, Input, Checkbox, Modal} from "../../common"
import "./AddEventForm.scss"
import {eventService} from "../../../services/event.service";

class AddEventForm extends Component {

    state = {
        event: null
    }

    addEventSubmitHandler = event => {
        event.preventDefault();
        eventService.addEvent(this.state.event);
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
        const {isModalOpen, toggleModalVisibility} = this.props; 
        
        return(
            <Modal
            modalTitle="Add Event"
            toggleModalVisibility={toggleModalVisibility}
            isModalOpen={isModalOpen}
            >
                <form
                onChange={this.onInputsChangeHandler}
                onSubmit={this.addEventSubmitHandler}
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

export default AddEventForm;
