import './Event.css';
import { useNavigate, useParams } from 'react-router-dom';
import { API, graphqlOperation } from 'aws-amplify';
import { Storage } from "aws-amplify";
import { getEvent } from '../graphql/queries';
import { listTypeTickets } from '../graphql/queries';
import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { deleteEvent, deleteTypeTicket } from "../graphql/mutations";


const Event = () => {

  const { eventId } = useParams();
  const [eventData, setEventData] = useState(null);
  const [typeTickets, setTypeTickets] = useState([]);
  const navigate = useNavigate();

  const fetchEventData = async () => {
    try {
      const eventResult = await API.graphql(
        graphqlOperation(getEvent, { id: eventId })
      );
      const event = eventResult.data.getEvent;
      const imageUrl = await Storage.get(event.bannerEvent, {
        expires: 60,
      });
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

  // const handleDeleteEvent = async () => {
  //   try {
  //     // 1. Fetch TypeTickets associated with the event
  //     const typeTicketsData = await API.graphql(
  //       graphqlOperation(listTypeTickets, {
  //         filter: { eventID: { eq: eventId } },
  //       })
  //     );
  //     const typeTickets = typeTicketsData.data.listTypeTickets.items;

  //     // 2. Delete associated TypeTickets
  //     const deleteTypeTicketsPromises = typeTickets.map((typeTicket) =>
  //       API.graphql(
  //         graphqlOperation(deleteTypeTicket, { input: { id: typeTicket.id } })
  //       )
  //     );
  //     await Promise.all(deleteTypeTicketsPromises);

  //     // 3. Delete Event
  //     await API.graphql(
  //       graphqlOperation(deleteEvent, { input: { id: eventId } })
  //     );

  //     // 4. Delete related S3 objects
  //     const bannerKey = `events/${eventId}/banner`;
  //     const miniBannerKey = `events/${eventId}/miniBanner`;
  //     await Storage.remove(bannerKey);
  //     await Storage.remove(miniBannerKey);

  //     // 5. Navigate to the home page
  //     navigate('/');
  //   } catch (error) {
  //     console.error("Error deleting event:", error);
  //   }
  // };


  useEffect(() => {
    fetchEventData();
  }, [eventId]);

  if (!eventData) {
    return <div></div>;
  }

  const handleEditEvent = () => {
    navigate(`/edit-event/${eventId}`);
  };

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
      <div>
        <h3 className="eventTitles"> Fecha de Fin: </h3> <span> {(eventData.endDateE).slice(0, 10)}</span>
      </div>
      <div>
        <h3 className="imageTitles"> Imagen de Banner: </h3> <img src={eventData.imageUrl} alt="" width="300px" height="300px" />
      </div>
      <button className="btn btn-primary" onClick={handleEditEvent}>Edit Event</button>
      {/* <button className="btn btn-primary" onClick={handleDeleteEvent}>Eliminar evento</button> */}
      {renderTypeTickets()}
    </div>
  );
};

export default Event;
