import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { API, graphqlOperation } from 'aws-amplify';
import { getEvent } from '../graphql/queries';
import { listTypeTickets } from '../graphql/queries';
import ModalCheckout from './ModalCheckout';
import stripeCheckout from './CheckoutStripe';
//import mercadopagoCheckout from './CheckoutMercadoPago';
import { GoogleMap, LoadScriptNext, MarkerF } from "@react-google-maps/api";
import { CircularProgress } from '@mui/material';

const BuyEvent = () => {

  //CLOUDFRONT URL
  const cloudFrontUrl = 'https://d1vjh7v19d1zbm.cloudfront.net';

  //PARAMS
  const { eventId, rrppEventId } = useParams();
  const [eventData, setEventData] = useState(null);
  const [typeTickets, setTypeTickets] = useState([]);
  const [cart, setCart] = useState([]);
  //const [cartVisible, setCartVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const handleModalSubmit = async (data) => {

    setIsSubmitting(true);
    debugger;
    await stripeCheckout(cart, data, eventData);
    //await mercadopagoCheckout(data, path, cart, eventData);

  };

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
    return typeTickets.map((typeTicket) => {
      const cartItem = cart.find((item) => item.id === typeTicket.id);
      const quantity = cartItem ? cartItem.selectedQuantity : 0;

      return (
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
              <div class="quantity-container">
                <button type="button" class="btn-Remove" onClick={() => addToCart(typeTicket, -1)}><i class="fas fa-minus"></i></button>
                <span class="ticket-text">&nbsp;{quantity}&nbsp;</span>
                <button type="button" class="btn-Add" onClick={() => addToCart(typeTicket, 1)}><i class="fas fa-plus"></i></button>
              </div>
            </div>
          </div>
        </div>
      );
    });
  };

  const addToCart = (typeTicket, quantity) => {
    const existingItemIndex = cart.findIndex((item) => item.id === typeTicket.id);

    if (existingItemIndex !== -1) {
      const updatedCart = [...cart];
      updatedCart[existingItemIndex].selectedQuantity += quantity;
      if (updatedCart[existingItemIndex].selectedQuantity <= 0) {
        updatedCart.splice(existingItemIndex, 1);
      }
      setCart(updatedCart);
    } else if (quantity > 0) {
      setCart([...cart, { ...typeTicket, selectedQuantity: quantity, rrppEventId: rrppEventId }]);
    }
  };

  if (!eventData) {
    return <div></div>;
  }

  return (
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
          <img className="imgEvent" src={eventData.imageUrl} alt="" width="60%" height="300px" />
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
      <div>
        {renderTypeTickets()}
      </div>
      <br />
      <ModalCheckout handleModalSubmit={handleModalSubmit} />
      <br />
      <br />
      {isSubmitting && (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0, 0, 0, 0.9)', zIndex: 999 }}>
          <CircularProgress />
        </div>
      )}
      {rrppEventId && (
        <div>
          <p>Estás usando el link de: {rrppEventId}</p>
        </div>
      )}
    </div>
  );
};

export default BuyEvent;
