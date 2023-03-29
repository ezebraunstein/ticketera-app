import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { API, graphqlOperation } from 'aws-amplify';
import { Storage } from 'aws-amplify';
import { getEvent } from '../graphql/queries';
import { listTypeTickets } from '../graphql/queries';
import ModalCheckout from './ModalCheckout';
import axios from 'axios';
import handleCheckout from './Checkout';

const Event = () => {

  const { eventId } = useParams();
  const [eventData, setEventData] = useState(null);
  const [typeTickets, setTypeTickets] = useState([]);
  const [cart, setCart] = useState([]);
  const [cartVisible, setCartVisible] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const path = location.pathname;

  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [dni, setDni] = useState('');

  const handleModalSubmit = async (data) => {
    setName(data.name);
    setSurname(data.surname);
    setEmail(data.email);
    setDni(data.dni);

    await handleCheckoutMP(data);
    await handleCheckout(data, cart, eventData);
  };

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

  useEffect(() => {
    fetchEventData();
  }, [eventId]);

  if (!eventData) {
    return <div></div>;
  }

  const handleCheckoutMP = async (data) => {
    const name = data.name;
    const surname = data.surname;
    const email = data.email;
    const dni = data.dni;
    debugger;
    try {
      const result = await axios.post('https://hs37nkozzmf2277yidvtyqowsa0enots.lambda-url.us-east-1.on.aws/', {
        name, surname, email, dni, cart, eventData, path
      });
      console.log('Checkout done', result);
      const preferenceId = result.data.id;
      redirectToMercadoPago(preferenceId);
    } catch (error) {
      console.error('Failed to checkout', error);
    }
  };

  function redirectToMercadoPago(preference) {
    const url = `https://www.mercadopago.com.ar/checkout/v1/redirect?pref_id=${preference}`;
    window.open(url, '_blank');
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
      <div>
        <h3 className="eventTitles"> Fecha de Fin: </h3> <span> {(eventData.endDateE).slice(0, 10)}</span>
      </div>
      <div>
        <h3 className="imageTitles"> Imagen de Banner: </h3> <img src={eventData.imageUrl} alt="" width="300px" height="300px" />
      </div>
      {renderTypeTickets()}
      <div className="cart">
        <button type="button" class="btn btn-primary" onClick={toggleCartVisibility}>Cart</button>
        <div className="cart-dropdown">
          {renderCartDropdown()}
        </div>
      </div>
      <ModalCheckout handleModalSubmit={handleModalSubmit} />
      {/* <button onClick={handleCheckout} className="checkout-button">Checkout</button> */}
      {/* <button id="checkout-btn">Pagar</button> */}
      {/* <button id="checkout-btn" style={{ display: "none" }}>Pagar</button> */}
    </div>
  );
};

export default Event;
