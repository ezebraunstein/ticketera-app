import './CSS/Event.css';
import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { API, graphqlOperation } from 'aws-amplify';
import { getEvent } from '../graphql/queries';
import { listTypeTickets } from '../graphql/queries';
import ModalCheckout from './ModalCheckout';
import stripeCheckout from './CheckoutStripe';
import mercadopagoCheckout from './CheckoutMercadoPago';
import { GoogleMap, LoadScript, MarkerF } from "@react-google-maps/api";

const Event = () => {

  //CLOUDFRONT URL
  const cloudFrontUrl = 'https://d3bs2q3jr96pao.cloudfront.net';

  //PARAMS
  const { eventId } = useParams();
  const [eventData, setEventData] = useState(null);
  const [typeTickets, setTypeTickets] = useState([]);
  const [cart, setCart] = useState([]);
  const [cartVisible, setCartVisible] = useState(false);

  //LOCATION PATH
  const location = useLocation();
  const path = location.pathname;

  //MODAL
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [dni, setDni] = useState('');

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
    setName(data.name);
    setSurname(data.surname);
    setEmail(data.email);
    setDni(data.dni);

    // localStorage.setItem('cart', JSON.stringify(cart));
    // localStorage.setItem('userData', JSON.stringify(data));

    await stripeCheckout(cart, path, data, eventData);
    //await mercadopagoCheckout(data, path, cart, eventData);

  };

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
                <span class="ticket-text"> Cantidad </span>
                <span class="ticket-text">&nbsp;{quantity} </span>
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
      setCart([...cart, { ...typeTicket, selectedQuantity: quantity }]);
    }
  };

  const renderCartDropdown = () => {
    if (!cartVisible) return null;
    debugger;

    return cart.map((item) => {
      const typeTicket = typeTickets.find(tt => tt.id === item.id);
      const quantity = typeTicket ? item.selectedQuantity : 0;

      return (
        <div key={item.id}>
          <h4>{item.nameTT}</h4>
          <p>Quantity: {quantity}</p>
          <p>Price: {item.priceTT * item.selectedQuantity}</p>
        </div>
      );
    });
  };

  const toggleCartVisibility = () => {
    setCartVisible(!cartVisible);
    const cartDropdown = document.querySelector('.cart-dropdown');
    cartDropdown.classList.toggle('visible');
  };

  if (!eventData) {
    return <div></div>;
  }

  return (
    <div className="eventClass">
      <div>
        <h4 className="eventTitles">{eventData.nameEvent}</h4>
      </div>
      <div>
        <h4 className="eventTitles">{eventData.descriptionEvent}</h4>
      </div>
      <div>
        <h4 className="eventTitles">{(eventData.startDateE).slice(0, 10)}</h4>
      </div>
      <div>
        <h4 className="imageTitles"></h4> <img src={eventData.imageUrl} alt="" width="100%" height="300px" />
      </div>
      <div>
        <h4 className="eventTitles"></h4>
        <br />
        {mapsApiLoaded && (
          <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS} libraries={["places"]}>
            <GoogleMap
              mapContainerStyle={{
                width: "100%",
                height: "300px",
              }}
              zoom={15}
              center={selectedLocation || { lat: -34.397, lng: 150.644 }}
            >
              {selectedLocation && (
                <MarkerF position={{ lat: selectedLocation.lat, lng: selectedLocation.lng }} />
              )}
            </GoogleMap>
          </LoadScript>
        )}
      </div>
      <div>
        {renderTypeTickets()}
      </div>
      {/* <div className="cart">
        <button type="button" class="btn btn-primary" onClick={toggleCartVisibility}>Cart</button>
        <div className="cart-dropdown">
          {renderCartDropdown()}
        </div>
      </div> */}
      <br />
      <ModalCheckout handleModalSubmit={handleModalSubmit} />
      <br />
    </div>
  );
};

export default Event;
