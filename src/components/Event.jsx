import './CSS/Event.css';
import { useNavigate, useParams } from 'react-router-dom';
import { API, graphqlOperation } from 'aws-amplify';
import { getEvent } from '../graphql/queries';
import { listTypeTickets } from '../graphql/queries';
import { useState, useEffect } from 'react';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { GoogleMap, LoadScriptNext, MarkerF } from "@react-google-maps/api";


const Event = () => {

  //CLOUDFRONT URL
  const cloudFrontUrl = 'https://d1vjh7v19d1zbm.cloudfront.net';

  //PARAMS
  const { eventId } = useParams();
  const [eventData, setEventData] = useState(null);
  const [typeTickets, setTypeTickets] = useState([]);

  //NAVIGATE
  const navigate = useNavigate();

  //API GOOGLE MAPS
  const [mapsApiLoaded, setMapsApiLoaded] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(null);

  useEffect(() => {
    setMapsApiLoaded(true);
  }, []);

  useEffect(() => {
    if (eventData && eventData.locationEvent) {
      const locationEvent = JSON.parse(eventData.locationEvent);
      setSelectedLocation(locationEvent);
    }
  }, [eventData]);

  useEffect(() => {
    fetchEventData();
  }, [eventId]);

  const fetchEventData = async () => {
    try {
      const eventResult = await API.graphql(
        graphqlOperation(getEvent, { id: eventId })
      );
      const event = eventResult.data.getEvent;
      const imagePath = `${event.bannerEvent}`;
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
            <h2 class="ticket-text">Cantidad {typeTicket.quantityTT}</h2>
          </div>
        </div>
      </div>
    ));
  };

  if (!eventData) {
    return <div></div>;
  }

  const handleEditEvent = () => {
    navigate(`/edit-event/${eventId}`);
  };
  debugger;
  return (
    <div className="content-wrapper">
      <main>
        <div className="eventClass">
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
            <h4 className="imageTitles"><img className="imgEvent" src={eventData.imageUrl} alt="" width="100%" height="300" /></h4>
          </div>
          <br />
          <div>
            <h4 className="eventTitles">{eventData.nameLocationEvent}</h4>
          </div>
          <div>
            <h4 className="eventTitles"></h4>
            <br />
            {mapsApiLoaded && (
              <LoadScriptNext
                googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS}
                libraries={["places"]}
                onLoad={() => setMapsApiLoaded(true)}>
                <GoogleMap
                  mapContainerStyle={{
                    width: "100%",
                    height: "300px",
                  }}
                  zoom={17}
                  center={selectedLocation || { lat: -34.397, lng: 150.644 }}
                >
                  {selectedLocation && (
                    <MarkerF position={{ lat: selectedLocation.lat, lng: selectedLocation.lng }} />
                  )}
                </GoogleMap>
              </LoadScriptNext>
            )}
          </div>
          <br />
          {renderTypeTickets()}
          <br />
          <div>
            <button className="btn-Buy" onClick={handleEditEvent}>
              Editar Evento
              <FontAwesomeIcon className="editIcon" icon={faEdit} />
            </button>
          </div>
          <br />
          <br />
        </div>
      </main>
    </div>
  );
};

export default Event;
