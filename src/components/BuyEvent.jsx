import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { API, graphqlOperation } from 'aws-amplify';
import { Storage } from 'aws-amplify';
import { getEvent } from '../graphql/queries';
import { listTypeTickets } from '../graphql/queries';
import Swal from 'sweetalert2';
import { createTicket } from '../graphql/mutations';
import { v4 as uuid } from 'uuid';
import * as mutations from '../graphql/mutations';
import QRGenerator from './QRGenerator';
import axios from 'axios';

const Event = () => {

  const { eventId } = useParams();
  const [eventData, setEventData] = useState(null);
  const [typeTickets, setTypeTickets] = useState([]);
  const [cart, setCart] = useState([]);
  const [cartVisible, setCartVisible] = useState(false);
  const navigate = useNavigate();
  const [preferenceId, setPreferenceId] = useState(null);


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
      const quantity = cartItem ? cartItem.quantity : 0;

      return (
        <div key={typeTicket.id}>
          <h4>{typeTicket.nameTT}</h4>
          <p>Price: {typeTicket.priceTT}</p>
          <div>
            <button onClick={() => addToCart(typeTicket, -1)}>-</button>
            <span> Quantity: {quantity} </span>
            <button onClick={() => addToCart(typeTicket, 1)}>+</button>
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

    return cart.map((item) => (
      <div key={item.id}>
        <h4>{item.nameTT}</h4>
        <p>Quantity: {item.selectedQuantity}</p>
        <p>Price: {item.priceTT * item.selectedQuantity}</p>
      </div>
    ));
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

  const initMercadoPago = () => {

    const mp = new window.MercadoPago(process.env.REACT_APP_MP_PRU_PUBLIC_KEY,
      {
        locale: 'es-AR'
      });

    mp.checkout({
      preference: {
        id: preferenceId
      },
      render: {
        container: '.cho-container',
        label: 'Pagar',
      }
    });
  };

  const handleCheckout = async () => {

    if (cart.length === 0) {
      alert('Your cart is empty. Please add some tickets before checking out.');
      return;
    }

    const userEmail = prompt("Please enter your email:");
    //const userName = prompt("Please enter your name:");
    //const userSurname = prompt("Please enter your surname:");
    const userDni = parseInt(prompt("Please enter your DNI:"));

    if (!userEmail || !userDni) {
      alert("Email and DNI are required to proceed with the checkout.");
      return;
    }

    const checkoutMP = async () => {
      try {
        const result = await axios.post('https://dyovo7ln67.execute-api.us-east-1.amazonaws.com/default/lambdcheckoutMP', {});
        console.log('Checkout done', result);
        return result.data.id;
      } catch (error) {
        console.error('Failed to checkout', error);
      }
    }

    const preferenceId = await checkoutMP();

    if (preferenceId) {
      initMercadoPago(preferenceId);
    } else {
      const result = await axios.post('https://dyovo7ln67.execute-api.us-east-1.amazonaws.com/default/lambdcheckoutMP', {});
      console.log('Checkout done', result);
      setPreferenceId(result.data.id);
    }

    try {
      const ticketPromises = cart.flatMap(async (item) => {

        return Array.from({ length: item.selectedQuantity }, async () => {

          const ticketId = uuid();
          const nameEvent = eventData.nameEvent;
          const key = await QRGenerator(eventId, ticketId, userEmail, nameEvent);
          const ticketData = {
            id: ticketId,
            qrTicket: key,
            validTicket: true,
            dniTicket: userDni,
            emailTicket: userEmail,
            typeticketID: item.id,
          };

          await API.graphql(graphqlOperation(createTicket, { input: ticketData }));

        });
      });

      await Promise.all(ticketPromises);

      for (const item of cart) {

        const itemID = item.id;
        const itemQuantity = item.quantityTT - item.selectedQuantity;

        const updateTypeTicketInput = {
          id: itemID,
          quantityTT: itemQuantity,
        };

        await API.graphql({
          query: mutations.updateTypeTicket,
          variables: { input: updateTypeTicketInput }
        });
      }

      Swal.fire({
        icon: 'success',
        title: 'Ticket(s) created successfully!',
        showConfirmButton: true,
        confirmButtonText: 'Aceptar'
      });
      //.then(() => {
      //navigate('/');
      //});

    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error creating ticket(s)',
      });
    }
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
      {renderTypeTickets()}
      <div className="cart">
        <button onClick={toggleCartVisibility}>Cart</button>
        <div className="cart-dropdown">
          {renderCartDropdown()}
        </div>
      </div>
      <button onClick={handleCheckout} className="checkout-button">Checkout</button>
      <div className="cho-container"></div>
    </div>
  );
};

export default Event;
