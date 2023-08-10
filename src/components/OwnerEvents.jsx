import "./CSS/EventBox.css";
import "./CSS/Ticket.css";
import { API, graphqlOperation, Storage } from "aws-amplify";
import { listEvents } from "../graphql/queries";
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { withAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';


const OwnerEvents = ({ user }) => {

  const cloudFrontUrl = 'https://d1vjh7v19d1zbm.cloudfront.net';
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);

  const fetchEvents = async () => {
    try {
      const eventsData = await API.graphql(graphqlOperation(listEvents));
      const eventsList = eventsData.data.listEvents.items;
      const filterEventsList = eventsList.filter(
        (event) => event.userID === user.username
      );
      const eventsWithImages = await Promise.all(
        filterEventsList.map(async (event) => {
          const imagePath = `${event.bannerEvent}`;
          const imageUrl = `${cloudFrontUrl}/${imagePath}`;
          event.imageUrl = imageUrl;
          return event;
        })
      );
      setEvents(eventsWithImages);
    } catch (error) {
      console.log("", error);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  function handleButtonClick(event) {
    navigate(`/events/${event.id}`);
  }

  return (
    <div id="boxes">
      <h1 className="title">Mis Eventos</h1>
      <div className="container" style={{ display: "flex", flexWrap: "wrap" }}>
        {events.map((event) => (
          <div
            key={event.id}
            className="box"
            style={{ flexBasis: "25%", marginBottom: "20px" }}
          >
            <img src={event.imageUrl} alt={event.nameEvent} />
            <h3>{event.nameEvent}</h3>
            <button onClick={() => handleButtonClick(event)} className="btnBuy">
              <i className="icon-ticket"></i>Acceder
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
export default withAuthenticator(OwnerEvents);
