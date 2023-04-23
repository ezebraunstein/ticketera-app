import './Event.css';
import { useParams } from 'react-router-dom';
import { API, graphqlOperation } from 'aws-amplify';
import { Storage } from "aws-amplify";
import { getEvent } from '../graphql/queries';
import { useState, useEffect } from 'react';
import { listTypeTickets } from '../graphql/queries';
import CreateTypeTicket from './CreateTypeTicket';



const EditEvent = () => {

  const cloudFrontUrl = 'https://d3bs2q3jr96pao.cloudfront.net';
  const { eventId } = useParams();
  const [eventData, setEventData] = useState(null);
  const [typeTickets, setTypeTickets] = useState([]);

  const fetchEventData = async () => {
    try {
      const eventResult = await API.graphql(
        graphqlOperation(getEvent, { id: eventId })
      );
      const event = eventResult.data.getEvent;
      const imagePath = `public/${event.bannerEvent}`;
      const imageUrl = `${cloudFrontUrl}/${imagePath}`;
      event.imageUrl = imageUrl;
      setEventData(event);
      fetchTypeTickets();
    } catch (error) {
      console.error("Error fetching event:", error);
    }
  };

  const fetchTypeTickets = async () => {
    try {
      const typeTicketsData = await API.graphql(graphqlOperation(listTypeTickets, {
        filter: { eventID: { eq: eventId } }
      }));
      const typeTicketsList = typeTicketsData.data.listTypeTickets.items;
      setTypeTickets(typeTicketsList);
    } catch (error) {
      console.error("Error fetching type tickets:", error);
    }
  };

  const renderTypeTickets = () => {
    return typeTickets.map((typeTicket) => (
      <div key={typeTicket.id}>
        <h4>{typeTicket.nameTT}</h4>
        <p>{typeTicket.descriptionTT}</p>
        <p>Price: {typeTicket.priceTT}</p>
        <p>Quantity: {typeTicket.quantityTT}</p>
      </div>
    ));
  };

  const handleTypeTicketCreated = (newTypeTicket) => {
    setTypeTickets((prevTypeTickets) => [...prevTypeTickets, newTypeTicket]);
  };

  useEffect(() => {
    fetchEventData();
  }, [eventId]);

  if (!eventData) {
    return <div></div>;
  }
  return (
    <div className="eventClass">
      <div>
        <h3 className="eventTitles"> Nombre del evento: </h3> <span> {eventData.nameEvent}</span>
      </div>
      <div>
        <h3 className="eventTitles"> Descripción: </h3> <span> {eventData.descriptionEvent}</span>
      </div>
      <div>
        <h3 className="eventTitles"> Fecha de Inicio: </h3> <span> {(eventData.startDateE).slice(0, 10)}</span>
      </div>
      {/* <div>
        <h3 className="eventTitles"> Fecha de Fin: </h3> <span> {(eventData.endDateE).slice(0, 10)}</span>
      </div> */}
      <div>
        <h3 className="imageTitles"> Imagen de Banner: </h3> <img src={eventData.imageUrl} alt="" width="300px" height="300px" />
      </div>
      {renderTypeTickets()}
      <CreateTypeTicket eventId={eventId} onTypeTicketCreated={handleTypeTicketCreated} />
    </div>
  );
};

export default EditEvent;
