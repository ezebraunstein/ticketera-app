import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { API, graphqlOperation } from 'aws-amplify';
import { getEvent } from '../graphql/queries';
import { listTypeTickets } from '../graphql/queries';
import ModalCheckout from './ModalCheckout';
import ticketCheckout from '../functions/CreateTicket';
import stripeCheckout from './CheckoutStripe';
import mercadopagoCheckout from './CheckoutMercadoPago';

const Event = () => {

  const { eventId } = useParams();
  const [eventData, setEventData] = useState(null);
  const [typeTickets, setTypeTickets] = useState([]);
  const [cart, setCart] = useState([]);
  const [cartVisible, setCartVisible] = useState(false);

  const location = useLocation();
  const path = location.pathname;

  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [dni, setDni] = useState('');
  const cloudFrontUrl = 'https://d3bs2q3jr96pao.cloudfront.net';

  const handleModalSubmit = async (data) => {
    setName(data.name);
    setSurname(data.surname);
    setEmail(data.email);
    setDni(data.dni);

    localStorage.setItem('cart', JSON.stringify(cart));
    localStorage.setItem('userData', JSON.stringify(data));

    await stripeCheckout(cart, path, data, eventData);
    //await mercadopagoCheckout(data, path, cart, eventData);

  };

  useEffect(() => {
    fetchEventData();
  }, [eventId]);

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
        <div key={typeTicket.id}>
          <h4>{typeTicket.nameTT}</h4>
          <p>Price: {typeTicket.priceTT}</p>
          <div>

            <button type="button" class="btn btn-danger" onClick={() => addToCart(typeTicket, -1)}>-</button>
            <span> Quantity: {quantity} </span>
            <button type="button" class="btn btn-success" onClick={() => addToCart(typeTicket, 1)}>+</button>
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
      <div>
        {renderTypeTickets()}
      </div>
      <div className="cart">
        <button type="button" class="btn btn-primary" onClick={toggleCartVisibility}>Cart</button>
        <div className="cart-dropdown">
          {renderCartDropdown()}
        </div>
      </div>
      <ModalCheckout handleModalSubmit={handleModalSubmit} />
    </div>
  );
};

export default Event;
