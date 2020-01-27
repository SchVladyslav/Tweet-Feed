import React from "react";
import Layout from "../../Layout/Layout";
import Button from "../../common/button/Button"
import Input from "../../common/input/Input"
import "./EventsModal.scss"
import Checkbox from "../../common/checkbox/Checkbox"

let mainDiv = React.createRef();
let modalDivEvents;
let timeStart = React.createRef();
let timeEnd = React.createRef();


function checkBox() {

    timeStart.current.readOnly = "true";

}

function ModalClose(props) {
    modalDivEvents.current.className = "modalhidden";
}

function Modal(props) {
    modalDivEvents = props.modalDivEvents;
    return (
        <div className="modaldiv" ref={mainDiv}>
            <div>
                <Input
                    className="modelinput"
                    ref={timeStart}
                />
                <Input
                    className="modelinput"
                    type="date"
                />
                <Input
                    className="modelinput"
                    type="time"

                />
                <Input
                    className="modelinput"
                    type="time"
                    ref={timeEnd}
                />
            </div>
            <Checkbox handleCheckboxChange={checkBox} className="modalcheckbox"></Checkbox>
            <Button className="modalsubmitbutton" onClick={ModalClose}>Submit</Button>
        </div>
    );
}

export default Modal;