import React, { useState } from "react";
import Modal from "react-modal";
import { withAuthenticator } from '@aws-amplify/ui-react';
import { v4 as uuid } from "uuid";
import axios from "axios";
import './CSS/Event.css';
import './CSS/Modal.css';

Modal.setAppElement("#root");

const LinkEventModal = ({ user, onEventLinked }) => {

    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [eventId, setEventId] = useState("");

    const handleChange = (e) => {
        setEventId(e.target.value);
    };

    const handleModalSubmit = async (eventId) => {

        const rrppEventInput = {
            id: uuid(),
            rrppID: user.username,
            eventID: eventId
        };
        debugger;
        try {
            const response = await axios.post('https://gmq4wjgi4ajfxd5dg7rqitkixy0wxmxh.lambda-url.us-east-1.on.aws/', JSON.stringify({ rrppEventInput: rrppEventInput }), {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.status === 200) {
                onEventLinked();
            }
            console.log(response.data);

        } catch (error) {
            console.error(error);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        handleModalSubmit(eventId);
        setModalIsOpen(false);
    };

    return (
        <div>
            <br />
            <br />
            <br />
            <button type="button" class="btn-Buy" onClick={() => setModalIsOpen(true)}>Link Event</button>
            <Modal
                className="custom-modal"
                isOpen={modalIsOpen}
                onRequestClose={() => setModalIsOpen(false)}
                contentLabel="Input Modal"
            >
                <form onSubmit={handleSubmit}>
                    <div>
                        <input
                            className="form-control"
                            type="text"
                            id="eventId"
                            name="eventId"
                            value={eventId}
                            onChange={handleChange}
                            placeholder="Event ID"
                            required
                        />
                    </div>
                    <br />
                    <div class="btn-container">
                        <button type="button" class="btn-Modal-Back" onClick={() => setModalIsOpen(false)}>Cancel</button>
                        <button className="btn-Modal-Buy" type="submit" disabled={!eventId}>Link Event</button>
                    </div>
                </form>
            </Modal>
        </div>
    );
};

export default withAuthenticator(LinkEventModal);
