import React from "react";
import Layout from "../../components/Layout/Layout";
import Modal from "../../components/events/modal/EventsModal";
import Button from "../../components/common/button/Button";
import ReactDOM from "react-dom";
import "./EventsPage.scss"
import EventPost from "../../components/events/eventPost/EventPost";


function EventsPage() {

  let modal = React.createRef();

  function ModalOpen() {
    modal.current.className = "modal";
  }

  return (
    <Layout>
      <div className="eventsPage">
        <div className="titleButton">
          <div>
            <p className="addEvent">Add your event</p>
          </div>
          <div>
            <div className="buttonAdd">
              <Button onClick={ModalOpen}>Add</Button> {/*button opem modal */}
            </div>
          </div>
        </div>
        <div className="main__section">
          <div ref={modal} className="modalhidden">
            <Modal modalDivEvents={modal} />
          </div>
        </div>
        <EventPost/>
      </div>
    </Layout>
  );
}

export default EventsPage;
