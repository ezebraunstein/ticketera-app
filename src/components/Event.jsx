import './Event.css';
import { useNavigate, useParams } from 'react-router-dom';
import { API, graphqlOperation } from 'aws-amplify';
import { Storage } from "aws-amplify";
import { getEvent } from '../graphql/queries';
import { listTypeTickets } from '../graphql/queries';
import { useState, useEffect } from 'react';
//import Swal from 'sweetalert2';
//import { deleteEvent, deleteTypeTicket } from "../graphql/mutations";
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';



const Event = () => {

  const cloudFrontUrl = 'https://d3bs2q3jr96pao.cloudfront.net';
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
        <h4 className="eventTitles"> Nombre del evento: </h4> <span className="eventSpan"> {eventData.nameEvent}</span>
      </div>
      <div>
        <h4 className="eventTitles"> Descripción: </h4> <span className="eventSpan"> {eventData.descriptionEvent}</span>
      </div>
      <div>
        <h4 className="eventTitles"> Fecha de Inicio: </h4> <span className="eventSpan"> {(eventData.startDateE).slice(0, 10)}</span>
      </div>
      {/* <div>
        <h4 className="eventTitles"> Fecha de Fin: </h4> <span className="eventSpan"> {(eventData.endDateE).slice(0, 10)}</span>
      </div> */}
      <div>
        <h4 className="imageTitles"> Imagen de Banner: </h4> <img className="imgEvent" src={eventData.imageUrl} alt="" width="300px" height="300px" />
      </div>
      <br />
      <button className="btn btn-Edit" onClick={handleEditEvent}>
        Editar Evento
        <FontAwesomeIcon className="editIcon" icon={faEdit} />
      </button>
      {/* <button className="btn btn-primary" onClick={handleDeleteEvent}>Eliminar evento</button> */}
      {renderTypeTickets()}
    </div>
  );
};

export default Event;
