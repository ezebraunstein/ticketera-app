import './CSS/Event.css';
import { useNavigate, useParams } from 'react-router-dom';
import { API, graphqlOperation } from 'aws-amplify';
import { getEvent } from '../graphql/queries';
import { listTypeTickets } from '../graphql/queries';
import { listTickets } from '../graphql/queries';
import { useState, useEffect } from 'react';
import { getRRPPEvent } from '../graphql/queries';



const RRPPEvent = () => {

  //CLOUDFRONT URL
  const cloudFrontUrl = 'https://d1vjh7v19d1zbm.cloudfront.net';

  //PARAMS
  const { rrppEventId } = useParams();
  const [eventData, setEventData] = useState(null);
  const [typeTickets, setTypeTickets] = useState([]);

  //NAVIGATE
  const navigate = useNavigate();

  useEffect(() => {
    fetchRRPPEvent();
  }, [rrppEventId]);

  // const fetchRRPPEvent = async () => {
  //     try {
  //         const rrppEventResult = await API.graphql(
  //             graphqlOperation(getRRPPEvent, { id: rrppEventId })
  //         );
  //         const rrppEvent = rrppEventResult.data.getRRPPEvent;
  //         const eventId = rrppEvent.Event.id;
  //         fetchEventData(eventId);
  //     } catch (error) {
  //         console.error("Error fetching RRPP event:", error);
  //     }
  // };

  const fetchRRPPEvent = async () => {
    try {
      const rrppEventResult = await API.graphql(
        graphqlOperation(getRRPPEvent, { id: rrppEventId })
      );
      const rrppEvent = rrppEventResult.data.getRRPPEvent;
      const eventId = rrppEvent.Event.id;
      const typeCounts = await fetchTicketsAndCountByType(rrppEventId); // Add 'await' here
      await fetchEventData(eventId, typeCounts);
    } catch (error) {
      console.error("Error fetching RRPP event:", error);
    }
  };

  const fetchEventData = async (eventId, typeCounts) => { // Add 'typeCounts' here
    try {
      const eventResult = await API.graphql(
        graphqlOperation(getEvent, { id: eventId })
      );
      const event = eventResult.data.getEvent;
      const imagePath = `${event.bannerEvent}`;
      const imageUrl = `${cloudFrontUrl}/${imagePath}`;
      event.imageUrl = imageUrl;
      setEventData(event);
      fetchTypeTickets(eventId, typeCounts); // Pass 'typeCounts' here
    } catch (error) {
      console.error("Error fetching event:", error);
    }
};

  const fetchTicketsAndCountByType = async (rrppEventId) => {
    try {
      const ticketsData = await API.graphql(graphqlOperation(listTickets, {
        filter: { rrppeventID: { eq: rrppEventId } }
      }));
      const ticketsList = ticketsData.data.listTickets.items;
      let typeCounts = {}; // Initialize it as an empty object
      ticketsList.forEach((ticket) => {
        typeCounts[ticket.typeticketID] = (typeCounts[ticket.typeticketID] || 0) + 1;
      });
      debugger;
      return typeCounts;
    } catch (error) {
      console.error("Error fetching tickets:", error);
    }
  };



  // const fetchTypeTickets = async (eventId) => {
  //     try {
  //         const typeTicketsData = await API.graphql(graphqlOperation(listTypeTickets, {
  //             filter: { eventID: { eq: eventId } }
  //         }));
  //         const typeTicketsList = typeTicketsData.data.listTypeTickets.items;
  //         setTypeTickets(typeTicketsList);
  //     } catch (error) {
  //         console.error("Error fetching type tickets:", error);
  //     }
  // };

  const fetchTypeTickets = async (eventId, typeCounts) => {
    try {
      debugger;
      const typeTicketsData = await API.graphql(graphqlOperation(listTypeTickets, {
        filter: { eventID: { eq: eventId } }
      }));
      const typeTicketsList = typeTicketsData.data.listTypeTickets.items.map((typeTicket) => ({
        ...typeTicket,
        count: typeCounts[typeTicket.id] || 0
      }));
      setTypeTickets(typeTicketsList);
    } catch (error) {
      console.error("Error fetching type tickets:", error);
    }
  };


  // const renderTypeTickets = () => {
  //     return typeTickets.map((typeTicket) => (
  //         <div>
  //             <br />
  //             <div key={typeTicket.id} class="ticket-container">
  //                 <div class="ticket-column">
  //                     <h2 class="ticket-text">{typeTicket.nameTT}</h2>
  //                 </div>
  //                 <div class="ticket-column">
  //                     <h2 class="ticket-text">${typeTicket.priceTT}</h2>
  //                 </div>
  //                 <div class="ticket-column">
  //                     <h2 class="ticket-text">Cantidad {typeTicket.quantityTT}</h2>
  //                 </div>
  //             </div>
  //         </div>
  //     ));
  // };

  const renderTypeTickets = () => {
    return typeTickets.map((typeTicket) => (
      <div>
        <br />
        <div key={typeTicket.id} class="ticket-container">
          <div class="ticket-column">
            <h2 class="ticket-text">{typeTicket.nameTT}</h2>
          </div>
          <div class="ticket-column">
            <h2 class="ticket-text">${typeTicket.priceTT}</h2>
          </div>
          <div class="ticket-column">
            <h2 class="ticket-text">Cantidad vendida: {typeTicket.count}</h2>
          </div>
        </div>
      </div>
    ));
  };


  const copyEventLinkToClipboard = async () => {
    const link = `http://localhost:3000/buy-ticket/${eventData.id}/${rrppEventId}`;
    try {
      await navigator.clipboard.writeText(link);
      alert('Link copied to clipboard');
    } catch (err) {
      console.error('Failed to copy link: ', err);
    }
  };


  if (!eventData) {
    return <div></div>;
  }

  return (
    <div className="content-wrapper">
      <main>
        <div className="eventClass">
          <div>
            <button type="button" class="btn-Buy" onClick={copyEventLinkToClipboard}>
              Copiar Link
            </button>
          </div>
          <div>
            <h4 className="eventTitles">{eventData.nameEvent}</h4>
          </div>
          <br />
          <div>
            <h4 className="eventTitles">{eventData.descriptionEvent}</h4>
          </div>
          <br />
          <div>
            <h4 className="eventTitles">{(eventData.startDateE).slice(0, 10)}</h4>
          </div>
          <br />
          <div>
            <h4 className="eventTitles">{eventData.nameLocationEvent}</h4>
          </div>
          <br />
          <div>
            <h4 className="imageTitles"><img className="imgEvent" src={eventData.imageUrl} alt="" width="100%" height="300" /></h4>
          </div>
          <br />
          {renderTypeTickets()}
          <br />
          <br />
          <br />
        </div>
      </main>
    </div>
  );
};

export default RRPPEvent;
