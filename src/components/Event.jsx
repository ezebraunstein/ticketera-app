import { useNavigate, useParams } from 'react-router-dom';
import { API, graphqlOperation } from 'aws-amplify';
import { getEvent } from '../graphql/queries';
import { listTypeTickets } from '../graphql/queries';
import { useState, useEffect } from 'react';
import { GoogleMap, LoadScriptNext, MarkerF } from "@react-google-maps/api";
import CircularProgress from '@mui/material/CircularProgress';

const Event = () => {

  //CLOUDFRONT URL
  const cloudFrontUrl = 'https://d1vjh7v19d1zbm.cloudfront.net';
  //const cloudFrontUrl = 'https://d32bfav9oplhyr.cloudfront.net';

  //PARAMS
  const { eventId } = useParams();
  const [eventData, setEventData] = useState(null);
  const [typeTickets, setTypeTickets] = useState([]);
  const [loading, setLoading] = useState(true);


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
      setLoading(false);
    }
  };

  const fetchTypeTickets = async () => {
    try {
      const typeTicketsData = await API.graphql(graphqlOperation(listTypeTickets, {
        filter: { eventID: { eq: eventId } }
      }));
      const typeTicketsList = typeTicketsData.data.listTypeTickets.items;
      setTypeTickets(typeTicketsList);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching type tickets:", error);
      setLoading(false);
    }
  };

  const renderTypeTickets = () => {
    return typeTickets.map((typeTicket) => (
      <div className='eventClass'>
        <br />
        <div key={typeTicket.id} class="ticket-container">
          <div class="ticket-column">
            <h2 class="ticket-text">{typeTicket.nameTT}</h2>
          </div>
          <div class="ticket-column">
            <h2 class="ticket-text">${typeTicket.priceTT}</h2>
          </div>
          <div class="ticket-column">
            <h2 class="ticket-text">Disponibles:  {typeTicket.quantityTT}</h2>
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

  const redirectRRPP = () => {
    navigate(`/events/${eventId}/rrpp`);
  };

  if (loading) {
    return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0, 0, 0, 0.9)', zIndex: 999 }}>
      <CircularProgress />
    </div>
  }

  return (
    <main>
      <div className="eventClass">
        <div>
          <h4 className="eventName"> {eventData.nameEvent}</h4>
        </div>
        <div>
          <h4 className="eventDate"> {(eventData.startDateE).slice(0, 10)}</h4>
        </div>
        {eventData.descriptionEvent && (
          <div>
            <h4 className="eventDescription"> {eventData.descriptionEvent}</h4>
          </div>
        )}
        <div>
          <div style={{ display: "flex", padding: "10px" }}>
            <img className="imgEvent" src={eventData.imageUrl} />
            {mapsApiLoaded && (
              <LoadScriptNext
                googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS}
                libraries={["places"]}
                onLoad={() => setMapsApiLoaded(true)}>
                <GoogleMap
                  mapContainerStyle={{
                    width: "40%",
                    height: "300px",
                    marginLeft: "10px",
                    borderRadius: "10px"
                  }}
                  zoom={15}
                  center={selectedLocation || { lat: -34.397, lng: 150.644 }}
                >
                  {selectedLocation && (
                    <MarkerF position={{ lat: selectedLocation.lat, lng: selectedLocation.lng }} />
                  )}
                </GoogleMap>
              </LoadScriptNext>
            )}
          </div>
        </div>
        {renderTypeTickets()}
        <br />
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <button className="btnMain" onClick={handleEditEvent} style={{ marginRight: '50px' }}>
            Editar Evento
          </button>
          <button className="btnMain" onClick={redirectRRPP}>
            Ventas Públicas
          </button>
        </div>
        <br />
        <br />
      </div>
    </main>
  );
};

export default Event;
