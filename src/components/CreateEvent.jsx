import './CSS/CreateEvent.css';
import { useState, useEffect } from "react";
import { Storage } from 'aws-amplify';
import { createEvent } from "../graphql/mutations";
import { v4 as uuid } from "uuid";
import { API, graphqlOperation } from "aws-amplify";
import FooterCreateEvent from './FooterCreateEvent';
import Swal from 'sweetalert2';
import { withAuthenticator } from '@aws-amplify/ui-react';
import checkUser from './CheckUser';
import { useNavigate } from 'react-router-dom';
import CreateUser from './CreateUser';
import '@aws-amplify/ui-react/styles.css';


function AddEvent({ user }) {

  const [showYourComponent, setShowYourComponent] = useState(false);

  useEffect(() => {
    const checkUserExistence = async () => {
      const userExists = await checkUser(user);
      if (userExists) {
        setShowYourComponent(false);
      } else {
        setShowYourComponent(true);
      }
    };
    checkUserExistence();
  }, [user]);

  const [eventData, setEventData] = useState({});
  const [bannerFile, setBannerFile] = useState(null);
  const [miniBannerFile, setMiniBannerFile] = useState(null);
  const navigate = useNavigate();

  const handleBannerChange = (event) => {
    const file = event.target.files[0];
    setBannerFile(file);
  };

  const handleMiniChange = (event) => {
    const file = event.target.files[0];
    setMiniBannerFile(file);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEventData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const createEventInput = {
      id: uuid(),
      nameEvent: eventData.nameEvent,
      locationEvent: eventData.locationEvent,
      descriptionEvent: eventData.descriptionEvent,
      bannerEvent: "",
      miniBannerEvent: "",
      startDateE: new Date(eventData.startDateE),
      endDateE: new Date(eventData.endDateE),
      upDateE: new Date(),
      downDateE: new Date(),
      userID: user.username

    };

    if (bannerFile) {
      const bannerKey = `events/${createEventInput.id}/banner`;
      await Storage.put(bannerKey, bannerFile, {
        contentType: 'image/jpeg'
      });
      createEventInput.bannerEvent = bannerKey;
    }

    if (miniBannerFile) {
      const miniBannerKey = `events/${createEventInput.id}/miniBanner`;
      await Storage.put(miniBannerKey, miniBannerFile, {
        contentType: 'image/jpeg'
      });
      createEventInput.miniBannerEvent = miniBannerKey;
    }

    try {

      await API.graphql(
        graphqlOperation(createEvent, { input: createEventInput }))
      Swal.fire({
        icon: 'success',
        title: 'Evento creado con éxito.',
        showConfirmButton: true,
        confirmButtonText: 'Aceptar'
      }).then(() => {
        navigate(`/edit-event/${createEventInput.id}`)
      });
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error al crear el evento.',
      });
    }
  };
  return (
    <>
      {showYourComponent && < CreateUser />}
      <div>
        <form className="eventForm" onSubmit={handleSubmit}>
          <label className='labelEvent'>
            Nombre Evento:
            <input className='inputEvent'
              type="text"
              name="nameEvent"
              value={eventData.nameEvent}
              onChange={handleInputChange}
            />
          </label>
          < label className='labelEvent'>
            Ubicación:
            <input className='inputEvent'
              type="text"
              name="locationEvent"
              value={eventData.locationEvent}
              onChange={handleInputChange}
            />
          </label>
          <label className='labelEvent'>
            Descripción:
            <input className='inputEvent'
              type="text"
              name="descriptionEvent"
              value={eventData.descriptionEvent}
              onChange={handleInputChange}
            />
          </label>
          <label className='labelEvent'>
            Fecha Inicio:
            <input className='inputEvent'
              type="date"
              name="startDateE"
              value={eventData.startDateE}
              onChange={handleInputChange}
            />
          </label>
          <label className='labelEvent'>
            Fecha Fin:
            <input className='inputEvent'
              type="date"
              name="endDateE"
              value={eventData.endDateE}
              onChange={handleInputChange}
            />
          </label>
          <label className='labelEvent'>
            Imagen Banner:
            <input className='inputEvent'
              type="file"
              accept=".jpg,.jpeg,.png"
              name="bannerEvent"
              onChange={handleBannerChange}
            />
          </label>
          <label className='labelEvent'>
            Imagen Banner Mini:
            <input className='inputEvent'
              type="file"
              accept=".jpg,.jpeg,.png"
              name="miniBannerEvent"
              onChange={handleMiniChange}
            />
          </label>
          <label className='labelEvent'>
            <button className='btn btn-primary' type="submit">Agregar Evento</button>
          </label>
        </form>
        <FooterCreateEvent />
      </div>
    </>
  );
};

export default withAuthenticator(AddEvent);